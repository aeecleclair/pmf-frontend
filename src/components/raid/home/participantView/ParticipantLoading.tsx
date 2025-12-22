import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ParticipantLoading = () => {
  return (
    <CardContent>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="grid p-2 grid-cols-6 items-center w-full h-16.25"
        >
          <span className="font-semibold text-left my-auto col-span-2">
            <Skeleton className="w-32 h-7" />
          </span>
          <Skeleton className="w-64 h-6 col-span-4 ml-auto" />
        </div>
      ))}
    </CardContent>
  );
};
