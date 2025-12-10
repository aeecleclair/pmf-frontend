import { LoadingButton } from "@/components/custom/LoadingButton";
import { StyledFormField } from "@/components/siarnaq/custom/StyledFormField";
import _migrateUserFormSchema from "@/forms/siarnaq/migrateUserFormSchema";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MigrateUserFormProps {
  form: UseFormReturn<z.infer<ReturnType<typeof _migrateUserFormSchema>>>;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
  closeDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const possibleFloors = [
  "Autre",
  "Adoma",
  "Exte",
  "T1",
  "T2",
  "T3",
  "T4",
  "T56",
  "U1",
  "U2",
  "U3",
  "U4",
  "U56",
  "V1",
  "V2",
  "V3",
  "V45",
  "V6",
  "X1",
  "X2",
  "X3",
  "X4",
  "X5",
  "X6",
] as const;

export const MigrateUserForm = ({
  form,
  isLoading,
  closeDialog,
}: MigrateUserFormProps) => {
  /*
  const { year } = useYear();
  const possiblePromos = Array.from({ length: 5 }).map((_, index) => {
    return (year - index).toString();
  });
  */
  const t = useTranslations("siarnaq");

  return (
    <div className="grid gap-6 mt-4">
      <StyledFormField
        form={form}
        label={t("migrateUserForm.nickname")}
        id="nickname"
        input={(field) => <Input {...field} />}
      />
      <StyledFormField
        form={form}
        label={t("migrateUserForm.eclEmail")}
        id="email"
        input={(field) => <Input {...field} type="email" />}
      />
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label={t("migrateUserForm.floor")}
          id="floor"
          input={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {possibleFloors.map((floor) => (
                  <SelectItem key={floor} value={floor}>
                    <div className="flex items-center flex-row gap-2">
                      {floor}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {/* <StyledFormField
          form={form}
          label="Promo"
          id="promo"
          input={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {possiblePromos.map((promo) => (
                  <SelectItem key={promo} value={promo}>
                    <div className="flex items-center flex-row gap-2">
                      Promotion {promo}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        /> */}
      </div>
      {/* <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label="Date de naissance"
          id="birthday"
          input={(field) => (
            <DatePicker
              date={field.value}
              setDate={field.onChange}
              defaultDate={field.value || addYears(new Date(), -21)}
            />
          )}
        />

        <StyledFormField
          form={form}
          label="Numéro de téléphone"
          id="phone"
          input={(field) => <PhoneCustomInput {...field} />}
        />
      </div> */}

      <div className="flex justify-end mt-2 space-x-4">
        <Button
          variant="outline"
          onClick={closeDialog}
          disabled={isLoading}
          className="w-[100px]"
        >
          {t("migrateUserForm.cancel")}
        </Button>
        <LoadingButton
          isLoading={isLoading}
          className="w-[100px]"
          type="submit"
        >
          {t("migrateUserForm.edit")}
        </LoadingButton>
      </div>
    </div>
  );
};
