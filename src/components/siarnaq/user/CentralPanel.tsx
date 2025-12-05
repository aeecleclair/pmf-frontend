import { InfoPanel } from "./InfoPanel";
import { IntroPanel } from "./IntroPanel";
import { ProductPanel } from "./ProductPanel";
import { RecapPanel } from "./RecapPanel";

import { useSearchParams } from "next/navigation";

interface CentralPanelProps {
  showSellerFeatureFlag?: boolean;
}

export const CentralPanel = ({ showSellerFeatureFlag }: CentralPanelProps) => {
  const searchParams = useSearchParams();
  const firstSellerId = searchParams.get("sellerId") || "intro";

  if (firstSellerId === "intro") {
    return <IntroPanel />;
  }
  if (firstSellerId === "info") {
    return <InfoPanel />;
  }
  if (firstSellerId === "recap") {
    return <RecapPanel />;
  }
  return showSellerFeatureFlag && <ProductPanel />;
};
