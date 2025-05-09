import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className={index > 0 ? "flex items-center" : ""}>
            {index > 0 && (
              <ChevronRight className="h-5 w-5 text-neutral-medium" />
            )}
            
            {item.href && index < items.length - 1 ? (
              <Link href={item.href}>
                <a className="text-neutral-medium hover:text-primary ml-2">
                  {item.label}
                </a>
              </Link>
            ) : (
              <span className={`${index > 0 ? "ml-2" : ""} ${index === items.length - 1 ? "text-neutral-dark font-medium" : "text-neutral-medium hover:text-primary"}`}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
