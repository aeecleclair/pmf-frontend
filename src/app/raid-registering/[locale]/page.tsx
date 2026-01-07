"use client";

import { EmptyParticipantCard } from "@/components/raid/home/participantView/EmptyParticipantCard";
import { ParticipantCard } from "@/components/raid/home/participantView/ParicipantCard";
import { TeamCard } from "@/components/raid/home/teamCard/TeamCard";
import { TopBar } from "@/components/raid/home/TopBar";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
import { useMeTeam } from "@/hooks/raid/useMeTeam";
import { CreateParticipant } from "@/components/raid/home/CreateParticipant";
import { useHasRaidPermission } from "@/hooks/raid/useIsRaidAdmin";
import { useMeParticipant } from "@/hooks/raid/useMeParticipant";
import { useEffect, useState } from "react";
import { useInviteTokenStore } from "@/stores/raid/inviteTokenStore";
import { JoinTeamDialog } from "@/components/raid/home/JoinTeamDialog";
import { useInformation } from "@/hooks/raid/useInformation";
import { getDaysLeft } from "@/lib/dateFormat";
import { WarningDialog } from "@/components/common/WarningDialog";
import { StatusDialog } from "@/components/raid/custom/StatusDialog";
import { RegisteringCompleteDialog } from "@/components/raid/home/RegisteringCompleteDialog";
import { useToast } from "@/components/ui/use-toast";
import { useMeUser } from "@/hooks/useMeUser";
import { useRouter } from "@/i18n/navigation";

const Home = () => {
  const { isTokenQueried, token } = useAuth();
  const { user } = useMeUser();
  const { me, isFetched, refetch } = useMeParticipant();
  const isAdmin = useHasRaidPermission();
  const {
    team,
    createTeam,
    refetchTeam,
    isLoading: isTeamLoading,
  } = useMeTeam();
  const [isOpened, setIsOpened] = useState(false);
  const [isEndDialogOpened, setIsEndDialogOpened] = useState(true);
  const searchParams = useSearchParams();
  const newInviteToken = searchParams.get("invite");
  const code = searchParams.get("code");
  const { inviteToken, setInviteToken } = useInviteTokenStore();
  const router = useRouter();
  const { information } = useInformation();
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  if (
    newInviteToken !== null &&
    inviteToken !== newInviteToken &&
    typeof window !== "undefined"
  ) {
    setInviteToken(newInviteToken);
    router.replace("/");
  }

  if (isTokenQueried && token === null) {
    router.replace("/login");
  }

  if (isAdmin.isRaidAdmin && typeof window !== "undefined") {
    const redirection = searchParams.get("redirect");
    if (redirection !== null) {
      router.replace(redirection);
    } else {
      router.replace("/admin");
    }
  }

  if (isFetched && me === undefined && !isOpened) {
    setIsOpened(true);
  }

  if (inviteToken !== undefined && !isOpened) {
    setIsOpened(true);
  }

  if (me !== undefined && team === undefined && !isOpened) {
    setIsOpened(true);
  }

  return (
    <>
      {code === "succeeded" && (
        <StatusDialog
          isOpened={isEndDialogOpened}
          setIsOpened={setIsEndDialogOpened}
          title="Paiement effectué"
          description="Votre paiement a été effectué avec succès. Vous pouvez terminer votre inscription, si ce n'est pas encore le cas."
          status="SUCCESS"
          callback={() => {
            refetch();
            setIsEndDialogOpened(false);
            router.replace("/");
          }}
        />
      )}
      {code === "refused" && (
        <StatusDialog
          isOpened={isEndDialogOpened}
          setIsOpened={setIsEndDialogOpened}
          title="Paiement refusé"
          description="Votre paiement a été refusé. Vous pouvez réessayer de payer, si le problème persiste, veuillez nous contacter."
          status="ERROR"
          callback={() => {
            setIsEndDialogOpened(false);
            router.replace("/");
          }}
        />
      )}
      {team?.validation_progress === 100 && (
        <RegisteringCompleteDialog
          isOpened={isEndDialogOpened}
          setIsOpened={setIsEndDialogOpened}
        />
      )}
      {isFetched && me === undefined && isOpened && user && (
        <>
          <CreateParticipant
            isOpened={isOpened}
            setIsOpened={setIsOpened}
            user={user}
          />
          <>
            {(information?.raid_registering_end_date
              ? getDaysLeft(information?.raid_registering_end_date) < 0
              : false) && (
              <WarningDialog
                isOpened={isEndDialogOpened}
                setIsOpened={setIsEndDialogOpened}
                isLoading={false}
                title="Inscriptions terminées"
                description="Les inscriptions sont terminées. Si vous ne l'avez pas encore fait, nous vous invitons à prendre contact avec l'organisation pour connaître les étapes à suivre."
                validateLabel="Continuer"
                callback={() => setIsEndDialogOpened(false)}
              />
            )}
          </>
        </>
      )}
      {isFetched && me && team === undefined && !isTeamLoading && (
        <WarningDialog
          isOpened={isEndDialogOpened}
          setIsOpened={setIsEndDialogOpened}
          isLoading={isLoading}
          title="Aucune équipe trouvée"
          description="Vous n'êtes pas encore inscrit dans une équipe. Vous pouvez en créer une. Si vous avez reçu un lien d'invitation, vous pouvez l'utiliser pour rejoindre une équipe."
          validateLabel="Créer une équipe"
          width="w-[140px]"
          callback={() => {
            setIsLoading(true);
            createTeam(
              {
                name: `Équipe de ${me.firstname} ${me.name}`,
              },
              () => {
                refetchTeam();
                setIsEndDialogOpened(false);
                setIsLoading(false);
                toast({
                  title: "Votre équipe a été créée avec succès",
                });
              }
            );
          }}
        />
      )}
      {inviteToken !== undefined && (
        <JoinTeamDialog isOpened={isOpened} setIsOpened={setIsOpened} />
      )}
      <TopBar />
      <main className="flex flex-col items-center mt-4">
        <div className="w-full px-10 max-md:px-8">
          <TeamCard team={team} />
        </div>
        <div className="grid lg:grid-cols-2 gap-10 w-full p-10 grid-cols-1 max-lg:p-8 max-lg:gap-8">
          <ParticipantCard participant={team?.captain} isCaptain />
          {team?.second !== null ? (
            <ParticipantCard participant={team?.second} isCaptain={false} />
          ) : (
            <EmptyParticipantCard team={team} />
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
