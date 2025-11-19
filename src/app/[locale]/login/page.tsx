"use client";

import MyECLButton from "@/components/login/MyEclButton";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export default function Login(){
    const t = useTranslations("login");
    const router = useRouter();
    return (
        <div>
            {t("title")}
            <MyECLButton />
        </div>
    );
};
