import instanceAxios from "./api";

export function getMarketplaceTags() {
  const QUERY = `query{
    getMarketplaceTags(getMarketPlaceTagsInput:{})
            {
                data {
                  name
                  icon
                  _id
                  status
                  slug
                }
                pagination {
                  total
                  numberOfPages
                  count
                  limit
                  page
                }
            }
        }`;

  const fetcher = (URL: string) =>
    instanceAxios.post(URL, { query: QUERY }).then((res) => ({
      tags: res.data.data.getMarketplaceTags.data,
      pagination: res.data.data.getMarketplaceTags.pagination,
    }));
  return fetcher;
}
