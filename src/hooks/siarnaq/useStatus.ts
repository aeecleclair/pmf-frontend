import { getCdrStatusOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useStatus = () => {
  const { data, isLoading, refetch } = useQuery({
    ...getCdrStatusOptions(),
    retry: 3,
    enabled: true,
  });

  return {
    status: data,
    isLoading,
    refetch,
  };
};
