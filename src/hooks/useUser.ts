import { useAuth } from "./useToken";

import { getUsersMeOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string | null) => {
  const { isTokenExpired } = useAuth();
  const query = useQuery({
    ...getUsersMeOptions(),
    enabled: !!userId && !isTokenExpired(),
  });

  return {
    user: query.data,
    ...query,
  };
};
