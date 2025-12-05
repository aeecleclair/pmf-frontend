import { useToken } from "./useToken";

import { getCdrUsersUserIdOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useCdrUser = (userId: string | null) => {
  const { isTokenExpired } = useToken();
  const { data, isLoading, refetch } = useQuery({
    ...getCdrUsersUserIdOptions({
      path: { user_id: userId! },
    }),
    retry: 3,
    enabled: !isTokenExpired() && !!userId,
  });

  return {
    user: data,
    isLoading,
    refetch,
  };
};
