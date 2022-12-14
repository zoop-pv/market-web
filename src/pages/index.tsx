import Card from "@/components/Card";
import Header from "@/components/Header";
import TagSlider from "@/components/TagSlider";
import { Grid } from "@mui/material";
import styles from "./styles.module.scss";
import Pagination from "@mui/material/Pagination";
import Image from "next/image";
import * as api_actions from "../services/post.service";
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

import useSWR from "swr";
import { useSWRConfig } from "swr";

const apiUrl = process.env.ENDPOINT_BASE_URL;


export default function Home() {
  const router = useRouter();

    const searchText = router.query.text ? router.query.text : "";
    const searchTags = router.query.tags ? Array.isArray(router.query.tags) ? router.query.tags : [router.query.tags] : [];
    const page = router.query.page ? +router.query.page : 1;
    const [searchTextState, setsearchText] = React.useState(searchText.toString());
    const [searchTagsState, setsearchTags] = React.useState(searchTags);
    const [pageState, setpage] = React.useState(page);
    const [tagsState, setTags] = React.useState([]);

    useEffect(()=>{
      setsearchText((router.query.text ? router.query.text : "").toString());
      setpage(router.query.page ? +router.query.page : 1);
      setsearchTags(router.query.tags ? Array.isArray(router.query.tags) ? router.query.tags : [router.query.tags] : []);
    },[router.query])


    const handlePaginationChange = (_e:any,page:number)=>{
      setpage(page);
      router.query.page = page.toString();
      router.push(router)
    };
    let getMarketpalcePostsCriteria: api_actions.getMarketplacePostsParameters = {
      text:searchTextState,
      tags:searchTagsState,
      page:pageState,
      limit:8,
      sortBy:'createdAt',
      order:'desc'
  }
    let getMarketplacePostsFetcher = api_actions.getMarketplacePosts(getMarketpalcePostsCriteria);
    const { mutate } = useSWRConfig()
    mutate(apiUrl)
      const { data } = useSWR(apiUrl, getMarketplacePostsFetcher)

    let getMarketplaceTagsFetcher = api_actions.getMarketplaceTags();
    const getMarketplaceTagsFetcherResult = useSWR(apiUrl+"?tags=1", getMarketplaceTagsFetcher)
    if (data && getMarketplaceTagsFetcherResult.data) {
      const posts = data;
      if(tagsState.length==0){
        setTags(getMarketplaceTagsFetcherResult.data)

      }
      return (
        <>
          <Header setsearchText={setsearchText}/>
          <TagSlider searchTagsState={setsearchTags} tagsData={tagsState} />
          <div className="container">
            <Grid container spacing={2} className={styles.cardsContainer}>
              {posts.map((card: any) => (
                <Grid item key={card._id} xs={6} md={3} lg={3}>
                  {" "}
                  <Card {...{ ...card }} />{" "}
                </Grid>
              ))}
            </Grid>
            {posts.length > 0 && <div className={styles.paginationContainer}>
              <Pagination count={10} size="small" color="primary" page={page} onChange={handlePaginationChange} />
            </div>}
            <button className={styles.viewMapBtn}>
              <span>View Map</span>
              <Image src="/assets/icons/map.svg" width={14} height={14} alt="map" />
            </button>
          </div>
        </>
      );
    }

    
    return (
      <>
        <Header />
        <TagSlider />
        <div className="container">
          <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
            animationDuration: '1000ms',
            display: "block",
            margin: "50px auto",
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={100}
          thickness={3}
        />
        </div>
      </>
    );
}
