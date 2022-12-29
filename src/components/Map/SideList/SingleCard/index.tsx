import Image from "next/image";
import { CardType } from "@/types/Card";
import styles from "./styles.module.scss";

const SingleCard = ({
  activeCard,
  setActiveCard,
}: {
  activeCard: CardType;
  setActiveCard: (card: null) => void;
}) => {
  const { name, address, openHours } = activeCard;

  return (
    <div className={styles.singleCard}>
      <div className={styles.imageContainer}>
        <Image
          onClick={() => setActiveCard(null)}
          src="/assets/icons/sideCardBack.svg"
          width={28}
          height={28}
          alt="back"
          className={styles.backBtn}
        />
        <Image src="/assets/images/sideCard.jpg" fill alt="card" />
      </div>
      <div className={styles.textSection}>
        <div className={styles.addressCon}>
          <div>
            <h4>{name}</h4>
            <div>
              <Image
                src="/assets/icons/ssMapIcon.svg"
                width={12}
                height={14}
                alt="location"
                className={styles.ssMapIcon}
              />
              <p>{address}</p>
            </div>
          </div>
          <Image
            src="/assets/icons/singleSideLocation.svg"
            width={104}
            height={30}
            alt="location"
            className={styles.ssLo}
          />
        </div>
        <div className={styles.stars}>
          <Image
            src="/assets/icons/stars.svg"
            width={140}
            height={18}
            alt="stars"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            mollis eros.
          </p>
        </div>
        <div className={styles.specs}>
          <div>
            <h4>Open Hour</h4>
            <p>{openHours}</p>
          </div>
          <div>
            <h4>Cuisines</h4>
            <p>Western, Asian</p>
          </div>
        </div>
        <div className={styles.description}>
          <h4>Description</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in
            mollis eros. Cras at malesuada lectus. Fusce ac massa nec nunc
            consectetur convallis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
