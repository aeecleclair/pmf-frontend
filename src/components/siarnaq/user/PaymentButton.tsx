import { HelloAssoButton } from "../custom/HelloAssoButton";
import { WarningDialog } from "../custom/WarningDialog";

import { usePaymentUrl } from "@/hooks/siarnaq/usePaymentUrl";
import { useRouter } from "@/i18n/navigation";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "../../ui/button";

export const PaymentButton = () => {
  const t = useTranslations("paymentButton");
  const [isOpened, setIsOpened] = useState(false);
  const { paymentUrl, isLoading, refetch } = usePaymentUrl();
  const router = useRouter();
  if (!isLoading && !!paymentUrl) {
    router.push(paymentUrl.url);
  }
  return (
    <>
      <WarningDialog
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        isLoading={isLoading}
        title={t("pay")}
        description={
          <div>
            <div className="my-2 font-semibold">{t("title")}</div>
            <p>{t("description")}</p>
          </div>
        }
        customButton={
          <HelloAssoButton isLoading={isLoading} onClick={() => refetch()} />
        }
      />
      <Button
        className="col-span-4 ml-auto w-[100px]"
        onClick={(_) => {
          setIsOpened(true);
        }}
      >
        {t("pay")}
      </Button>
    </>
  );
};
