import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import TagSlider from "@/components/TagSlider";
import { Grid } from "@mui/material";
import styles from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { useRouter } from "next/router";
import Map from "@/components/Map";

const cards = [
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si1",
    description: "Special occasions, Romantic, Scenic view...",
    lat: 26.8206,
    lng: 30.8025,
    distance: "3.0",
  },
  {
    url: "/assets/images/cards/2.svg",
    price: 300,
    address: "claro si2",
    description: "Special occasions, Romantic, Scenic view...",
    lat: 27.32,
    lng: 29.99,
    distance: "5.8",
  },
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si3",
    description: "Special occasions, Romantic, Scenic view...",
    lat: 27.81,
    lng: 30.49,
    distance: "2.3",
  },
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si4",
    description: "Special occasions, Romantic, Scenic view...",
    lat: 26.8001,
    lng: 31.8099,
    distance: "6.0",
  },
  {
    url: "/assets/images/cards/2.svg",
    price: 300,
    address: "claro si5",
    description: "Special occasions, Romantic, Scenic view...",
    lat: 26.33,
    lng: 30,
    distance: "3.7",
  },
  {
    url: "/assets/images/cards/1.svg",
    price: 300,
    address: "claro si6",
    description: "Special occasions, Romantic, Scenic view...",
    lat: 27.2,
    lng: 30.81,
    distance: "3.4",
  },
];

enum Views {
  LIST_VIEW = "list-view",
  MAP_VIEW = "map-view",
}

export default function Home() {
  const [view, setIsViewList] = useState(Views.LIST_VIEW);
  const router = useRouter();

  const toggleViewType = (view: Views) => {
    setIsViewList(view);
    router.push(`?view=${view}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const { view } = router.query;
    if (view) {
      setIsViewList(view as Views);
    }
  }, [view, router]);

  const ViewMap = {
    [Views.LIST_VIEW]: (
      <Grid container spacing={2} className={styles.cardsContainer}>
        <Grid item xs={12} className={styles.header}>
          <h3>Latest Posts</h3>
          <div className={styles.location}>
            <Image
              src="/assets/icons/marker.svg"
              width={12}
              height={15}
              alt="marker"
            />
            <p>Cista Rica</p>
            <p>5 Km</p>
          </div>
        </Grid>
        {cards.map((card) => (
          <Grid item key={card.address} xs={6} md={3} lg={3}>
            {" "}
            <Card mainImageUrl={""} name={""} {...{ ...card }} />{" "}
          </Grid>
        ))}
        <Grid item xs={12} className={styles.paginationContainer}>
          <Pagination count={10} size="small" color="primary" />
        </Grid>
      </Grid>
    ),
    [Views.MAP_VIEW]: (
      <div className="map-container">
        <Map cards={cards} />
      </div>
    ),
  };

  const ButtonViewMap = {
    [Views.LIST_VIEW]: (
      <button
        onClick={() => toggleViewType(Views.MAP_VIEW)}
        className={styles.toggleViewBtn}
      >
        <span>View Map</span>
        <Image src="/assets/icons/map.svg" width={14} height={14} alt="map" />
      </button>
    ),
    [Views.MAP_VIEW]: (
      <button
        onClick={() => toggleViewType(Views.LIST_VIEW)}
        className={`${styles.toggleViewBtn} ${styles.mapToggleViewBtn}`}
      >
        <span>View List</span>
        <Image src="/assets/icons/list.svg" width={14} height={8} alt="list" />
      </button>
    ),
  };

  return (
    <div className={styles.home}>
      <Header />
      <TagSlider />
      <div className="container">
        {ViewMap[view]}
        {ButtonViewMap[view]}
      </div>
    </div>
  );
}
