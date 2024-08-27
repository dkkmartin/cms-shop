'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const sneaker = {
  id: '1',
  name: 'Air Zoom Infinity',
  brand: 'Nike',
  price: 159.99,
  description:
    'Experience unparalleled comfort and style with our latest innovation in sneaker technology. The Air Zoom Infinity features responsive cushioning, breathable materials, and a sleek design that performs as good as it looks.',
  colors: ['Black', 'White', 'Red'],
  sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11],
  images: [
    '/placeholder.svg?height=400&width=400',
    '/placeholder.svg?height=400&width=400&text=Side',
    '/placeholder.svg?height=400&width=400&text=Back',
    '/placeholder.svg?height=400&width=400&text=Top',
  ],
  rating: 4.5,
  reviews: 128,
};

export default function SneakerPage({ params }: { params: { id: string } }) {
  const [selectedColor, setSelectedColor] = useState(sneaker.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/sneakers"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to all sneakers
      </Link>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {sneaker.images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <Image
                          src={src}
                          alt={`${sneaker.name} view ${index + 1}`}
                          width={400}
                          height={400}
                          className="object-cover rounded-md"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{sneaker.name}</h1>
          <p className="text-gray-600 mb-4">{sneaker.brand}</p>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(sneaker.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({sneaker.reviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold mb-4">${sneaker.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{sneaker.description}</p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Color</h2>
            <div className="flex space-x-2">
              {sneaker.colors.map((color) => (
                <Button
                  key={color}
                  variant={selectedColor === color ? 'default' : 'outline'}
                  className="w-20"
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Size</h2>
            <RadioGroup onValueChange={(value) => setSelectedSize(Number(value))}>
              <div className="grid grid-cols-3 gap-2">
                {sneaker.sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size.toString()}
                      id={`size-${size}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
          <Button className="w-full mb-4" size="lg">
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
          <Badge variant="secondary" className="text-xs">
            Free shipping on orders over $100
          </Badge>
        </div>
      </div>
    </div>
  );
}
