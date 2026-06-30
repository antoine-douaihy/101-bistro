import { Container } from "@/components/common/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <Container width="wide" className="py-24">
      <div className="mx-auto max-w-3xl space-y-5 text-center">
        <Skeleton className="mx-auto h-7 w-48 rounded-full" />
        <Skeleton className="mx-auto h-16 w-full max-w-xl" />
        <Skeleton className="mx-auto h-4 w-full max-w-md" />
        <div className="flex justify-center gap-3 pt-4">
          <Skeleton className="h-13 w-44 rounded-2xl" />
          <Skeleton className="h-13 w-36 rounded-2xl" />
        </div>
      </div>
    </Container>
  );
}
