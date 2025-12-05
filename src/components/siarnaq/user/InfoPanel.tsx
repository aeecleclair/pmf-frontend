import { PageIndicator } from "../custom/PageIndicator";

import { useOnlineSellers } from "@/hooks/siarnaq/useOnlineSellers";
import { useYear } from "@/hooks/siarnaq/useYear";
import { Link } from "@/i18n/navigation";

import { useTranslations } from "next-intl";
import {
  HiOutlineBanknotes,
  HiOutlineCalendar,
  HiOutlineDevicePhoneMobile,
  HiOutlineEnvelope,
  HiOutlineLink,
  HiOutlineNewspaper,
} from "react-icons/hi2";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";

export const InfoPanel = () => {
  const t = useTranslations("info");
  const { onlineSellers } = useOnlineSellers();
  const { year } = useYear();
  const yearString = year.toString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("information")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineCalendar className="h-4 w-4 mr-2" />
          {t("cdrOnsiteTitle")}
        </h3>
        <div>
          {t.rich("cdrOnsiteSubtitle", {
            mandatory: (c: string) => <span className="font-bold">{c}</span>,
          })}
        </div>
        <div>{t("cdrOnsiteDescription")}</div>
        <div className="font-bold">{t("cdrOnsiteMandatoryWarning")}</div>

        <div className="pl-10">
          <a
            href="mailto://bde@ec-lyon.fr"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineEnvelope className="h-4 w-4 mr-2" />
            bde@ec-lyon.fr
          </a>
        </div>

        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineBanknotes className="h-4 w-4 mr-2" />
          {t("cautionTitle")}
        </h3>
        <div>
          {t.rich("cautionDescription", {
            payable: (c: string) => <span className="italic">{c}</span>,
          })}
        </div>
        <div>{t("cautionInstructions", { year: yearString })}</div>
        <div>
          {t.rich("cautionInstructions2", {
            link: () => (
              <Link
                href="https://v2.swik.link/1XxsMUZ"
                target="_blank"
                className="font-bold text-sky-600 underline visited:text-purple-600"
              >
                https://v2.swik.link/1XxsMUZ
              </Link>
            ),
          })}
        </div>
        <div>
          {t.rich("cautionMandatory", {
            mandatory: (c: string) => <span className="font-bold">{c}</span>,
          })}
        </div>

        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineNewspaper className="h-4 w-4 mr-2" />
          {t("facebookTitle")}
        </h3>
        <div>{t("facebook", { year: yearString })}</div>
        <div className="pl-10">
          {/* TODO: provide a clean link like https://www.facebook.com/groups/admis2024 */}
          <a
            href="https://www.facebook.com/share/g/1FQ72yPVjk"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineLink className="h-4 w-4 mr-2" />
            {t("group", { year: yearString })}
          </a>
        </div>
        {/* */}
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineDevicePhoneMobile className="h-4 w-4 mr-2" />
          {t("myECLTitle")}
        </h3>
        <div>{t("myECL")}</div>
        <div className="pl-10">
          <a
            href="https://apps.apple.com/fr/app/myecl/id6444443430"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineLink className="h-4 w-4 mr-2" />
            {t("downloadMyECLiOS")}
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=fr.myecl.titan"
            className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
          >
            <HiOutlineLink className="h-4 w-4 mr-2" />
            {t("downloadMyECLAndroid")}
          </a>
        </div>
        {/* */}
        {/* I'm so sorry Jho...
        <h3 className="text-lg font-semibold flex flex-row items-center pt-5">
          <HiOutlineUserGroup className="h-4 w-4 mr-2" />
          {t("elementTitle")}
        </h3>
        <div>{t("element")}</div>
        <div className="pl-10">
          <ol className="list-decimal">
            <li>
              <a
                href="https://element.io/download"
                className="font-medium hover:underline underline-offset-4 flex flex-row items-center"
              >
                <HiOutlineLink className="h-4 w-4 mr-1" />
                {t("elementStep1")}
              </a>
            </li>
            <li>{t("elementStep2")}</li>
            <li>
              {t("elementStep3")} <code>myecl.fr</code>
            </li>
            <li>{t("elementStep4")}</li>
          </ol>
        </div>
        */}
      </CardContent>

      <CardFooter className="px-6 py-4">
        <PageIndicator currentSellerId="info" onlineSellers={onlineSellers} />
      </CardFooter>
    </Card>
  );
};
