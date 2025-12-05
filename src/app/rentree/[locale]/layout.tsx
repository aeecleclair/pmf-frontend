import { AuthInterceptor } from "../../provider";
import { QueryProvider } from "./queryProvider";
import { ThemeProvider } from "./theme-provider";
import TopBar from "./topbar";

import { routing } from "@/i18n/routing";

import type { Metadata } from "next";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Suspense } from "react";

import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "siarnaq" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
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
    <Suspense>
      <html lang={locale}>
        <Script
          defer
          data-domain="rentree.myecl.fr"
          src="https://plausible.eclair.ec-lyon.fr/js/script.js"
          strategy="lazyOnload"
        />

        <body className={inter.className}>
          <QueryProvider>
            <AuthInterceptor>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                enableColorScheme={true}
              >
                <NextIntlClientProvider>
                  <TopBar />
                  {children}
                  <Toaster />
                </NextIntlClientProvider>
              </ThemeProvider>
            </AuthInterceptor>
          </QueryProvider>
        </body>
      </html>
    </Suspense>
  );
}
