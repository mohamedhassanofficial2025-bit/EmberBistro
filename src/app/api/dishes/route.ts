import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Dish from '@/models/Dish';

export async function GET() {
  try {
    await connectDB();
    const dishes = await Dish.find({ available: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, count: dishes.length, data: dishes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
