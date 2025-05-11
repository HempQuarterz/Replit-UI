import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HomePage from "@/pages/home";
import AboutPage from "@/pages/about";
import PlantPartsPage from "@/pages/plant-parts";
import PlantTypesListPage from "@/pages/plant-types-list";
import PlantTypePage from "@/pages/plant-type";
import PlantPartPage from "@/pages/plant-part";
import ProductListingPage from "@/pages/product-listing";
import ProductDetailPage from "@/pages/product-detail";
import IndustriesPage from "@/pages/industries";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/plant-parts" component={PlantPartsPage} />
      <Route path="/plant-types" component={PlantTypesListPage} />
      <Route path="/plant-type/:id" component={PlantTypePage} />
      <Route path="/plant-part/:id" component={PlantPartPage} />
      <Route path="/products/:plantPartId/:industryId?" component={ProductListingPage} />
      <Route path="/product/:id" component={ProductDetailPage} />
      <Route path="/industries" component={IndustriesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
