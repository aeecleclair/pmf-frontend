import { useToken } from "./useToken";

import { getMembershipsOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useMemberships = () => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    ...getMembershipsOptions(),
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    memberships: data || [],
    isLoading,
    refetch,
  };
};
