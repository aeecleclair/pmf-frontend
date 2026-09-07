import {
  getDocumentsDocumentIdDownloadOptions,
  getDocumentsDocumentIdTokenOptions,
} from "@/api/@tanstack/react-query.gen";
import { useAuth } from "@/app/authContext";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useDocument = () => {
  const { isTokenExpired } = useAuth();
  const queryClient = useQueryClient();

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDocumentWithTokenLoading, setIsDocumentWithTokenLoading] =
    useState(false);

  const refetchData = async (documentId: string) => {
    if (isTokenExpired()) return { data: null };

    setIsDataLoading(true);
    try {
      const data = await queryClient.fetchQuery({
        ...getDocumentsDocumentIdDownloadOptions({
          path: { document_id: documentId },
        }),
      });
      return { data: data as File };
    } catch (error) {
      console.error(error);
      return { data: null };
    } finally {
      setIsDataLoading(false);
    }
  };

  const refetchDocumentWithToken = async (documentId: string) => {
    if (isTokenExpired()) return { data: null };

    setIsDocumentWithTokenLoading(true);
    try {
      const data = await queryClient.fetchQuery({
        ...getDocumentsDocumentIdTokenOptions({
          path: { document_id: documentId },
        }),
      });
      return { data };
    } catch (error) {
      console.error(error);
      return { data: null };
    } finally {
      setIsDocumentWithTokenLoading(false);
    }
  };

  return {
    refetchData,
    refetchDocumentWithToken,
    isDocumentWithTokenLoading,
    isDataLoading,
  };
};
