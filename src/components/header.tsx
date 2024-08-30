'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingBag, Search } from 'lucide-react';

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [basketCount, setBasketCount] = useState(0);

  const SearchBar = () => (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input type="search" placeholder="Search sneakers..." className="pl-8 md:w-[200px]" />
    </div>
  );

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-4">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">sneakerSpot</span>
              </Link>
            </div>
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <ShoppingBag className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">New Arrivals</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Check out the latest men&apos;s sneakers just in!
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">Running</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              High-performance running shoes for every terrain.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">Casual</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Stylish and comfortable sneakers for everyday wear.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <ShoppingBag className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">New Arrivals</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover the latest women&apos;s sneakers in store!
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">Lifestyle</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Trendy sneakers to complement your style.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">Training</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              High-performance shoes for your workout sessions.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Kids</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/"
                          >
                            <ShoppingBag className="h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">New Arrivals</div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Discover the latest kid&apos;s sneakers in store!
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">Lifestyle</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Trendy sneakers to complement your style.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            href="/"
                          >
                            <div className="text-sm font-medium leading-none">Training</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              High-performance shoes for your workout sessions.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-6 w-6" />
                <span className="sr-only">Shopping basket</span>
                {basketCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {basketCount}
                  </span>
                )}
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4 border-b">
                      <span className="text-lg font-semibold">Menu</span>
                    </div>
                    <div className="py-4">
                      <SearchBar />
                    </div>
                    <div className="flex flex-col gap-3 text-xl">
                      <Link href={'/'}>Men</Link>
                      <Link href={'/'}>Women</Link>
                      <Link href={'/'}>Kid</Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
