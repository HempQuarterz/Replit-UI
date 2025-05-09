import { usePlantTypes } from "@/hooks/use-plant-data";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PlantTypeCards = () => {
  const { data: plantTypes, isLoading } = usePlantTypes();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-darkest text-center mb-8">Select Hemp Plant Type</h2>
        <p className="text-center text-neutral-dark max-w-3xl mx-auto mb-10">
          Industrial hemp is cultivated with different focuses depending on the desired output. Choose a cultivation type below to explore its specific applications.
        </p>
        
        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto">
            {[1, 2, 3].map((i) => (
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
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:max-w-5xl lg:mx-auto">
            {plantTypes?.map((plantType) => (
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
                    <p className="mt-2 text-sm text-white/80">{plantType.description}</p>
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
  );
};

export default PlantTypeCards;
