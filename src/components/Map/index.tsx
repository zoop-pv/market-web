import { useState } from "react";
import GoogleMapReact from "google-map-react";
import { CardType } from "@/types/Card";
import Marker from "./Marker";
import { SideList } from "./SideList";

const Map = ({ cards }: { cards: CardType[] }) => {
  const [activeMarker, setActiveMarker] = useState<string>("");
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const center = { lat: 26.8206, lng: 30.8025 };

  const handleActiveMarker = (markerID: string) => {
    if (markerID === activeMarker) {
      return;
    }
    setActiveMarker(markerID);
  };

  return (
    <>
      <SideList {...{ activeCard, setActiveCard, cards }} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: "API_KEY_HERE" }}
        defaultCenter={center}
        defaultZoom={7}
        onClick={() => setActiveMarker("")}
      >
        {cards.map((card) => (
          <Marker
            key={card.address}
            card={card}
            lat={card.lat}
            lng={card.lng}
            activeMarker={activeMarker}
            handleActiveMarker={handleActiveMarker}
          />
        ))}
      </GoogleMapReact>
    </>
  );
};

export default Map;
