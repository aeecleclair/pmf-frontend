import { useOffers } from "@/hooks/pmf/useOffers";

interface Offer {
  author_id: string;
  company_name: string;
  title: string;
  description: string;
  offer_type: string;
  location: string;
  location_type: string;
  start_date: string;
  end_date: string;
  duration: number;
  id: string;
}

export default function OffersPanel() {
  //   const { offers } = useOffers();

  return ({
    offers.map((offer: Offer) => (
      <p>offre {offer.title}</p>
    ))
  });
};
