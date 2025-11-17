import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import QueryProvider from "./QueryProvider";

import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}


export default async function LocaleLayout({
  children,
  params,
  }: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
  }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return (
    <html lang={locale}>
        <body>
          <Suspense>
            <QueryProvider>
              <NextIntlClientProvider>
                {children}
              </NextIntlClientProvider>
            </QueryProvider>
          </Suspense>
        </body>
      </html>
  );
}

