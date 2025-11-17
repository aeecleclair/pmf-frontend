import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { QueryProvider } from "./queryProvider";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
  return (
    <Suspense>
      <html lang={locale}>
        <body>
          <QueryProvider>
            <NextIntlClientProvider>
              {children}
            </NextIntlClientProvider>
          </QueryProvider>
        </body>
      </html>
    </Suspense>
  );
}

