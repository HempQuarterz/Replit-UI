import { useStats } from "@/hooks/use-plant-data";
import Counter from "@/components/ui/counter";

const HomepageHero = () => {
  const { data: stats, isLoading } = useStats();

  return (
    <div className="bg-gradient-to-br from-primary-light to-primary-dark py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white">
          Interactive Industrial Hemp Database
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-white/90 sm:text-xl md:mt-5 md:max-w-3xl">
          Explore the versatile applications of industrial hemp across industries, plant parts, and product categories.
        </p>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4 text-white">
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="opacity-50">Loading...</span>
              ) : (
                <Counter end={stats?.totalProducts || 0} suffix="+" />
              )}
            </div>
            <div className="text-sm">Unique Applications</div>
          </div>
          
          <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4 text-white">
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="opacity-50">Loading...</span>
              ) : (
                <Counter end={stats?.totalIndustries || 0} />
              )}
            </div>
            <div className="text-sm">Industry Categories</div>
          </div>
          
          <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4 text-white">
            <div className="text-2xl font-bold">
              {isLoading ? (
                <span className="opacity-50">Loading...</span>
              ) : (
                <Counter end={stats?.totalPlantParts || 0} />
              )}
            </div>
            <div className="text-sm">Plant Components</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHero;
