import { getCdrYearOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useYear = () => {
  const { data, isLoading, refetch } = useQuery({
    ...getCdrYearOptions(),
    retry: 3,
    enabled: true,
  });

  return {
    year: data?.year ?? 1970,
    isLoading,
    refetch,
  };
};
