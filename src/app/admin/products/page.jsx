// ... existing imports ...

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductForm from '@/components/ProductForm';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  
} from '@/components/ui/table';
import { Button } from "@/components/ui/button";
import DeleteProduct from "@/components/DeleteProduct";

export default async function AdminProducts() {
  const session = await auth();
    if (!session || session.user.role !== 'admin') redirect('/');

  await connectDB();
  
  // 1. Fetch data
  const rawProducts = await Product.find().lean();

  // 2. Convert to plain objects (Stringify IDs and Dates)
  const products = rawProducts.map(p => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toString(),
    updatedAt: p.updatedAt?.toString(),
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl">Admin – Products</h1>
        <ProductForm mode="create" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(p => (
            <TableRow key={p._id}>
              <TableCell>{p.title}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell className="flex gap-2">
                {/* Now 'p' is a plain object and won't crash ProductForm */}
                <ProductForm mode="edit" product={p} />
                
                <DeleteProduct id={p._id  } />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}