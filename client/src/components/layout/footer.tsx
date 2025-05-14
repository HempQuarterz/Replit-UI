import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription");
  };

  return (
    <footer className="bg-neutral-darkest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-outline-white">HempDB</h3>
            <p className="text-neutral-light mb-6 text-outline-white">
              A comprehensive database of industrial hemp applications across industries, showcasing the versatility and potential of this remarkable plant.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-neutral-light hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-medium mb-4 text-outline-white text-center">Quick Links</h3>
            <div className="flex flex-col items-center">
              {/* Top row */}
              <div className="flex space-x-6 mb-2 items-center">
                <Link href="/">
                  <div className="border-transparent text-white hover:text-primary hover:border-primary border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer">
                    Home
                  </div>
                </Link>
                <Link href="/about">
                  <div className="border-transparent text-white hover:text-primary hover:border-primary border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer">
                    About
                  </div>
                </Link>
                <Link href="/plant-types">
                  <div className="border-transparent text-white hover:text-primary hover:border-primary border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer">
                    Plant Types
                  </div>
                </Link>
              </div>
              
              {/* Bottom row */}
              <div className="flex space-x-6 items-center">
                <Link href="/plant-parts">
                  <div className="border-transparent text-white hover:text-primary hover:border-primary border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer">
                    Parts of Plant
                  </div>
                </Link>
                <Link href="/industries">
                  <div className="border-transparent text-white hover:text-primary hover:border-primary border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer">
                    Industries
                  </div>
                </Link>
                <Link href="/research">
                  <div className="border-transparent text-white hover:text-primary hover:border-primary border-b-2 px-0.5 pt-1 text-lg font-medium whitespace-nowrap cursor-pointer">
                    Research
                  </div>
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-heading font-medium mb-4 text-outline-white">Subscribe</h3>
            <p className="text-neutral-light mb-4 text-outline-white">
              Join our newsletter to receive updates on new hemp applications and industry developments.
            </p>
            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex max-w-md">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow min-w-0 bg-neutral-darkest text-white px-4 py-2 rounded-l-md border border-neutral-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-4 py-2 rounded-r-md transition-colors"
                >
                  Subscribe
                </Button>
              </div>
            </form>
            <p className="text-xs text-neutral-medium text-outline-white">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from HempDB.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-neutral-dark text-neutral-medium flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-outline-white">© {new Date().getFullYear()} HempDB. All rights reserved.</p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link href="/privacy">
              <div className="border-transparent text-white hover:text-primary hover:border-primary border-b px-0.5 pt-1 text-sm font-medium whitespace-nowrap cursor-pointer">Privacy Policy</div>
            </Link>
            <Link href="/terms">
              <div className="border-transparent text-white hover:text-primary hover:border-primary border-b px-0.5 pt-1 text-sm font-medium whitespace-nowrap cursor-pointer">Terms of Service</div>
            </Link>
            <Link href="/contact">
              <div className="border-transparent text-white hover:text-primary hover:border-primary border-b px-0.5 pt-1 text-sm font-medium whitespace-nowrap cursor-pointer">Contact</div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
