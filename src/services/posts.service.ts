import instanceAxios from "./api";

export type getMarketplacePostsParameters = {
  text?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
};

export function getMarketplacePosts(options: getMarketplacePostsParameters) {
  let tagsQuery = "";
  if (options?.tags?.length) {
    tagsQuery = `tagId:"${options?.tags[0]}"`;
  }

  const QUERY = `query{
            filterMarketplacePosts(filterPostsInput:{

                text:"${options.text}"
                ${tagsQuery}
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
