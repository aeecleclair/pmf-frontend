import { getPmfOffers } from "@/api";
import { useAuth } from "@/hooks/useAuth";

import { useQuery } from "@tanstack/react-query";

export const useOffers = () => {
  const { isTokenExpired } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["offers"],
    queryFn: getPmfOffers,
    retry: 3,
    enabled: !isTokenExpired(),
  });
  return {
    offers: data?.data || [],
    isLoading,
    refetch,
  };
};
