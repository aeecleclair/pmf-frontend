import { useToken } from "./useToken";

import { getCdrOnlineSellersOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useOnlineSellers = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    ...getCdrOnlineSellersOptions(),
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    onlineSellers: data || [],
    isLoading,
    refetch,
  };
};
