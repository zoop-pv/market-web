import { CardType } from "@/types/Card";
import Image from "next/image";
import styles from "./styles.module.scss";

type CardProps = {
  card: CardType;
  setActiveCard: (card: CardType) => void;
};

export default function Card({ card, setActiveCard }: CardProps) {
  const { mainImageUrl, price, name, description } = card;
  return (
    <div className={styles.card} onClick={() => setActiveCard(card)}>
      <div className={styles.imageContainer}>
        <Image src={mainImageUrl} fill alt="post" />
      </div>
      <div className={styles.textSection}>
        <p className={styles.price}>{price}</p>
        <p className={styles.address}>{name}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
