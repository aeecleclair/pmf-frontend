import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface DocumentInfo {
  id?: string;
  file?: File;
}

interface DocumentsStore {
  documents: Record<string, Record<string, DocumentInfo>>;
  setDocument: (userId: string, key: string, id: string, file: File) => void;
}

export const useDocumentsStore = create<DocumentsStore>()(
  devtools(
    persist(
      (set) => ({
        documents: {},
        setDocument: (userId: string, key: string, id: string, file: File) => {
          set((state) => ({
            documents: {
              ...state.documents,
              [userId]: {
                ...state.documents[userId],
                [key]: {
                  id: id,
                  file: file,
                },
              },
            },
          }));
        },
      }),
      {
        name: "raid-documents-storage",
      },
    ),
  ),
);
