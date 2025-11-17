import { useTranslations } from "next-intl";

export default function Home() {
  const year = new Date().getFullYear(); 
  const t = useTranslations("page");

  return(
    <>
      <div>
        <p>pmfffffffffffffffffff</p>
      </div>
      <footer className="py-6 md:px-8 md:py-0 border-t-2">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <p className="text-balance text-sm leading-loose text-muted-foreground">
              {t("madeByECLAIR")}
            </p>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
              {t.rich("license", {
                date: () => year,
                eclair: (c) => (
                  <a
                    href="https://www.eclair.ec-lyon.fr/"
                    className="font-medium underline underline-offset-4"
                  >
                    {c}
                  </a>
                ),
              })}
            </span>
          </div>
        </div>
      </footer>
    </>
  ); 
}