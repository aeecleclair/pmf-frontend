import {
  CustomDataFieldBase,
  GenerateTicketBase,
  deleteCdrSellersSellerIdProductsProductIdDataFieldId,
  deleteCdrSellersSellerIdProductsProductIdTicketsTicketGeneratorId,
  postCdrSellersSellerIdProductsProductIdData,
  postCdrSellersSellerIdProductsProductIdTickets,
} from "@/api";
import { DatePicker } from "@/components/siarnaq/custom/DatePicker";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { MultiSelect } from "@/components/siarnaq/custom/MultiSelect";
import { StyledFormField } from "@/components/siarnaq/custom/StyledFormField";
import _productFormSchema from "@/forms/siarnaq/productFormSchema";
import { useCoreUser } from "@/hooks/siarnaq/useCoreUser";
import { useMemberships } from "@/hooks/siarnaq/useMemberships";
import { useProducts } from "@/hooks/siarnaq/useProducts";
import { useSellerProductData } from "@/hooks/siarnaq/useSellerProductData";
import { useSellers } from "@/hooks/siarnaq/useSellers";

import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { HiTrash } from "react-icons/hi";
import z from "zod";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface AddEditProductFormProps {
  form: UseFormReturn<z.infer<ReturnType<typeof _productFormSchema>>>;
  isLoading: boolean;
  setIsOpened: (value: boolean) => void;
  isEdit?: boolean;
  sellerId: string;
  productId?: string;
}

