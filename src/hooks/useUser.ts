import { useToken } from "./useToken";

import { getUsersUserIdOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string | null) => {
  const { isTokenExpired } = useToken();

  const query = useQuery({
    ...getUsersUserIdOptions({
      path: { user_id: userId ?? "" },
    }),
    enabled: !!userId && !isTokenExpired(),
  });

  return {
    user: query.data,
    ...query,
  };
};
