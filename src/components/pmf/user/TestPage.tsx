import { useTranslations } from "next-intl";


export default function TestPage() {
    const t = useTranslations("TestPage");
    return <div>{t("Sample")}</div>;
}