import { getPmfOffers } from "@/api";
import { useToken } from '@/hooks/useToken'

import { useQuery } from "@tanstack/react-query"

export const useOffers = () => {
    const { isTokenExpired } = useToken();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["offers"],
        queryFn: getPmfOffers,
        retry: 3,
        enabled: !isTokenExpired(),
    })
    return {
        offers: data?.data || [],
        isLoading,
        refetch,
    };
}