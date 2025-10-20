import { routing } from "@/i18n/routing";

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return <html>{children}</html>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}