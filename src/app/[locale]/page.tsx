"use client";
import TestPage from "../../components/user/TestPage";
import { useTokenStore } from "@/stores/token";
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import OffersPanel from "../../components/user/OffersPanel"

export default function Page() {
  const { userId } = useTokenStore();
  const { user, refetch } = useUser(userId);
  const router = useRouter();
  console.log(user);
  return (
    <div>
      <p>Bienvenue { user?.firstname } sur PMF !</p> 
      <TestPage />
      <OffersPanel />
    </div>
  );
}