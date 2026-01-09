import { CoreUser, OfferBase } from "@/api";
import { postPmfOfferMutation } from "@/api/@tanstack/react-query.gen";
import { LoadingButton } from "@/components/custom/LoadingButton";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import _offerFormSchema from "@/forms/pmf/offerFormSchema";
import { useOffers } from "@/hooks/pmf/useOffers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const AddOfferButton = () => {
    const t = useTranslations("pmf");
    const offerFormSchema = _offerFormSchema()
    const { refetch: refetchOffers } = useOffers();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof offerFormSchema>>({
        resolver: zodResolver(offerFormSchema),
        mode: "onBlur",
        defaultValues: {},
    })
    async function onSubmit(values: z.infer<typeof offerFormSchema>) {
        setIsLoading(true);
        const body: OfferBase = {
            ...values,
        };
        const { error } = await postPmfOfferMutation({
            body: body
        });
        if (error) {
            toast({
                description: t("addOfferButton.toastErrorDescription"),
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }
        refetchOffers();
        setIsLoading(false);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder={t("addOfferButton.offerTitle")}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder={t("addOfferButton.offerCompanyName")}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder={t("addOfferButton.offerDescription")}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    placeholder={t("addOfferButton.offerLocation")}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <LoadingButton
                    variant="outline"
                    type="submit"
                    isLoading={isLoading}
                    className="w-[100px]"
                >
                    {t("addOfferButton.add")}
                </LoadingButton>
            </form>
        </Form>
    )
};
