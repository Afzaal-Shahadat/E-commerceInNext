'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/lib/store';
import { useSession } from 'next-auth/react';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const handleAdd = () => {
    if (!session) {
      alert('Please login to add to cart');
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${product.price}</p>
        <p className="mt-2 text-sm text-muted-foreground">{product.description.substring(0, 80)}...</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" >
          <Link href={`/products/${product._id}`}>View</Link>
        </Button>
        <Button onClick={handleAdd}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
} 