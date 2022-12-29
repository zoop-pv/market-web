import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { CardType } from "@/types/Card";
import Marker from "./Marker";
import { SideList } from "./SideList";
import environments from "@/config/environments";

const Map = ({ cards }: { cards: CardType[] }) => {
  const [activeMarker, setActiveMarker] = useState<string>("");
  const [center, setCenter] = useState({ lat: 25.12457, lng: 20.12457 });
  const [activeCard, setActiveCard] = useState<CardType | null>(null);

  const handleActiveMarker = (markerID: string) => {
    if (markerID === activeMarker) {
      return;
    }
    setActiveMarker(markerID);
  };

  useEffect(() => {
    if (cards && cards[0]) {
      const center = {
        lat: cards[0].location.coordinates[0],
        lng: cards[0].location.coordinates[1],
      };
      setCenter(center);
    }
  }, [cards]);

  return (
    <>
      <SideList {...{ activeCard, setActiveCard, cards }} />
      <GoogleMapReact
        bootstrapURLKeys={{
          key: environments.mapApiKey,
        }}
        defaultCenter={center}
        defaultZoom={7}
        onClick={() => setActiveMarker("")}
      >
        {cards?.map((card) => (
          <Marker
            key={card.address}
            card={card}
            lat={card.location.coordinates[0]}
            lng={card.location.coordinates[1]}
            activeMarker={activeMarker}
            handleActiveMarker={handleActiveMarker}
          />
        ))}
      </GoogleMapReact>
    </>
  );
};

export default Map;
