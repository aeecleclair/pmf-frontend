import { useOffers } from "@/hooks/useOffers";

export default function OffersPanel() {
    const { offers } = useOffers();

    return (
        offers.map((offer) => (
            <p>offre {offer.name}</p>
        ))
    );
};