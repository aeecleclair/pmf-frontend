import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface InviteTokenStore {
  inviteToken?: string;
  setInviteToken: (InviteToken?: string) => void;
  resetInviteToken: () => void;
}

export const useInviteTokenStore = create<InviteTokenStore>()(
  devtools(
    persist(
      (set) => ({
        InviteToken: undefined,
        setInviteToken: (InviteToken?: string) => {
          set({ inviteToken: InviteToken });
        },
        resetInviteToken: () => {
          set({ inviteToken: undefined });
        },
      }),
      {
        name: "raid-invite-token-storage",
      },
    ),
  ),
);
