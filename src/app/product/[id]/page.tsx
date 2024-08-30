import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IP } from '@/lib/utils';
import { Root } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import HeaderFooterLayout from '@/components/headerFooterLayout';

export default async function SneakerPage({ params }: { params: { id: string } }) {
  const fetchData = async () => {
    const res = await fetch(
      `http://${IP}/sneakerspot/wp-json/wp/v2/product/${params.id}?acf_format=standard`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  };

  const data: Root = await fetchData();

  if (data) {
    return (
      <HeaderFooterLayout className="min-h-[calc(100dvh-128px)]">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <Image
                alt="Featured Sneaker - Air Zoom Infinity"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-contain object-center sm:w-full lg:order-last"
                width={400}
                height={400}
                src={data.acf.thumbnail.url}
              />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-bold mb-2">{data.title.rendered}</h1>
              <p className="text-gray-600 mb-4">{data.acf.category.name}</p>

              <p className="text-2xl font-bold mb-4">{data.acf.price},-</p>
              <p className="text-gray-700 mb-6">{data.acf.summary}</p>

              <Button className="w-full mb-4" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Badge variant="secondary" className="text-xs">
                Free shipping on orders over 500 DKK
              </Badge>
            </div>
          </div>
        </div>
      </HeaderFooterLayout>
    );
  }
}
