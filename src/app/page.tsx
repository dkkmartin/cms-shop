import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Root } from '@/types/products';
import Link from 'next/link';
import { IP } from '@/lib/utils';
import HeaderFooterLayout from '@/components/headerFooterLayout';

export default async function Home() {
  const brands = [
    { name: 'Nike', slug: 'nike', image: '/nike.svg' },
    { name: 'Adidas', slug: 'adidas', image: '/adidas.svg' },
    { name: 'Jordans', slug: 'air-jordans', image: '/jordan.svg' },
    { name: 'New Balance', slug: 'new-balance', image: '/new-balance.svg' },
  ];

  const fetchData = async () => {
    const res = await fetch(`http://${IP}/sneakerspot/wp-json/wp/v2/product?acf_format=standard`);
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
      <HeaderFooterLayout>
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
                  <Link href={`/product/${data[randomNumber].id}`}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Learn More
                    </Button>
                  </Link>
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
                <Link
                  href={{ pathname: '/products', query: { brand: brand.slug } }}
                  key={brand.name}
                >
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
              {data.slice(0, 8).map((sneaker) => (
                <Card key={sneaker.id} className="bg-white dark:bg-gray-800">
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
          </div>
        </section>
      </HeaderFooterLayout>
    </div>
  );
}
