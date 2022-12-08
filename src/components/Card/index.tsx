import Image from "next/image"
import styles from "./styles.module.scss";

 
type CardProps = {
  url: string,
  price: number,
  address: string,
  description: string
}

export default function Card({url, price, address, description}: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={url} fill alt="post"/>
      </div>
      <div className={styles.textSection}>
        <p className={styles.price}>{price}</p>
        <p className={styles.address}>{address}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}
