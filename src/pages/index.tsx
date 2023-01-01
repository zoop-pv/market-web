import { useEffect, useRef, useState } from "react";
import Card from "@/components/Card";
import NavHeader from "@/components/Header";
import TagSlider from "@/components/TagSlider";
import { Grid, Pagination } from "@mui/material";
import styles from "./styles.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import Map from "@/components/Map";
import useSWR from "swr";
import { getMarketplacePosts } from "@/services/posts.service";
import { CardType } from "@/types/Card";
import Header from "next/head";
import Modal from "@mui/material/Modal";
import ModalCard from "@/components/ModalCard";

enum Views {
  LIST_VIEW = "list-view",
  MAP_VIEW = "map-view",
}

type FilterState = {
  page: number;
  searchText: string;
  selectedTags: string[];
};

export default function Home() {
  const navRef = useRef(null);
  const tagsSliderRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [tagsSliderHeight, setTagsSliderHeight] = useState(0);
  useEffect(() => {
    if (navRef.current != null) {
      setNavHeight((navRef.current as HTMLElement).clientHeight);
    }
    if (tagsSliderRef.current != null) {
      setTagsSliderHeight((tagsSliderRef.current as HTMLElement).clientHeight);
    }
  }, []);
  const [view, setIsViewList] = useState(Views.LIST_VIEW);
  const [filterState, setFilterState] = useState<FilterState>({
    page: 1,
    searchText: "",
    selectedTags: [],
  });
  const [isNoData, setIsNoData] = useState(false);
  const router = useRouter();

  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const handleClose = () => setActiveCard(null);

  const { data, mutate, isValidating } = useSWR(
    "posts",
    getMarketplacePosts({
      page: filterState.page,
      limit: 10,
      text: filterState.searchText,
      tagsSlugs: filterState.selectedTags,
    })
  );

  useEffect(() => {
    mutate();
  }, [filterState]);

  useEffect(() => {
    setIsNoData(data?.data?.length === 0);
  }, [data]);

  const toggleViewType = (view: Views) => {
    let query = "";
    Object.keys(router.query).map((key) => {
      if (key !== "view") {
        query += `${key}=${router.query[key]}&`;
      }
    });
    router.push(`?${query}view=${view}`, undefined, { shallow: true });
  };

  useEffect(() => {
    const { view, page, text } = router.query;
    let filterState: FilterState = {
      page: 1,
      searchText: "",
      selectedTags: [],
    };
    if (view) {
      setIsViewList(view as Views);
    }
    if (text) {
      filterState.searchText = text as string;
    }
    if (router.query["tagsSlugs[]"]) {
      let tagsSlugs = [];
      if (Array.isArray(router.query["tagsSlugs[]"])) {
        tagsSlugs = router.query["tagsSlugs[]"];
      } else {
        tagsSlugs = [router.query["tagsSlugs[]"]];
      }
      filterState.selectedTags = tagsSlugs;
    }
    if (page) {
      filterState.page = Number(page);
    }
    setFilterState(filterState);
  }, [router]);

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setFilterState((filterState) => ({ ...filterState, page: value }));
    router.query.page = `${value}`;
    router.push(router);
  };

  const ViewMap = {
    [Views.LIST_VIEW]: (
      <Grid container spacing={2} className={styles.cardsContainer}>
        <Grid item xs={12} className={styles.header}>
          <h3>Latest Posts</h3>
          {/* <div className={styles.location}>
            <Image
              src="/assets/icons/marker.svg"
              width={12}
              height={15}
              alt="marker"
            />
            <p>Cista Rica</p>
            <p>5 Km</p>
          </div> */}
        </Grid>
        <Modal open={Boolean(activeCard)} onClose={handleClose}>
          <>
            <ModalCard
              activeCard={activeCard as CardType}
              setActiveCard={setActiveCard}
            />
          </>
        </Modal>
        {data?.data?.map((card: CardType, i: number) => (
          <Grid
            item
            key={`${card.address}-${i}`}
            xs={6}
            sm={4}
            md={3}
            className={styles.cardContainer}
          >
            <Card {...{ card, setActiveCard }} />
          </Grid>
        ))}
        {isNoData ? (
          <div className={styles.noData}>
            <div className={styles.imgCon}>
              <Image src="/assets/images/noDataCard.svg" fill alt="no data" />
            </div>
            <p className={styles.noRes}>No Result Found!</p>
            <p className={styles.couldNotFind}>
              We couldn’t find the result you’re looking for? Be sure to check
              your spelling.
            </p>
          </div>
        ) : (
          <Grid item xs={12} className={styles.paginationContainer}>
            <Pagination
              onChange={handlePaginationChange}
              page={filterState.page}
              count={data?.pagination?.numberOfPages}
              size="small"
              color="primary"
            />
          </Grid>
        )}
      </Grid>
    ),
    [Views.MAP_VIEW]: (
      <div className="map-container">
        <Map
          sideListTopMargin={navHeight + tagsSliderHeight + 47}
          cards={data?.data}
        />
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

  const setSearchText = (text: string) => {
    setFilterState((filterState) => ({ ...filterState, text }));
  };

  const setSelectedTags = (selectedTags: string[]) => {
    setFilterState((filterState) => ({ ...filterState, selectedTags }));
  };

  return (
    <div className={styles.home}>
      <Header>
        <title>PuraVida</title>
      </Header>
      <NavHeader
        ref={navRef}
        isValidating={isValidating}
        searchText={filterState.searchText}
        setSearchText={setSearchText}
      />
      <TagSlider
        ref={tagsSliderRef}
        {...{ setSelectedTags }}
        selectedTags={filterState.selectedTags}
      />
      <div className="container">
        {ViewMap[view]}
        {!isNoData && ButtonViewMap[view]}
      </div>
    </div>
  );
}
