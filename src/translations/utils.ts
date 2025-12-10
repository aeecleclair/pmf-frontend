import { useLocale } from "next-intl";

export const useTranslation = () => {
  const locale = useLocale();

  const selectTranslation = (en?: string | null, fr?: string | null) =>
    (locale === "fr" ? fr : en) ?? fr;

  return {
    selectTranslation,
  };
};
