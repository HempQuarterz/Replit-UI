import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { usePlantTypes } from "@/hooks/use-plant-data";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Breadcrumb from "@/components/ui/breadcrumb";
import { PlantType } from "@shared/schema";

const PlantTypesPage = () => {
  const { data: plantTypes, isLoading } = usePlantTypes();

  return (
    <>
      <Helmet>
        <title>Hemp Plant Types | HempQuarterz</title>
        <meta name="description" content="Explore different types of industrial hemp plants and their applications including fiber hemp, grain hemp, and cannabinoid hemp." />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Plant Types" }
            ]}
          />
        </div>
      </div>

      {/* Hero section */}
      <div className="bg-green-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-neutral-darkest">
            Hemp Plant Types
          </h1>
          <p className="mt-4 text-lg text-neutral-dark max-w-3xl mx-auto">
            Explore the various hemp plant types cultivated for different industrial applications, from textiles and construction to food and medicine.
          </p>
        </div>
      </div>

      {/* Plant types grid */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-darkest mb-12 text-center">
            Select a Hemp Plant Type
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantTypes?.map((plantType: PlantType) => (
                <div key={plantType.id} className="relative group">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out group-hover:shadow-lg">
                    <img 
                      src={plantType.imageUrl || 'https://via.placeholder.com/800x1000'} 
                      alt={`${plantType.name} plant`} 
                      className="h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-xl font-heading font-semibold text-white">{plantType.name}</h3>
                      <p className="mt-2 text-sm text-white/80 line-clamp-3">{plantType.description}</p>
                    </div>
                  </div>
                  <Link href={`/plant-type/${plantType.id}`}>
                    <a className="absolute inset-0 z-10 block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label={`View ${plantType.name} applications`}></a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plant type comparison */}
      <div className="bg-neutral-lightest py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-darkest mb-12 text-center">
            Hemp Plant Type Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-light">
              <thead className="bg-neutral-lightest">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Plant Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Primary Use</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Characteristics</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Growing Conditions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-light">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-darkest">Fiber Hemp</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Textiles, Construction, Paper</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Tall plants with strong fibers, minimal branching</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Dense planting, minimal fertilizer</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-darkest">Grain/Seed Hemp</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Food, Nutritional Products</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Medium height, branching for seed production</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Moderate spacing, well-drained soil</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-darkest">Cannabinoid Hemp</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Medicinal, Wellness Products</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Shorter plants, flower-focused growth</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Wide spacing, controlled environment</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-neutral-darkest mb-4">
            Explore Hemp Industry Applications
          </h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-8">
            Discover how different industries are utilizing hemp plants for sustainable solutions.
          </p>
          <Link href="/industries">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Browse Industries
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PlantTypesPage;