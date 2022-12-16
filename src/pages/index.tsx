import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Card from "@/components/Card";
import Header from "@/components/Header";
import TagSlider from "@/components/TagSlider";
import { Grid } from "@mui/material";
import styles from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import { useRouter } from "next/router";

type Card = {
  url: string;
  price: number;
  address: string;
  description: string;
  lat: number;
  lng: number;
  distance: string;
};

const SingleSideCard = ({
  activeCard,
  setActiveCard,
}: {
  activeCard: Card;
  setActiveCard: (card: null) => void;
}) => {
  const { lat, lng, distance, address } = activeCard;

  return (
    <div className={styles.singlesideCard}>
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
            <h4>{address}</h4>
            <div>
              <Image
                src="/assets/icons/ssMapIcon.svg"
                width={12}
                height={14}
                alt="location"
                className={styles.ssMapIcon}
              />
              <p>Shop A, 2388 Glendale BlvdLos Angeles, CA 90039</p>
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
            <p>10:00 - 23:00</p>
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

const SideCard = ({
  card,
  setActiveCard,
}: {
  card: Card;
  setActiveCard: (card: Card) => void;
}) => {
  const { distance, address } = card;

  return (
    <div className={styles.sideCard} onClick={() => setActiveCard(card)}>
      <div className={styles.imageContainer}>
        <Image src="/assets/icons/infoWindowImg.svg" fill alt="card" />
      </div>
      <div className={styles.infoContainer}>
        <h4>{address}</h4>
        <div className={styles.address}>
          <Image
            src="/assets/icons/addressArrow.svg"
            width={10}
            height={10}
            alt="distance"
          />
          <span>{distance}</span>
        </div>
        <div className={styles.review}></div>
        <div className={styles.content}>
          <p>Burgers - Italian - Hot vine - Grilled - Canadian</p>
        </div>
        <div className={styles.cta}>
          <button>
            <Image
              src="/assets/icons/send.svg"
              width={11}
              height={14}
              alt="direction"
            />
            <span>Direction</span>
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

const InfoWindow = ({
  card,
  handleActiveMarker,
}: {
  card: Card;
  handleActiveMarker: (markerId: string) => void;
}) => {
  const { distance, address } = card;

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
        <h4>{address}</h4>
        <div className={styles.address}>
          <Image
            src="/assets/icons/addressArrow.svg"
            width={10}
            height={10}
            alt="distance"
          />
          <span>{distance}</span>
        </div>
        <div className={styles.review}></div>
        <div className={styles.content}>
          <p>Burgers - Italian - Hot vine - Grilled - Canadian</p>
        </div>
        <div className={styles.cta}>
          <button>
            <Image
              src="/assets/icons/send.svg"
              width={11}
              height={14}
              alt="direction"
            />
            <span>Direction</span>
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

const CustomMarker = ({
  lat,
  lng,
  card,
  handleActiveMarker,
  activeMarker,
}: {
  lat: number;
  lng: number;
  card: Card;
  activeMarker: string;
  handleActiveMarker: (markerId: string) => void;
}) => {
  const { distance, address } = card;
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
          <p className={styles.distance}>{distance}</p>
          <div className={styles.textContainer}>
            <p>{address}</p>
          </div>
        </div>
      </div>
      {activeMarker === `${lat}-${lng}` && (
        <InfoWindow card={card} handleActiveMarker={handleActiveMarker} />
      )}
    </>
  );
};
const center = { lat: 26.8206, lng: 30.8025 };

function Map({ cards }: { cards: Card[] }) {
  const [activeMarker, setActiveMarker] = useState<string>("");
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const handleActiveMarker = (markerID: string) => {
    if (markerID === activeMarker) {
      return;
    }
    setActiveMarker(markerID);
  };

  return (
    <>
      <div
        className={`${styles.sideList} ${activeCard && styles.noBorderPadding}`}
      >
        {activeCard ? (
          <SingleSideCard {...{ activeCard, setActiveCard }} />
        ) : (
          <>
            <div className={styles.header}>
              <h4>Latest Posts</h4>
              <div className={styles.location}></div>
            </div>
            <div className={styles.sideCardsContainer}>
              {cards.map((card) => (
                <SideCard key={card.address} {...{ card, setActiveCard }} />
              ))}
            </div>
          </>
        )}
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "API_KEY_HERE" }}
        defaultCenter={center}
        defaultZoom={7}
        onClick={() => setActiveMarker("")}
      >
        {cards.map((card) => (
          <CustomMarker
            key={card.address}
            card={card}
            lat={card.lat}
            lng={card.lng}
            activeMarker={activeMarker}
            handleActiveMarker={handleActiveMarker}
          />
        ))}
      </GoogleMapReact>
    </>
  );
}

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
        {cards.map((card) => (
          <Grid item key={card.address} xs={6} md={3} lg={3}>
            {" "}
            <Card {...{ ...card }} />{" "}
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
        className={styles.toggleViewBtn}
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
