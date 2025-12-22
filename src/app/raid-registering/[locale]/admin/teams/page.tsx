"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/raid/admin/teams/DataTable";
import { columns } from "@/components/raid/admin/teams/Columns";
import { TopBar } from "@/components/raid/admin/TopBar";
import { useTeams } from "@/hooks/raid/useTeams";
import { useIsRaidAdmin } from "@/hooks/raid/useIsRaidAdmin";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { TeamSheet } from "@/components/raid/admin/teams/teamSheet/TeamSheet";
import { useRouter } from "@/i18n/navigation";

const Dashboard = () => {
  const isAdmin = useIsRaidAdmin();
  const { teams } = useTeams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpened, setIsOpened] = useState(false);
  const [teamId, setTeamId] = useState<string | null>(null);

  if (!isAdmin && typeof window !== "undefined") {
    const redirectUrl = new URL(window.location.href);
    const path = redirectUrl.pathname + redirectUrl.search;
    router.replace(`/?redirect=${path}`);
  }

  const selectedTeamId = searchParams.get("teamId");
  if (selectedTeamId !== teamId) {
    setTeamId(selectedTeamId);
    setIsOpened(!!selectedTeamId);
  }

  function handleModalClose() {
    setIsOpened(false);
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.delete("teamId");
    const query = current.toString();
    router.replace(`/admin/teams?${query}`);
    setTeamId(null);
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <TopBar />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Equipes</CardTitle>
            <CardDescription>Liste des équipes enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            {teams && <DataTable data={teams} columns={columns} />}
          </CardContent>
        </Card>
      </main>
      {teamId && (
        <TeamSheet
          isOpened={isOpened}
          onClose={handleModalClose}
          teamId={teamId}
        />
      )}
    </div>
  );
};

export default Dashboard;
