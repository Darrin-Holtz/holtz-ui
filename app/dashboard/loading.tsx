import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8">
      <Skeleton className="h-8 w-40 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Skeleton className="h-28 rounded-xl" />
        <Skeleton className="h-28 rounded-xl" />
      </div>
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-40 rounded-xl mb-8" />
      <Skeleton className="h-6 w-32 mb-4" />
      <Skeleton className="h-48 rounded-xl" />
    </section>
  );
}
