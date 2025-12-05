import { useTokenStore } from "@/stores/token";

import { useQuery } from "@tanstack/react-query";
import { Locale } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import * as auth from "oauth4webapi";

export const useToken = () => {
  const { locale } = useParams<{ locale: Locale }>();
  const router = useRouter();
  const issuerUrl = new URL(
    process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://hyperion.myecl.fr",
  );
  const client: auth.Client = {
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
    token_endpoint_auth_method: "none",
  };
  async function getIssuer() {
    return auth
      .discoveryRequest(issuerUrl, { algorithm: "oauth2" })
      .then((response) => auth.processDiscoveryResponse(issuerUrl, response));
  }
  const { token, setToken, refreshToken, setRefreshToken } = useTokenStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const isTokenExpired = () => {
    if (!token) {
      return true;
    }
    const access_token_expires = JSON.parse(atob(token.split(".")[1])).exp;
    const now = Math.floor(Date.now() / 1000);
    return access_token_expires - 60 < now;
  };

  async function getToken(): Promise<string | undefined | null> {
    if (!isTokenExpired()) {
      return token;
    }
    if (isRefreshing) {
      return;
    }
    if (!refreshToken) {
      setToken(null);
      router.push(`/${locale}/login`);
      return;
    }
    setIsRefreshing(true);
    const hyperionIssuer = await getIssuer();
    const response = await auth.refreshTokenGrantRequest(
      hyperionIssuer,
      client,
      refreshToken,
    );

    let challenges: auth.WWWAuthenticateChallenge[] | undefined;
    if ((challenges = auth.parseWwwAuthenticateChallenges(response))) {
      for (const challenge of challenges) {
        console.error("WWW-Authenticate Challenge", challenge);
      }
      setToken(null);
      setRefreshToken(null);
      router.push(`/${locale}/login`);
      return;
    }

    const result = await auth.processRefreshTokenResponse(
      hyperionIssuer,
      client,
      response,
    );
    if (auth.isOAuth2Error(result)) {
      console.error("Error Response", result);
      setToken(null);
      setRefreshToken(null);
      router.push(`/${locale}/login`);
      return;
    }

    setToken(result.access_token);
    setRefreshToken(result.refresh_token ?? null);
    return result.access_token;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["token", token, isTokenExpired()],
    queryFn: async () => {
      return getToken().then((token) => {
        setIsRefreshing(false);
        return token;
      });
    },
    enabled: isTokenExpired(),
  });

  return { token: data, isLoading, error, getToken, refetch, isTokenExpired };
};
