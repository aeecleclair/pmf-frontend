import { CoreUser } from "@/api";
import { postPmfOfferMutation } from "@/api/@tanstack/react-query.gen";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Messages } from "next-intl";

export const createOffer = async (
    userid: CoreUser["id"],
    toast: ReturnType<typeof useToast>["toast"],
    setIsLoading: (loading: boolean) => void,
    t: (arg: keyof Messages["createOffer"]) => string
) => {
    try {
        setIsLoading(true);
        await postPmfOfferMutation({
            body: body
        });
    } catch {
        toast({
            description: t("toastErrorDescription"),
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
};
