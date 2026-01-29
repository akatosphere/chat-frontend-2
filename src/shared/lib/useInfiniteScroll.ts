import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isSearching: boolean;
  fetchNextPage: () => void;
};

export const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  isSearching,
  fetchNextPage,
}: UseInfiniteScrollProps) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || isSearching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, isSearching, fetchNextPage]);

  return loadMoreRef;
};
