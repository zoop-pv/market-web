import instanceAxios from "./api";

export type getMarketplacePostsParameters = {
  text?: string;
  tagsSlugs: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};

export function getMarketplacePosts(options: getMarketplacePostsParameters) {
  const QUERY = `query{
            filterMarketplacePosts(filterPostsInput:{
                text:"${options.text}"
                tagsSlugs: ${JSON.stringify(options.tagsSlugs)}
                page: ${options.page}
                limit: ${options.limit}
              })
            {
              data{
                _id
                name
                description
                mainImageUrl
                address
                rating
                openHours
                location {
                  coordinates
                }
              }
              pagination{
                page
                total
                numberOfPages
                count
                limit
              }
            }
        }`;

  const fetcher = (URL: string) =>
    instanceAxios
      .post(URL, { query: QUERY })
      .then((res) => res.data.data.filterMarketplacePosts);
  return fetcher;
}

export function getMarketplaceTags() {
  const QUERY = `query{  
            getMarketplaceTags(getMarketPlaceTagsInput:{})
            {
                data{
                    _id
                    name
                    icon
                  }
            }
        }`;
  const fetcher = (URL: string) =>
    instanceAxios
      .post(URL, { query: QUERY })
      .then((res) => res.data.data.getMarketplaceTags.data);
  return fetcher;
}

export function getMarketplacePost(id: string) {
  const QUERY = `query{  
            getMarketPlacePost(id:"${id}")
            {
                _id
                name
                tags{_id}
                description
                mainImageUrl
                imagesUrls
                address
                openHours
            }
        }`;
  const fetcher = (URL: string) =>
    instanceAxios
      .post(URL, { query: QUERY })
      .then((res) => res.data.data.getMarketPlacePost);

  return fetcher;
}
