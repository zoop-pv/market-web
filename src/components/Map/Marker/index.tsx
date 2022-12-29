import Image from "next/image";
import { CardType } from "@/types/Card";
import InfoWindow from "../InfoWindow";
import styles from "./styles.module.scss";

const CustomMarker = ({
  lat,
  lng,
  card,
  handleActiveMarker,
  activeMarker,
}: {
  lat: number;
  lng: number;
  card: CardType;
  activeMarker: string;
  handleActiveMarker: (markerId: string) => void;
}) => {
  const { name, rating } = card;
  return (
    <>
      <div
        className={styles.marker}
        onClick={(e) => {
          e.stopPropagation();
          handleActiveMarker(`${lat}-${lng}`);
        }}
      >
        <div className={styles.iconContainer}>
          <Image src="/assets/icons/fullMarker.svg" fill alt="marker" />
          <p className={styles.rating}>{rating}</p>
          <div className={styles.textContainer}>
            <p>{name}</p>
          </div>
        </div>
      </div>
      {activeMarker === `${lat}-${lng}` && (
        <InfoWindow card={card} handleActiveMarker={handleActiveMarker} />
      )}
    </>
  );
};

export default CustomMarker;
