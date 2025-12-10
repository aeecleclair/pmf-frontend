"use client";
import { useMeUser } from "@/hooks/useMeUser";
import TestPage from "@/components/user/TestPage";
// import OffersPanel from "../../components/user/OffersPanel"

export default function Page() {
  const { user } = useMeUser();
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