export const AddEditProductForm = ({
  form,
  isLoading,
  setIsOpened,
  sellerId,
  productId,
  isEdit = false,
}: AddEditProductFormProps) => {
  const t = useTranslations("addEditProductForm");
  const format = useFormatter();
  const { toast } = useToast();
  const { products: constraint } = useProducts();
  const { sellers } = useSellers();
  const { data, refetch } = useSellerProductData(sellerId, productId ?? null);
  const [isAddingTicketLoading, setIsAddingTicketLoading] = useState(false);
  const [isDeletingTicketLoading, setIsDeletingTicketLoading] = useState(false);
  const [isAddingLoading, setIsAddingLoading] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const { memberships } = useMemberships();
  const { isAdmin } = useCoreUser();
  //const [selectedMembership, setSelectedMembership] = useState<string>();

  function closeDialog(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsOpened(false);
  }

  async function onAddTicket() {
    const name = form.getValues("ticket_name");
    const maxUse = form.getValues("ticket_max_use");
    const expiration = form.getValues("ticket_expiration");

    if (!name || !maxUse || !expiration) return;
    if (isEdit) {
      setIsAddingTicketLoading(true);
      const body: GenerateTicketBase = {
        name: name,
        max_use: parseInt(maxUse),
        expiration: expiration.toISOString(),
      };
      const { error } = await postCdrSellersSellerIdProductsProductIdTickets({
        body: body,
        path: { seller_id: sellerId, product_id: productId! },
      });
      if (error) {
        toast({
          description: error.detail,
          variant: "destructive",
        });
        setIsAddingTicketLoading(false);
        return;
      }
      setIsAddingTicketLoading(false);
    }
    form.setValue("ticket_name", "");
    form.setValue("ticket_max_use", "1");
    form.setValue("ticket_expiration", undefined);
    form.setValue("tickets", [
      ...form.getValues("tickets"),
      {
        id: form.getValues("tickets").length.toString(),
        name: name,
        max_use: parseInt(maxUse),
        expiration: expiration,
      },
    ]);
  }

  async function onDeleteTicket(id: string) {
    if (isEdit) {
      setIsDeletingTicketLoading(true);
      const { error } =
        await deleteCdrSellersSellerIdProductsProductIdTicketsTicketGeneratorId(
          {
            path: {
              seller_id: sellerId,
              product_id: productId!,
              ticket_generator_id: id,
            },
          }
        );
      if (error) {
        toast({
          description: error.detail,
          variant: "destructive",
        });
        setIsDeletingTicketLoading(false);
        return;
      }
      setIsDeletingTicketLoading(false);
    }
    form.setValue(
      "tickets",
      form.getValues("tickets").filter((field) => field.id !== id)
    );
  }

  async function onAddData() {
    const data = form.getValues("data_field_name");
    const can_user_answer = form.getValues("data_field_can_user_answer");
    if (!data) return;
    if (isEdit) {
      setIsAddingLoading(true);
      const body: CustomDataFieldBase = {
        name: data,
        can_user_answer: can_user_answer || false,
      };
      const { error } = await postCdrSellersSellerIdProductsProductIdData({
        body: body,
        path: { seller_id: sellerId, product_id: productId! },
      });
      if (error) {
        toast({
          description: error.detail,
          variant: "destructive",
        });
        setIsAddingLoading(false);
        return;
      }
      refetch();
      setIsAddingLoading(false);
    } else {
      form.setValue("data_field_name", "");
      form.setValue("data_fields", [
        ...form.getValues("data_fields"),
        {
          id: form.getValues("data_fields").length.toString(),
          name: data,
          can_user_answer: can_user_answer || false,
          product_id: "",
        },
      ]);
    }
  }

  async function onDeleteData(id: string) {
    if (isEdit) {
      setIsDeletingLoading(true);
      const { error } =
        await deleteCdrSellersSellerIdProductsProductIdDataFieldId({
          path: {
            seller_id: sellerId,
            product_id: productId!,
            field_id: id,
          },
        });
      if (error) {
        toast({
          description: error.detail,
          variant: "destructive",
        });
        setIsDeletingLoading(false);
        return;
      }
      refetch();
      setIsDeletingLoading(false);
    } else {
      form.setValue(
        "data_fields",
        form.getValues("data_fields").filter((field) => field.id !== id)
      );
    }
  }

  return (
    <div className="grid gap-6 mt-4">
      <div className="flex flex-row gap-2 w-full">
        <StyledFormField
          form={form}
          label={t("name_fr")}
          id="name_fr"
          input={(field) => <Input {...field} />}
        />
        <StyledFormField
          form={form}
          label={t("name_en")}
          id="name_en"
          input={(field) => <Input {...field} />}
        />
      </div>
      <div className="flex flex-row gap-2">
        <StyledFormField
          form={form}
          label={t("description_fr")}
          id="description_fr"
          input={(field) => <Textarea {...field} />}
        />
        <StyledFormField
          form={form}
          label={t("description_en")}
          id="description_en"
          input={(field) => <Textarea {...field} />}
        />
      </div>
      {isAdmin && (
        <div className="grid gap-2">
          <StyledFormField
            form={form}
            label={t("availability")}
            id="available_online"
            input={(field) => (
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="available_online" />
                  <Label htmlFor="available_online">
                    {t("available_online")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="onsite" />
                  <Label htmlFor="onsite">{t("onsite")}</Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>
      )}
      {isAdmin && (
        <StyledFormField
          form={form}
          label={t("related_membership")}
          id="related_membership"
          input={(field) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                {memberships.map((membership) => (
                  <SelectItem key={membership.id} value={membership.id}>
                    <div className="flex items-center flex-row gap-2">
                      {membership.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )}
      <Accordion type="multiple">
        <AccordionItem value="tickets">
          <AccordionTrigger>
            <h3 className="text-primary hover:text-primary">{t("tickets")}</h3>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
            <div className="flex flex-row gap-2">
              <StyledFormField
                form={form}
                label={t("ticket_name")}
                id="ticket_name"
                input={(field) => <Input {...field} />}
              />
              <StyledFormField
                form={form}
                label={t("ticket_max_use")}
                id="ticket_max_use"
                input={(field) => <Input {...field} type="number" />}
              />
            </div>
            <div className="flex flex-row gap-4">
              <StyledFormField
                form={form}
                label={t("ticket_expiration")}
                id="ticket_expiration"
                input={(field) => (
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    fromDate={new Date()}
                    defaultDate={field.value || new Date()}
                  />
                )}
              />
              <LoadingButton
                variant="outline"
                type="button"
                isLoading={isAddingTicketLoading}
                className="w-[100px] self-end"
                onClick={onAddTicket}
              >
                {t("add")}
              </LoadingButton>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("ticket_name")}</TableHead>
                  <TableHead>{t("ticket_max_use")}</TableHead>
                  <TableHead>{t("ticket_expiration")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {form.watch("tickets").map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.name}</TableCell>
                    <TableCell>{ticket.max_use}</TableCell>
                    <TableCell>
                      {format.dateTime(ticket.expiration, {
                        dateStyle: "medium",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <LoadingButton
                        size="icon"
                        variant="destructive"
                        className="flex ml-auto h-8"
                        isLoading={isDeletingTicketLoading}
                        onClick={() => onDeleteTicket(ticket.id)}
                      >
                        <HiTrash className="w-5 h-5" />
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="conditions">
          <AccordionTrigger>
            <h3 className="text-primary hover:text-primary">
              {t("conditions")}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
            <div className="flex flex-row gap-2 w-full">
              <StyledFormField
                form={form}
                label={t("product_constraints")}
                id="product_constraints"
                input={(field) => (
                  <MultiSelect
                    options={constraint
                      .filter(
                        (constraint) =>
                          constraint.id !== form.watch("id") &&
                          constraint.needs_validation
                      )
                      .map((constraint) => ({
                        label: t("constraintName", {
                          constraint: constraint.name_fr,
                          seller:
                            sellers.find(
                              (seller) => seller.id == constraint.seller_id
                            )?.name ?? "",
                        }),
                        value: constraint.id,
                      }))}
                    selected={field.value}
                    {...field}
                    className="w-64"
                  />
                )}
              />
              <StyledFormField
                form={form}
                label={t("document_constraints")}
                id="document_constraints"
                input={(field) => (
                  <MultiSelect
                    options={
                      []
                      //   constraint.map((constraint) => ({
                      //   label: constraint.name,
                      //   value: constraint.id,
                      // }))
                    }
                    selected={[]}
                    {...field}
                    className="w-64"
                  />
                )}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="information">
          <AccordionTrigger>
            <h3 className="text-primary hover:text-primary">
              {t("information")}
            </h3>
          </AccordionTrigger>
          <AccordionContent className="grid gap-4">
            <div className="w-full flex flex-row gap-1 p-1">
              <FormField
                control={form.control}
                name="data_field_name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder={t("question")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="data_field_can_user_answer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <span>{t("selfResponse")}</span>
                      </label>
                    </FormControl>
                  </FormItem>
                )}
              />
              <LoadingButton
                variant="outline"
                type="button"
                isLoading={isAddingLoading}
                className="w-[100px]"
                onClick={onAddData}
              >
                {t("add")}
              </LoadingButton>
            </div>
            <div className="grid gap-4 px-1">
              {(isEdit ? data : form.watch("data_fields")).map((field) => (
                <div key={field.id} className="flex flex-row items-center">
                  <span className="whitespace-nowrap">{field.name}</span>
                  <div className="flex items-center gap-2 ml-auto">
                    {field.can_user_answer && (
                      <span className="text-sm text-green-600 whitespace-nowrap font-bold">
                        {t("userCanAnswer")}
                      </span>
                    )}
                    <LoadingButton
                      size="icon"
                      variant="destructive"
                      className="h-8"
                      isLoading={isDeletingLoading}
                      onClick={() => onDeleteData(field.id)}
                    >
                      <HiTrash className="w-5 h-5" />
                    </LoadingButton>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-end mt-2 space-x-4">
        <Button
          variant="outline"
          onClick={closeDialog}
          disabled={isLoading}
          className="w-[100px]"
        >
          {t("cancel")}
        </Button>
        <LoadingButton
          isLoading={isLoading}
          className="w-[100px]"
          type="submit"
        >
          {isEdit ? t("edit") : t("add")}
        </LoadingButton>
      </div>
    </div>
  );
};
