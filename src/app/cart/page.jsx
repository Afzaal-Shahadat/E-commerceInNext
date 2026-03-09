'use client';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CartPage() {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

  if (items.length === 0) return <p className="text-center mt-10">Your cart is empty.</p>;

  return (
    <div>
      <h1 className="text-3xl mb-6">Your Cart</h1>
      {items.map(item => (
        <Card key={item._id} className="mb-4">
          <CardHeader>
            <CardTitle>{item.title} × {item.quantity || 1}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p>${(item.price * (item.quantity || 1)).toFixed(2)}</p>
            <Button variant="destructive" size="sm" onClick={() => dispatch(removeFromCart(item._id))}>
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className="text-right text-2xl font-bold mt-6">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}