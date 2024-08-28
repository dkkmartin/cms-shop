import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import HeaderNav from '@/components/header';
import { Root } from '@/types/products';
import Link from 'next/link';

export default async function Home() {
  const brands = [
    { name: 'Nike', slug: 'nike', image: '/nike.svg' },
    { name: 'Adidas', slug: 'adidas', image: '/adidas.svg' },
    { name: 'Jordans', slug: 'jordans', image: '/jordan.svg' },
    { name: 'New Balance', slug: 'new-balance', image: '/new-balance.svg' },
  ];

  const sneakers = [
    {
      id: 1,
      name: 'Air Max 90',
      brand: 'Nike',
      price: 129.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 2,
      name: 'Ultra Boost',
      brand: 'Adidas',
      price: 179.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 3,
      name: 'Classic Leather',
      brand: 'Reebok',
      price: 79.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 4,
      name: 'Zoom Pegasus',
      brand: 'Nike',
      price: 119.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 5,
      name: 'RS-X',
      brand: 'Puma',
      price: 109.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 6,
      name: '990v5',
      brand: 'New Balance',
      price: 174.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 7,
      name: 'Superstar',
      brand: 'Adidas',
      price: 89.99,
      image: 'https://placehold.co/200',
    },
    {
      id: 8,
      name: 'Air Force 1',
      brand: 'Nike',
      price: 99.99,
      image: 'https://placehold.co/200',
    },
  ];

  const fetchData = async () => {
    const res = await fetch(
      'http://192.168.0.9/sneakerspot/wp-json/wp/v2/products?acf_format=standard'
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const data: Root = await fetchData();

  const randomIndex = () => {
    return Math.floor(Math.random() * data.length);
  };

  const randomNumber = randomIndex();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <HeaderNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Featured Sneaker - Air Zoom Infinity"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
                width={400}
                height={400}
                src={data[randomNumber].acf.thumbnail.url}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge
                    variant="secondary"
                    className="bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200"
                  >
                    New Release
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-800 dark:text-blue-100">
                    {data[randomNumber].title.rendered}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Experience unparalleled comfort and style with our latest innovation in sneaker
                    technology.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Shop Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center text-gray-800 dark:text-gray-200">
              Shop by Brand
            </h2>
            <div className="flex justify-center gap-8 flex-wrap">
              {brands.map((brand) => (
                <Link href={`/products/${brand.slug}`} key={brand.name}>
                  <div className="flex flex-col items-center">
                    <Image
                      src={brand.image}
                      alt={`${brand.name} logo`}
                      className="w-20 h-20 object-contain mb-2"
                      width={100}
                      height={100}
                    />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {brand.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-center text-gray-800 dark:text-gray-200">
              Featured Sneakers
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {sneakers.map((sneaker) => (
                <Card key={sneaker.id} className="bg-white dark:bg-gray-800">
                  <CardHeader>
                    <Image
                      alt={sneaker.name}
                      className="aspect-square object-cover w-full rounded-md"
                      height="200"
                      src={sneaker.image}
                      width="200"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-blue-600 dark:text-blue-400">
                      {sneaker.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{sneaker.brand}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      ${sneaker.price.toFixed(2)}
                    </p>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full">
                          Select Size
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11].map((size) => (
                          <DropdownMenuItem key={size}>{size}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-white dark:bg-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 SneakerSpot. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}
