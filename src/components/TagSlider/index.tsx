/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";

type TagProps = {
  src: string,
  title: string
};

const tags = [
  {
    src: "/assets/icons/tags/vehicles.svg",
    title: "vehicles"
  },{
    src: "/assets/icons/tags/coffee.svg",
    title: "coffee shop"
  },{
    src: "/assets/icons/tags/restaurant.svg",
    title: "restaurants"
  },{
    src: "/assets/icons/tags/rent.svg",
    title: "property rentals"
  },{
    src: "/assets/icons/tags/sale.svg",
    title: "property for sale"
  },{
    src: "/assets/icons/tags/pet.svg",
    title: "pets supplies"
  },{
    src: "/assets/icons/tags/electronics.svg",
    title: "electronics"
  },{
    src: "/assets/icons/tags/fiat.svg",
    title: "fiat exchange"
  },{
    src: "/assets/icons/tags/toys.svg",
    title: "toys & games"
  },{
    src: "/assets/icons/tags/sports.svg",
    title: "sports goods"
  }
]

const Tag = ({src, title}: TagProps) => <div className={styles.tag}>
    <img src={src} alt="logo"/>
  <p data-text={title}>{title}</p>
</div>;

export default function TagSlider() {
  return (
    <div className={styles.tagsSlider}>
      {tags.map((tag) => <Tag key={tag.title} {...{...tag}}/>)}
    </div>
  )
}
