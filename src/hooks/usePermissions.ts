import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getPermissions } from "@/api";
import { getPermissionsOptions } from "@/api/@tanstack/react-query.gen";

export const usePermissions = () => {
  const { isTokenExpired } = useAuth();
  const query = useQuery({
    ...getPermissionsOptions(),
    enabled: !isTokenExpired(),
  });

  return {
    permissions: query.data,
    ...query,
  };
};
