import { connectDB } from '@/lib/db';
import Product from '@/models/Product';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton'; // We will create this below

export default async function ProductDetail({ params }) {
  // CORRECT WAY: Unwrapping the promise
  const resolvedParams = await params; 
  const id = resolvedParams.id;

  await connectDB();
  
  let product;
  try {
    // Now 'id' is a real string, not a Promise object
    product = await Product.findById(id).lean();
  } catch (e) {
    console.error("Database Error:", e);
  }

  if (!product) notFound();

  // Convert MongoDB object to a plain object for the Client Component
  const serializableProduct = {
    ...product,
    _id: product._id.toString(),
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold">{serializableProduct.title}</h1>
      <p className="text-3xl my-4">${serializableProduct.price}</p>
      <p className="text-lg">{serializableProduct.description}</p>

      {/* Pass data to the Client Component */}
      <AddToCartButton product={serializableProduct} />
    </div>
  );
}