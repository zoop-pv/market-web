import Card from "@/components/Card";
import Header from "@/components/Header";
import TagSlider from "@/components/TagSlider";
import { Grid } from "@mui/material";
import styles from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";

const cards = [
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si",
    description: "Special occasions, Romantic, Scenic view...",
  },
  {
    url: "/assets/images/cards/2.svg",
    price: 300,
    address: "claro si",
    description: "Special occasions, Romantic, Scenic view...",
  },
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si",
    description: "Special occasions, Romantic, Scenic view...",
  },
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si",
    description: "Special occasions, Romantic, Scenic view...",
  },
  {
    url: "/assets/images/cards/2.svg",
    price: 300,
    address: "claro si",
    description: "Special occasions, Romantic, Scenic view...",
  },
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si",
    description: "Special occasions, Romantic, Scenic view...",
  },
];
export default function Home() {
  return (
    <>
      <Header />
      <TagSlider />
      <div className="container">
        <Grid container spacing={2} className={styles.cardsContainer}>
          {cards.map((card) => (
            <Grid item key={card.address} xs={6} md={3} lg={3}>
              {" "}
              <Card {...{ ...card }} />{" "}
            </Grid>
          ))}
        </Grid>
        <div className={styles.paginationContainer}>
          <Pagination count={10} size="small" color="primary" />
        </div>
        <button className={styles.viewMapBtn}>
          <span>View Map</span>
          <Image src="/assets/icons/map.svg" width={14} height={14} alt="map" />
        </button>
      </div>
    </>
  );
}
