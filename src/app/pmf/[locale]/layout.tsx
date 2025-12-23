import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import QueryProvider from "../../QueryProvider";
import TopBar from "./topbar";
import type { Metadata } from "next";
import { AuthInterceptor } from "@/app/provider";
import { ThemeProvider } from "./theme-provider";
import Footer from "@/components/common/footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "pmf" });

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
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
      <body className={inter.className}>
        <AuthInterceptor>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            enableColorScheme={true}
          >
            <Suspense>
              <QueryProvider>
                <NextIntlClientProvider>
                  <TopBar />
                  {children}
                </NextIntlClientProvider>
              </QueryProvider>
            </Suspense>
          </ThemeProvider>
        </AuthInterceptor>
      </body>
    </html>
  );
}
