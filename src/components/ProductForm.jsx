// 'use client';

// import { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { useRouter } from 'next/navigation';

// export default function ProductForm({ mode = 'create', product = {} }) {
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const [form, setForm] = useState({
//     title: product.title || '',
//     price: product.price || '',
//     description: product.description || '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const body = { ...form, price: Number(form.price) };

//     let res;
//     if (mode === 'create') {
//       res = await fetch('/api/products', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
//     } else {
//       res = await fetch(`/api/products/${product._id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
//     }

//     if (res.ok) {
//       setOpen(false);
//       router.refresh(); // or revalidatePath
//     } else {
//       alert('Error');
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button>{mode === 'create' ? 'Add Product' : 'Edit'}</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{mode === 'create' ? 'Add New Product' : 'Edit Product'}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label>Title</Label>
//             <Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
//           </div>
//           <div>
//             <Label>Price</Label>
//             <Input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
//           </div>
//           <div>
//             <Label>Description</Label>
//             <Textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
//           </div>
//           <Button type="submit">Save</Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription, // Added this import
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function ProductForm({ mode = 'create', product = {} }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Added a loading state
  const [form, setForm] = useState({
    title: product.title || '',
    price: product.price || '',
    description: product.description || '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const body = { ...form, price: Number(form.price) };

    try {
      let res;
      if (mode === 'create') {
        res = await fetch('/api/products', { 
          method: 'POST', 
          body: JSON.stringify(body), 
          headers: { 'Content-Type': 'application/json' } 
        });
      } else {
        // This hits the new app/api/products/[id]/route.ts file
        res = await fetch(`/api/products/${product._id}`, { 
          method: 'PUT', 
          body: JSON.stringify(body), 
          headers: { 'Content-Type': 'application/json' } 
        });
      }

      if (res.ok) {
        setOpen(false);
        router.refresh();
        // Reset form only if creating
        if (mode === 'create') setForm({ title: '', price: '', description: '' });
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || 'Something went wrong'}`);
      }
    } catch (err) {
      alert('Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={mode === 'create' ? 'default' : 'outline'}>
          {mode === 'create' ? 'Add Product' : 'Edit'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Add New Product' : 'Edit Product'}</DialogTitle>
          {/* This fixes the "Missing Description" warning */}
          <DialogDescription>
            {mode === 'create' 
              ? 'Fill in the details below to add a new product to your catalog.' 
              : 'Make changes to your product details here. Click save when you are done.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title"
              value={form.title} 
              onChange={e => setForm({...form, title: e.target.value})} 
              placeholder="Product Name"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input 
              id="price"
              type="number" 
              value={form.price} 
              onChange={e => setForm({...form, price: e.target.value})} 
              placeholder="0.00"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})} 
              placeholder="Describe the product..."
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}