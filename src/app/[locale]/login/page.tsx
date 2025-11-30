"use client";

import MyECLButton from "@/components/login/MyEclButton";
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function Login(){
    const t = useTranslations("login");
    const router = useRouter();
    return (
      <div>
          {t("title")}
          <MyECLButton />
          <span>{t("register")}</span>
          <Button
            variant="outline"
            size="lg"
            className="w-full m-auto"
            onClick={() => {
              let redirectUri =
                process.env.NEXT_PUBLIC_BACKEND_URL + "/calypsso/register";
              router.push(redirectUri);
            }}
          >
            {t("student")}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full m-auto"
            onClick={() => {
              let redirectUri =
                process.env.NEXT_PUBLIC_BACKEND_URL + "/calypsso/register?external=true";
              router.push(redirectUri);
            }}
          >
            {t("alumni")}
          </Button>
      </div>
    );
};
