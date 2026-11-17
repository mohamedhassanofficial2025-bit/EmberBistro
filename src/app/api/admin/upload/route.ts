import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    // Check mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file format. Please upload JPEG, PNG, WEBP, or AVIF.' },
        { status: 400 }
      );
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const filename = `${cleanName}-${Date.now()}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from('dishes')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json(
        { success: false, error: uploadError.message },
        { status: 500 }
      );
    }

    const { data: publicData } = supabase.storage
      .from('dishes')
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: publicData.publicUrl,
      filename,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
