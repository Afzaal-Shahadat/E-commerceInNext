'use client';

import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/react';
import { addToCart } from '@/lib/store';

export default function AddToCartButton({ product }) {
    const handleAdd = () => {
        if (!session) return alert('Login required');
      
        // Create a clean, serializable version of the product
        const cleanProduct = {
          _id: product._id.toString(),
          title: product.title,
          price: product.price,
          image: product.image,
          // Ensure this is a string, not a Date object
          createdAt: String(product.createdAt), 
        };
      
        dispatch(addToCart(cleanProduct));
      };

  return (
    <Button onClick={handleAdd} className="mt-6">
      Add to Cart
    </Button>
  );
}