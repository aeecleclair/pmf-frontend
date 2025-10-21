import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { QueryProvider } from "./queryProvider";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <Suspense><html><QueryProvider><NextIntlClientProvider>{children}</NextIntlClientProvider></QueryProvider></html></Suspense>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}