import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';

export default async function ProductsPage() {
  await connectDB();
  
  // 1. Fetch data
  const rawProducts = await Product.find().lean();

  // 2. Serialize the data (Convert MongoDB types to plain strings)
  const products = rawProducts.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toString(),
    updatedAt: p.updatedAt?.toString(),
  }));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-6 font-bold">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}