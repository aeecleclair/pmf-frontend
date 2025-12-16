import { AddCurriculumButton } from "./AddCurriculumButton";
import { CurriculumItem } from "./CurriculumItem";

import { useCurriculums } from "@/hooks/siarnaq/useCurriculums";

import { useTranslations } from "next-intl";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const CurriculumAccordionItem = () => {
  const t = useTranslations("siarnaq");
  const { curriculums } = useCurriculums();

  return (
    <AccordionItem value="curriculum">
      <AccordionTrigger>
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold">
            {t("curriculumAccordionItem.curriculum")}
          </h3>
        </div>
      </AccordionTrigger>
      <AccordionContent className="space-y-2">
        <AddCurriculumButton />
        {curriculums.map((curriculum) => (
          <CurriculumItem key={curriculum.id} curriculum={curriculum} />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
