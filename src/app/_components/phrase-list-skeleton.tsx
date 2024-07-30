import { PhraseSkeleton } from "./phrase-skeleton";

export function PhraseListSkeleton() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-start gap-4">
      {new Array(4).fill(0).map((_, i) => (
        <PhraseSkeleton key={`phrase-skeleton-${i}`} />
      ))}
    </div>
  );
}
