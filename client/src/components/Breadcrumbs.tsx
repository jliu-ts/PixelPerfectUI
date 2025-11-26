import React from "react";
import { useLocation, Link } from "wouter";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ROUTE_NAMES: Record<string, string> = {
  "": "Home",
  "search": "Explore",
  "create": "Studio",
  "profile": "Profile",
  "ideas": "Ideas",
  "marketplace": "Marketplace",
  "collab": "Collab Room",
  "brand": "Brand Kit",
  "context": "Context",
  "avatars": "Avatars",
  "camera": "AR Cam",
  "research": "Society AI",
  "notifications": "Alerts",
  "store": "Store",
  "wallet": "Wallet",
  "battle": "Battle Mode",
  "podcast": "Podcast",
  "studio": "Studio",
  "publish": "Publish",
};

export function AppBreadcrumbs() {
  const [location] = useLocation();
  const pathSegments = location.split("/").filter((segment) => segment !== "");

  // Don't show breadcrumbs on home
  if (pathSegments.length === 0) return null;

  return (
    <div className="px-6 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          
          {pathSegments.map((segment, index) => {
            const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
            const isLast = index === pathSegments.length - 1;
            const name = ROUTE_NAMES[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <React.Fragment key={path}>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage className="text-white font-medium">{name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={path}>{name}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
