import { useAuth } from "./useAuth";

import { getUsersMeOptions } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const useMeUser = () => {
  const { isTokenExpired, token } = useAuth();
  console.log("Checking token expiration:", isTokenExpired(), token);
  const query = useQuery({
    ...getUsersMeOptions(),
    enabled: !isTokenExpired(),
  });

  return {
    user: query.data,
    ...query,
  };
};
