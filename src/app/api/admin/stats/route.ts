import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET() {
  try {
    // 1. Fetch orders
    const { data: orders, error: ordersErr } = await supabase
      .from('orders')
      .select('id, total, status, created_at');

    if (ordersErr) throw ordersErr;

    // 2. Fetch dishes count
    const { count: dishesCount, error: dishesErr } = await supabase
      .from('dishes')
      .select('*', { count: 'exact', head: true })
      .eq('available', true);

    if (dishesErr) throw dishesErr;

    const totalOrders = orders?.length || 0;
    const totalRevenue = orders
      ? orders.reduce((sum, o) => sum + Number(o.total || 0), 0)
      : 0;

    const pendingOrders = orders
      ? orders.filter((o) => o.status === 'New' || o.status === 'Preparing').length
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue: Number(totalRevenue.toFixed(2)),
        totalOrders,
        pendingOrders,
        activeDishes: dishesCount || 0,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
