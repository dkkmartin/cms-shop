'use client';

import HeaderNav from '@/components/header';
import HeaderFooterLayout from '@/components/headerFooterLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { IP } from '@/lib/utils';
import { Root } from '@/types/products';
import { Link } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState<Root>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://${IP}/sneakerspot/wp-json/wp/v2/product?acf_format=standard`
        );
        const products = await res.json();
        setProducts(products);
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <HeaderFooterLayout className="min-h-[calc(100dvh-128px)]">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full py-12 md:py-24 lg:py-32">
        {products &&
          products.map((sneaker) => (
            <Card key={sneaker.id} className="bg-white dark:bg-gray-800 ">
              <CardHeader>
                <Image
                  alt={sneaker.title.rendered}
                  className="aspect-square object-contain w-full rounded-md"
                  height="200"
                  src={sneaker.acf.thumbnail.url}
                  width="200"
                />
              </CardHeader>
              <CardContent className="grid h-36">
                <CardTitle className="text-blue-600 dark:text-blue-400">
                  {sneaker.title.rendered}
                </CardTitle>
                <div className="self-end">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {sneaker.acf.category.name}
                  </p>
                  <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {sneaker.acf.price},-
                  </p>
                </div>
              </CardContent>
              <CardFooter className="">
                <Link href={`/product/${sneaker.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    See more
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </HeaderFooterLayout>
  );
}
