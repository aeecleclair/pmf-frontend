import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getVariablesOptions } from "@/api/@tanstack/react-query.gen";

export const useCoreVariables = () => {
  const { isTokenExpired } = useAuth();
  const query = useQuery({
    ...getVariablesOptions(),
    enabled: !isTokenExpired(),
  });

  return {
    variables: query.data,
    ...query,
  };
};
