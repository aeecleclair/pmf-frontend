import { postCdrPayMutation } from "@/api/@tanstack/react-query.gen";

import { useQuery } from "@tanstack/react-query";

export const usePaymentUrl = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["paymentUrl"],
    ...postCdrPayMutation(),
    retry: 3,
    enabled: false,
  });

  return {
    paymentUrl: data,
    isLoading,
    refetch,
  };
};
