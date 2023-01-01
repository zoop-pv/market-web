import Image from "next/image";
import { CardType } from "@/types/Card";
import Rating from "@mui/material/Rating";
import styles from "./styles.module.scss";

const InfoWindow = ({
  card,
  handleActiveMarker,
}: {
  card: CardType;
  handleActiveMarker: (markerId: string) => void;
}) => {
  const { distance, name, location, rating } = card;

  return (
    <div className={styles.infoWindow} onClick={(e) => e.stopPropagation()}>
      <Image
        src="/assets/icons/close.svg"
        width={16}
        height={16}
        alt="close"
        className={styles.closeIcon}
        onClick={() => handleActiveMarker("")}
      />
      <div className={styles.imageContainer}>
        <Image src="/assets/icons/infoWindowImg.svg" fill alt="card" />
      </div>
      <div className={styles.infoContainer}>
        <h4>{name}</h4>
        <div className={styles.address}>
          <Image
            src="/assets/icons/addressArrow.svg"
            width={10}
            height={10}
            alt="distance"
          />
          <span>{distance}</span>
        </div>
        {rating && (
          <div className={styles.rating}>
            <Rating
              size="small"
              name="read-only"
              precision={0.5}
              value={rating}
              readOnly
            />
          </div>
        )}
        <div className={styles.content}>
          <p>Burgers - Italian - Hot vine - Grilled - Canadian</p>
        </div>
        <div className={styles.cta}>
          <button>
            <a
              href={`https://maps.google.com/?q=${location.coordinates[0]},${location.coordinates[1]}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/assets/icons/send.svg"
                width={11}
                height={14}
                alt="direction"
              />
              <span>Direction</span>
            </a>
          </button>
          <button>
            <Image
              src="/assets/icons/shape.svg"
              width={8}
              height={12}
              alt="save"
            />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default InfoWindow;
