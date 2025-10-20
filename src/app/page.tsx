"use client";

import { Suspense, useEffect } from "react";
import { permanentRedirect } from "next/navigation";
import { useLocaleStore } from "@/stores/locale";

export default function Home() {
  return (
    <Suspense>
      <html>
        <body>
          <RedirectPageInternal />
        </body>
      </html>
    </Suspense>
  );
}

function RedirectPageInternal() {
  const { localeStore, setLocaleStore } = useLocaleStore();

  useEffect(() => {
    const navigatorLocale = navigator.language.startsWith("fr") ? "fr" : "en";
    if (!localeStore) setLocaleStore(navigatorLocale);
    permanentRedirect(`/${localeStore ?? navigatorLocale}`);
  });

  return <></>;
}