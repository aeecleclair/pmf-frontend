import { useAuth } from "../useAuth";

import { getUsersMeOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useCoreUser = () => {
  const { isTokenExpired } = useAuth();
  const adminCdrId = "c1275229-46b2-4e53-a7c4-305513bb1a2a";
  const { data, isLoading, refetch } = useQuery({
    ...getUsersMeOptions(),
    retry: 3,
    enabled: !isTokenExpired(),
  });

  return {
    user: data,
    isAdmin: data?.groups?.map((group) => group.id).includes(adminCdrId),
    isLoading,
    refetch,
  };
};
