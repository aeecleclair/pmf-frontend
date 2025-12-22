"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HiTrash } from "react-icons/hi";
import { MergeIcon, UserRoundMinusIcon } from "lucide-react";
import { WarningDialog } from "@/components/common/WarningDialog";
import { useState } from "react";
import { useAdminTeam } from "@/hooks/raid/useAdminTeam";
import { RaidTeamPreview } from "@/api";
import { RemoveMemberDialog } from "./RemoveMemberDialog";
import { useTeams } from "@/hooks/raid/useTeams";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const {
    deleteTeam,
    isDeleteLoading,
    kickMember,
    isKickLoading,
    refetchTeam,
  } = useAdminTeam((row.original as RaidTeamPreview).id);
  const { refetchTeams } = useTeams();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRemoveMemberDialogOpen, setIsRemoveMemberDialogOpen] =
    useState(false);
  return (
    <>
      {isDeleteDialogOpen && (
        <WarningDialog
          isOpened={isDeleteDialogOpen}
          setIsOpened={setIsDeleteDialogOpen}
          isLoading={isDeleteLoading}
          title={`Suppression de l'équipe ${
            (row.original as RaidTeamPreview).name
          }`}
          description="Etes-vous sûr de vouloir supprimer cette équipe ?"
          validateLabel="Supprimer"
          callback={() => {
            deleteTeam(() => {
              refetchTeam();
              refetchTeams();
              setIsDeleteDialogOpen(false);
            });
          }}
        />
      )}
      {isRemoveMemberDialogOpen && (
        <RemoveMemberDialog
          isOpened={isRemoveMemberDialogOpen}
          setIsOpened={setIsRemoveMemberDialogOpen}
          isLoading={isKickLoading}
          title={`Retirer un membre de l'équipe ${
            (row.original as RaidTeamPreview).name
          }`}
          team={row.original as RaidTeamPreview}
          validateLabel="Retirer"
          callback={(participantId) => {
            kickMember(participantId, () => {
              refetchTeam();
              refetchTeams();
              setIsRemoveMemberDialogOpen(false);
            });
          }}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-45">
          {row.getValue("second") === null ? (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                row.toggleSelected(!row.getIsSelected());
              }}
            >
              {row.getIsSelected()
                ? "Annuler la fusion"
                : "Fusionner avec une autre équipe"}
              <DropdownMenuShortcut>
                <MergeIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                setIsRemoveMemberDialogOpen(true);
              }}
            >
              Retirer un member
              <DropdownMenuShortcut>
                <UserRoundMinusIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              setIsDeleteDialogOpen(true);
            }}
          >
            {"Supprimer l'équipe"}
            <DropdownMenuShortcut>
              <HiTrash className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
