import { Spinner } from "@/components/ui/icons/Spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="h-screen w-full">
      <Spinner className="absolute left-1/2 top-1/2 animate-spin" />
    </div>
  );
}
