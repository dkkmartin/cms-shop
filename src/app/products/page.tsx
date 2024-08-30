'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { IP } from '@/lib/utils';
import { Root } from '@/types/products';
import HeaderNav from '@/components/header';

export default function AllProductsPage() {
  const [products, setProducts] = useState<Root>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('featured');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://${IP}/sneakerspot/wp-json/wp/v2/product?acf_format=standard`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Root = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError('An error occurred while fetching the products.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [...new Set(products.map((product) => product.acf.category))];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.acf.category)) &&
      parseFloat(product.acf.price) >= priceRange[0] &&
      parseFloat(product.acf.price) <= priceRange[1] &&
      product.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return parseFloat(a.acf.price) - parseFloat(b.acf.price);
      case 'price-high-low':
        return parseFloat(b.acf.price) - parseFloat(a.acf.price);
      case 'name-a-z':
        return a.title.rendered.localeCompare(b.title.rendered);
      case 'name-z-a':
        return b.title.rendered.localeCompare(a.title.rendered);
      default:
        return 0;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) {
    return (
      <>
        <HeaderNav />
        <div className="container mx-auto px-4 py-8">Loading...</div>);
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderNav />
        <div className="container mx-auto px-4 py-8">Error {error}</div>);
      </>
    );
  }

  return (
    <>
      <HeaderNav />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">All Sneakers</h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="w-full md:w-auto">
            <Input
              type="search"
              placeholder="Search sneakers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Filter by Category
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      setSelectedCategories(
                        checked
                          ? [...selectedCategories, category]
                          : selectedCategories.filter((c) => c !== category)
                      )
                    }
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Select onValueChange={setSortOption} defaultValue={sortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                <SelectItem value="name-z-a">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="max-w-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <Card key={product.id} className="flex flex-col">
              <CardContent className="p-4">
                <Image
                  src={product.acf.thumbnail.url}
                  alt={product.title.rendered}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded-md"
                />
                <h2 className="text-lg font-semibold mb-2">{product.title.rendered}</h2>
                <p className="text-gray-600 mb-2">{product.acf.category}</p>
                <p className="text-gray-800 font-bold">${product.acf.price}</p>
              </CardContent>
              <CardFooter className="mt-auto p-4">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, sortedProducts.length)}{' '}
            of {sortedProducts.length} products
          </p>
        </div>
      </div>
    </>
  );
}
