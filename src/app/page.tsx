import { useTranslations } from "next-intl";

export default function Home() {
  const year = new Date().getFullYear(); 
  const t = useTranslations("page");

  return(
    <>
      <div>
        <p>pmfffffffffffffffffff</p>
      </div>
    </>
  ); 
}