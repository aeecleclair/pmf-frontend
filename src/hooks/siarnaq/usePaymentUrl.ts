import { postCdrPay } from "@/api";

import { useQuery } from "@tanstack/react-query";

export const usePaymentUrl = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["paymentUrl"],
    queryFn: () => postCdrPay(),
    retry: 3,
    enabled: false,
  });

  return {
    paymentUrl: data?.data,
    isLoading,
    refetch,
  };
};
