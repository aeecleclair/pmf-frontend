"use client";
import { useTokenStore } from "@/stores/token";
import { useUser } from "@/hooks/useUser";
import TestPage from "@/components/user/TestPage";
// import OffersPanel from "../../components/user/OffersPanel"

export default function Page() {
  const { userId } = useTokenStore();
  const { user } = useUser(userId);
  console.log(user);
  return (
    <div>
      <p>
        Bienvenue {user?.firstname} {user?.name} sur PMF !
      </p>
      <TestPage />
      {/* <OffersPanel /> */}
    </div>
  );
}
