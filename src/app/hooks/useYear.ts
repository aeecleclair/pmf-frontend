import { useQuery } from "@tanstack/react-query";

export const useYear = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["year"],
    queryFn: getCdrYear,
    retry: 3,
    enabled: true,
  });

  return {
    year: data?.data?.year ?? 1970,
    isLoading,
    refetch,
  };
};
