import { useRouter } from "next/navigation";
import { useWebsite } from "./useWebsite";

export function useCustomRouter() {
  const router = useRouter();
  const website = useWebsite();

  const push = (url: string) => {
    router.push(`/${website.websiteWithLocale}/${url}`);
  };

  return {
    push,
  };
}
