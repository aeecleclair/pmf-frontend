"use client";

import { useLocale, useTranslations } from "next-intl";
import Error from "next/error";

export default function NotFound() {
  const t = useTranslations("common");
  const locale = useLocale();
  return (
    <html lang={locale}>
      <body>
        <Error statusCode={403} title={t("notAuthorizedTitle")} />
      </body>
    </html>
  );
}
