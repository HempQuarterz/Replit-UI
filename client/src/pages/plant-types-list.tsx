import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { PlantType } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { usePlantTypes } from "@/hooks/use-plant-data";
import Breadcrumb from "@/components/ui/breadcrumb";

const PlantTypesListPage = () => {
  const { data: plantTypesData, isLoading } = usePlantTypes();
  const [plantTypes, setPlantTypes] = useState<PlantType[]>([]);
  
  useEffect(() => {
    if (plantTypesData) {
      setPlantTypes(Array.isArray(plantTypesData) ? plantTypesData : []);
    }
  }, [plantTypesData]);

  return (
    <>
      <Helmet>
        <title>Hemp Plant Types | HempQuarterz</title>
        <meta name="description" content="Explore different types of industrial hemp plants including fiber hemp, grain hemp, and cannabinoid hemp varieties." />
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-green-700 text-outline-black">
            Hemp Plant Types
          </h1>
          <p className="mt-4 text-lg text-neutral-dark max-w-3xl mx-auto">
            Industrial hemp is cultivated for specific purposes based on the variety. Learn about the different types of hemp plants and their unique characteristics.
          </p>
        </div>
      </div>

      {/* Plant types grid */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-green-700 text-outline-black mb-8 text-center">
            Hemp Cultivation Varieties
          </h2>
          <p className="text-center text-neutral-dark max-w-3xl mx-auto mb-12">
            Hemp plants are bred and cultivated for different purposes. Each type has unique characteristics optimized for specific industrial applications.
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video relative">
                    <Skeleton className="absolute inset-0" />
                  </div>
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-10 w-36" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plantTypes.map((plantType: PlantType) => (
                <Card key={plantType.id} className="overflow-hidden border border-green-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative">
                    <img 
                      src={plantType.id === 1 
                        ? "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hanffeld.jpg/1200px-Hanffeld.jpg" 
                        : plantType.imageUrl || 'https://via.placeholder.com/800x450?text=Hemp+Plant+Type'
                      } 
                      alt={`${plantType.name} plant type`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-heading font-semibold text-white">{plantType.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-neutral-dark mb-4">{plantType.description}</p>
                    {plantType.characteristics && (
                      <div className="mb-4">
                        <h4 className="font-medium text-green-700 mb-1">Characteristics:</h4>
                        <p className="text-sm text-neutral-medium">{plantType.characteristics}</p>
                      </div>
                    )}
                    {plantType.plantingDensity && (
                      <div className="mb-4">
                        <h4 className="font-medium text-green-700 mb-1">Planting Density:</h4>
                        <p className="text-sm text-neutral-medium">{plantType.plantingDensity}</p>
                      </div>
                    )}
                    <Link href={`/plant-type/${plantType.id}`}>
                      <div className="mt-2">
                        <Button variant="outline" className="group border-green-600 text-green-700 hover:bg-green-50">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plant types comparison */}
      <div className="bg-neutral-lightest py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-green-700 text-outline-black mb-12 text-center">
            Hemp Plant Types Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-light">
              <thead className="bg-neutral-lightest">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Plant Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Primary Purpose</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Characteristics</th>
                  <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-darkest uppercase tracking-wider">Typical Yield</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-light">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-darkest">Fiber Hemp</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Textile fibers, building materials</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Tall plants (3-5m), thin stalks, minimal branching</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">5-6 tons of fiber per acre</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-darkest">Grain/Seed Hemp</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Food, oil, nutritional products</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Medium height (2-3m), more branching, dense seed heads</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">800-1,200 lbs of seed per acre</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-neutral-darkest">Cannabinoid Hemp</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">CBD, CBG extraction for wellness products</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">Shorter (1-2m), bushy plants, flower-optimized</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-neutral-dark">1,000-2,000 lbs of flower per acre</div>
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
          <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-green-700 text-outline-black mb-4">
            Explore Hemp Plant Parts
          </h2>
          <p className="text-lg text-neutral-dark max-w-3xl mx-auto mb-8">
            Learn about the different parts of the hemp plant and their specific industrial applications.
          </p>
          <Link href="/plant-parts">
            <div className="inline-block">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                View Plant Parts
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PlantTypesListPage;