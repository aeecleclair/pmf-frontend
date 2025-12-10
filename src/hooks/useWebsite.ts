import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export const useWebsite = () => {
  const pathname = usePathname();
  const website = pathname.split("/")[1];
  const locale = useLocale();
  return { website: website, websiteWithLocale: `${website}/${locale}` };
};
