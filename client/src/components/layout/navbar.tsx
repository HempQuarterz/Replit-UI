import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import HempQuarterzLogo from "@/assets/logo-circle.png";

const Navbar = () => {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page
    console.log("Search query:", searchQuery);
    // In a real app, we would redirect to a search results page
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img 
                  src={HempQuarterzLogo} 
                  alt="HempQuarterz Logo" 
                  className="h-12 w-12 cursor-pointer rounded-full"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/">
                <a className={`${location === '/' ? 'border-primary text-primary' : 'border-transparent text-neutral-dark hover:text-primary hover:border-primary'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                  Home
                </a>
              </Link>
              <Link href="/about">
                <a className={`${location === '/about' ? 'border-primary text-primary' : 'border-transparent text-neutral-dark hover:text-primary hover:border-primary'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                  About
                </a>
              </Link>
              <Link href="/plant-parts">
                <a className={`${location.startsWith('/plant-part') ? 'border-primary text-primary' : 'border-transparent text-neutral-dark hover:text-primary hover:border-primary'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                  Parts of Plant
                </a>
              </Link>
              <Link href="/industries">
                <a className={`${location === '/industries' ? 'border-primary text-primary' : 'border-transparent text-neutral-dark hover:text-primary hover:border-primary'} border-b-2 px-1 pt-1 text-sm font-medium`}>
                  Industries
                </a>
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search hemp uses..."
                className="w-64 rounded-full px-4 py-2 border border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <Search className="h-5 w-5 text-neutral-medium" />
              </Button>
            </form>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="inline-flex items-center justify-center p-2 rounded-md text-neutral-dark hover:text-primary hover:bg-neutral-lightest focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between pb-4 border-b">
                    <Link href="/">
                      <img 
                        src={HempQuarterzLogo} 
                        alt="HempQuarterz Logo" 
                        className="h-12 w-12 cursor-pointer rounded-full"
                      />
                    </Link>
                  </div>
                  
                  <div className="mt-6">
                    <form onSubmit={handleSearch} className="mb-6">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search hemp uses..."
                          className="w-full rounded-full px-4 py-2 border border-neutral-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button 
                          type="submit" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          <Search className="h-5 w-5 text-neutral-medium" />
                        </Button>
                      </div>
                    </form>
                    
                    <nav className="flex flex-col space-y-4">
                      <Link href="/">
                        <a className={`${location === '/' ? 'text-primary font-medium' : 'text-neutral-dark'} hover:text-primary px-3 py-2 text-base`}>
                          Home
                        </a>
                      </Link>
                      <Link href="/about">
                        <a className={`${location === '/about' ? 'text-primary font-medium' : 'text-neutral-dark'} hover:text-primary px-3 py-2 text-base`}>
                          About
                        </a>
                      </Link>
                      <Link href="/plant-parts">
                        <a className={`${location.startsWith('/plant-part') ? 'text-primary font-medium' : 'text-neutral-dark'} hover:text-primary px-3 py-2 text-base`}>
                          Parts of Plant
                        </a>
                      </Link>
                      <Link href="/industries">
                        <a className={`${location === '/industries' ? 'text-primary font-medium' : 'text-neutral-dark'} hover:text-primary px-3 py-2 text-base`}>
                          Industries
                        </a>
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
