import { useOffers } from "@/hooks/pmf/useOffers";

export default function OffersPanel() {
    const { offers } = useOffers();

    return (
        offers.map((offer) => (
            <p>offre {offer.name}</p>
        ))
    );
};
