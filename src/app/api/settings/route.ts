import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('restaurant_settings')
      .select('*')
      .eq('id', 'main')
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (body.restaurant_name !== undefined) updatePayload.restaurant_name = String(body.restaurant_name).trim();
    if (body.tagline !== undefined) updatePayload.tagline = String(body.tagline).trim();
    if (body.phone !== undefined) updatePayload.phone = String(body.phone).trim();
    if (body.email !== undefined) updatePayload.email = String(body.email).trim();
    if (body.address !== undefined) updatePayload.address = String(body.address).trim();
    if (body.tax_rate !== undefined) updatePayload.tax_rate = Number(body.tax_rate) || 0;
    if (body.delivery_fee !== undefined) updatePayload.delivery_fee = Number(body.delivery_fee) || 0;
    if (body.currency_symbol !== undefined) updatePayload.currency_symbol = String(body.currency_symbol).trim();
    if (body.opening_hours !== undefined) updatePayload.opening_hours = String(body.opening_hours).trim();
    if (body.logo_url !== undefined) updatePayload.logo_url = body.logo_url ? String(body.logo_url).trim() : null;

    const { data, error } = await supabase
      .from('restaurant_settings')
      .update(updatePayload)
      .eq('id', 'main')
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    // Instantly purge stale cache across all routes
    revalidatePath('/', 'layout');

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
