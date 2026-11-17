import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/admin/dishes - returns all dishes including unavailable
export async function GET() {
  try {
    const { data: dishes, error } = await supabase
      .from('dishes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, count: dishes?.length || 0, data: dishes });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

// POST /api/admin/dishes - adds new dish
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, description, price, category, image, available } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { success: false, error: 'Name, price, and category are required' },
        { status: 400 }
      );
    }

    const { data: newDish, error } = await supabase
      .from('dishes')
      .insert([
        {
          name: name.trim(),
          description: description?.trim() || '',
          price: Number(price),
          category,
          image: image?.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
          available: available !== undefined ? available : true,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: newDish }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
