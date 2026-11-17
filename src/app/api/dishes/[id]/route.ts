import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: dish, error } = await supabase
      .from('dishes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !dish) {
      return NextResponse.json(
        { success: false, error: 'Dish not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: dish });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
