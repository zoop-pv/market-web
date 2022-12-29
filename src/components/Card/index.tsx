import Image from "next/image"
import styles from "./styles.module.scss";

type CardProps = {
  mainImageUrl: string,
  price: number,
  name: string,
  description: string
}

export default function Card({mainImageUrl, price, name, description}: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={mainImageUrl} fill alt="post"/>
      </div>
      <div className={styles.textSection}>
        <p className={styles.price}>{price}</p>
        <p className={styles.address}>{name}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
