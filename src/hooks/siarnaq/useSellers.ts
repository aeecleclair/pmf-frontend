import { useAuth } from "../useAuth";

import { getCdrUsersMeSellersOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useSellers = () => {
  const { isTokenExpired } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    ...getCdrUsersMeSellersOptions(),
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    sellers: data || [],
    isLoading,
    refetch,
  };
};
