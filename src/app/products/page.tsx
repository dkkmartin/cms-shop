'use client';

import HeaderFooterLayout from '@/components/headerFooterLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeAndRemoveHyphen, IP } from '@/lib/utils';
import { Root } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const [products, setProducts] = useState<Root>([]);
  const [filteredProducts, setFilteredProducts] = useState<Root>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    setSelectedBrand(brand as string);
  }, [brand, brands]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `http://${IP}/sneakerspot/wp-json/wp/v2/product?acf_format=standard`
        );
        const fetchedProducts = await res.json();
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);

        const uniqueBrands: string[] = Array.from(
          new Set(fetchedProducts.map((product: any) => product.acf.category.slug))
        );
        setBrands(['All', ...uniqueBrands]);
      } catch (err) {
        console.log('Error: ', err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by brand
    if (selectedBrand !== 'All') {
      result = result.filter((product) => product.acf.category.slug === selectedBrand);
    }

    // Sort by price
    if (sortOrder === 'asc') {
      result.sort((a, b) => parseFloat(a.acf.price) - parseFloat(b.acf.price));
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => parseFloat(b.acf.price) - parseFloat(a.acf.price));
    }

    setFilteredProducts(result);
  }, [selectedBrand, sortOrder, products]);

  return (
    <HeaderFooterLayout className="min-h-[calc(100dvh-128px)]">
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-gray-800 dark:text-gray-200">
          All products
        </h1>
        <div className="flex justify-between mb-6">
          <Select onValueChange={(value) => setSelectedBrand(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={capitalizeAndRemoveHyphen(selectedBrand)} />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {capitalizeAndRemoveHyphen(brand)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSortOrder(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {filteredProducts.map((sneaker) => (
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
              <CardFooter>
                <Link href={`/product/${sneaker.id}`} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    See more
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </HeaderFooterLayout>
  );
}
