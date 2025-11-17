import { routing } from "./routing";

import { Formats, hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

export const formats = {
  number: {
    euro: {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    },
  },
} satisfies Formats;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../translations/${locale}.json`)).default,
    formats,
  };
});
