import { CdrStatus, Status, patchCdrStatus } from "@/api";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { useStatus } from "@/hooks/siarnaq/useStatus";

import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";

interface SellerTabProps {
  status: Status;
}

export const StatusAccordionItem = ({ status }: SellerTabProps) => {
  const t = useTranslations("statusAccordionItem");
  const { toast } = useToast();
  const { refetch: refetchStatus } = useStatus();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateStatus = async (status: CdrStatus) => {
    setIsLoading(true);
    const body: Status = {
      status: status,
    };
    const { error } = await patchCdrStatus({
      body: body,
    });
    if (error) {
      toast({
        description: error.detail,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    refetchStatus();
    setIsLoading(false);
  };

  const statusLabels = {
    pending: t("pending"),
    online: t("online"),
    onsite: t("onsite"),
    closed: t("closed"),
  };

  const nextStep: Record<CdrStatus, CdrStatus> = {
    pending: "online",
    online: "onsite",
    onsite: "closed",
    closed: "pending",
  };

  const statusButtonLabel = {
    pending: t("reinit"),
    online: t("setOnline"),
    onsite: t("onSiteButtonLabel"),
    closed: t("close"),
  };

  return (
    <AccordionItem value="status">
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">{t("status")}</h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        {status && (
          <div className="flex flex-row space-y-2 justify-between items-center w-full">
            <span>
              {statusLabels[status.status as keyof typeof statusLabels]}
            </span>
            <LoadingButton
              onClick={() =>
                updateStatus(nextStep[status.status as keyof typeof nextStep])
              }
              isLoading={isLoading}
              className="w-[130px]"
            >
              {
                statusButtonLabel[
                  nextStep[
                    status.status as keyof typeof nextStep
                  ] as keyof typeof statusButtonLabel
                ]
              }
            </LoadingButton>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};
