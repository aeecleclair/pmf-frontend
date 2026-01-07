"use client";

import { useLocale, useTranslations } from "next-intl";

export default function NotAuthorized() {
  const t = useTranslations("common");
  const locale = useLocale();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-2xl font-bold">403 - Accès Refusé</h1>
      <p>{t("notAuthorizedTitle")}</p>
    </div>
  );
}
