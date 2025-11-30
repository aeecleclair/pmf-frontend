"use client";

import { useToken } from "@/hooks/useToken";
import { useTokenStore } from "@/stores/token";

import { createClient } from "@/api/client/client.gen";

export default function Provider({ children }: { children: React.ReactNode }) {
  const { token } = useTokenStore();
  const { refetch } = useToken();

  const client = createClient({
    // set default base url for requests
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || "https://hyperion.myecl.fr",
  });

  client.interceptors.request.use(async (request) => {
    console.log(request.baseUrl);
    console.log(useTokenStore.getState().token);
    if (!token) {
      await refetch();
    }
    request.headers = {
      ...(request.headers as Record<string, string>),
      Authorization: `Bearer ${token}`,
    };
    return;
  });

  return children;
}