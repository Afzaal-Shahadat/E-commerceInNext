import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
  await connectDB();
  const products = await Product.find().lean();
  return NextResponse.json(products);
}

export async function POST(req) {
  const session = await auth();
  if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return NextResponse.json(product, { status: 201 });
}