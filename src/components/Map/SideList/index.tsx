import { CardType } from "@/types/Card";
import styles from "./styles.module.scss";
import ListCard from "./ListCard";
import SingleCard from "./SingleCard";
import Slider from "react-slick";

const settings = {
  infinite: true,
  speed: 500,
  arrows: false,
  draggable: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  dots: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        className: "center",
        centerMode: true,
        slidesToShow: 1,
        centerPadding: "130px",
      },
    },
    {
      breakpoint: 680,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        centerPadding: "80px",
      },
    },
    {
      breakpoint: 576,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 490,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        centerPadding: "23px",
      },
    },
    {
      breakpoint: 400,
      settings: {
        centerMode: true,
        slidesToShow: 1,
        centerPadding: "0",
      },
    },
  ],
};

export const SideList = ({
  activeCard,
  setActiveCard,
  cards,
  sideListTopMargin,
}: {
  activeCard: CardType | null;
  setActiveCard: (card: CardType | null) => void;
  cards: CardType[];
  sideListTopMargin: number;
}) => {
  return (
    <>
      <div
        className={`${styles.sideList} ${activeCard && styles.noBorderPadding}`}
        style={{ top: `${sideListTopMargin}px` }}
      >
        {activeCard ? (
          <SingleCard {...{ activeCard, setActiveCard }} />
        ) : (
          <>
            <div className={styles.header}>
              <h4>Latest Posts</h4>
              <div className={styles.location}></div>
            </div>
            <div className={styles.sideCardsContainer}>
              {cards?.map((card, i) => (
                <ListCard
                  key={`${card.address}-${i}`}
                  {...{ card, setActiveCard }}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {activeCard ? (
        <div
          className={`${styles.sideList} ${
            activeCard && styles.noBorderPadding
          } ${styles.mobileSingleCard}`}
          style={{ top: `${sideListTopMargin}px` }}
        >
          <SingleCard {...{ activeCard, setActiveCard }} />
        </div>
      ) : (
        <div className={`bottomSliderList ${styles.bottomSliderList}`}>
          <Slider {...settings}>
            {cards?.map((card, i) => (
              <ListCard
                key={`${card.address}-${i}`}
                {...{ card, setActiveCard }}
              />
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
