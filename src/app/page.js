import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="text-center mt-20 space-y-6">

      <h1 className="text-5xl font-bold">
        Welcome to My Shop
      </h1>

      <p className="text-lg text-gray-500">
        Simple E-commerce built with Next.js
      </p>

      <Link href="/products">
        <Button size="lg">
          Browse Products
        </Button>
      </Link>

    </div>
  );
}