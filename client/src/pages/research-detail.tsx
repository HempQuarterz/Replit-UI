import { useParams, Link } from "wouter";
import { Helmet } from "react-helmet";
import { ResearchPaper } from "@shared/schema";
import { useResearchPaper, useResearchPapersByPlantType } from "../hooks/use-research-papers";
import { usePlantType, usePlantPart, useIndustries } from "../hooks/use-plant-data";
import ResearchPaperDetail from "@/components/research/research-paper-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
// Import Icon for breadcrumb
import { ChevronRight } from "lucide-react";

export default function ResearchDetailPage() {
  // Get paperId from URL
  const { paperId } = useParams<{ paperId: string }>();
  const id = parseInt(paperId);

  // Fetch research paper data
  const { data: paper, isLoading: isLoadingPaper } = useResearchPaper(id);
  
  // Fetch related data based on the paper's associations
  const { data: plantType, isLoading: isLoadingPlantType } = usePlantType(
    paper?.plantTypeId || null
  );
  
  const { data: plantPart, isLoading: isLoadingPlantPart } = usePlantPart(
    paper?.plantPartId || null
  );
  
  const { data: industries, isLoading: isLoadingIndustries } = useIndustries();
  const industry = industries?.find((i: { id: number }) => i.id === paper?.industryId);

  // Fetch related papers (papers with the same plant type)
  const { data: relatedPapers } = useResearchPapersByPlantType(
    paper?.plantTypeId || null
  );

  // Filter out the current paper from related papers and limit to 4
  const filteredRelatedPapers = relatedPapers
    ?.filter((relatedPaper: ResearchPaper) => relatedPaper.id !== paper?.id)
    .slice(0, 4);

  // Generate page title and description for SEO
  const pageTitle = paper ? `${paper.title} | Research | HempQuarterz` : "Research Paper | HempQuarterz";
  const pageDescription = paper 
    ? `${paper.abstract.substring(0, 150)}...` 
    : "Detailed information about industrial hemp research paper.";

  const isLoading = isLoadingPaper || isLoadingPlantType || isLoadingPlantPart || isLoadingIndustries;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav aria-label="breadcrumb" className="flex">
              <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                <li className="inline-flex items-center gap-1.5">
                  <Link href="/">
                    <a className="text-sm text-white/70 hover:text-green-400 transition-colors">Home</a>
                  </Link>
                </li>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <li className="inline-flex items-center gap-1.5">
                  <Link href="/research">
                    <a className="text-sm text-white/70 hover:text-green-400 transition-colors">Research</a>
                  </Link>
                </li>
                <ChevronRight className="h-4 w-4 text-white/50" />
                <li className="inline-flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-green-400 pointer-events-none cursor-default" aria-current="page">
                    {paper?.title ? (paper.title.length > 40 ? paper.title.substring(0, 40) + '...' : paper.title) : 'Loading...'}
                  </span>
                </li>
              </ol>
            </nav>
          </div>

          {/* Back button */}
          <div className="mb-6">
            <Link href="/research">
              <Button variant="outline" className="text-green-400 border-green-700 hover:bg-green-900/30 hover:text-green-300">
                <ArrowLeft size={16} className="mr-1" />
                Back to Research
              </Button>
            </Link>
          </div>

          {/* Research paper detail */}
          {!isLoading && paper ? (
            <ResearchPaperDetail 
              paper={paper}
              isLoading={isLoading}
              plantType={plantType || null}
              plantPart={plantPart || null}
              industry={industry || null}
              relatedPapers={filteredRelatedPapers || []}
            />
          ) : (
            <ResearchPaperDetail 
              paper={{} as any} 
              isLoading={true} 
            />
          )}
        </div>
      </div>
    </>
  );
}