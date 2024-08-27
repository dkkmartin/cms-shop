import { Menu, Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function HeaderNav() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-gray-800 shadow-md">
      <Button variant="ghost" className="lg:hidden" size="icon">
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex items-center gap-4 lg:gap-6 ml-4 lg:ml-6">
        <a className="font-bold text-xl text-blue-600 dark:text-blue-400" href="#">
          SneakerSpot
        </a>
        <nav className="hidden lg:flex gap-6">
          <a className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Home
          </a>
          <a className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Men
          </a>
          <a className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Women
          </a>
          <a className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Kids
          </a>
          <a className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400" href="#">
            Brands
          </a>
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <form className="hidden lg:block">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-8 bg-gray-100 dark:bg-gray-700"
              placeholder="Search sneakers..."
              type="search"
            />
          </div>
        </form>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-6 w-6" />
          <span className="sr-only">Open cart</span>
        </Button>
      </div>
    </header>
  );
}
