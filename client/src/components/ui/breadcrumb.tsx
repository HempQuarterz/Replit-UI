import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps {
  className?: string;
  children?: React.ReactNode;
}

export function Breadcrumb({ className, children }: BreadcrumbProps) {
  return (
    <nav className={cn("flex", className)} aria-label="breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">{children}</ol>
    </nav>
  );
}

export interface BreadcrumbItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbItem({ children, className }: BreadcrumbItemProps) {
  return (
    <li className={cn("inline-flex items-center gap-1.5", className)}>
      {children}
    </li>
  );
}

export interface BreadcrumbLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isCurrentPage?: boolean;
}

export function BreadcrumbLink({ href, children, className, isCurrentPage = false }: BreadcrumbLinkProps) {
  if (isCurrentPage) {
    return (
      <span
        className={cn(
          "text-sm font-semibold text-green-400 pointer-events-none cursor-default",
          className
        )}
        aria-current="page"
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href}>
      <a className={cn("text-sm text-white/70 hover:text-green-400 transition-colors", className)}>
        {children}
      </a>
    </Link>
  );
}

export interface BreadcrumbSeparatorProps {
  className?: string;
}

export function BreadcrumbSeparator({ className }: BreadcrumbSeparatorProps) {
  return <ChevronRight className={cn("h-4 w-4 text-white/50", className)} />;
}