import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        countries: $categories
        countries: "us,gb,in"
        sort: "published_desc"
        limit: "100"
        offset: "0"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          published_at
          language
          image
          source
          title
          url
        }
        pagination {
          count
          limit
          offset
          total
        }
      }
    }
  `;

  const req = await fetch("https://alva.stepzen.net/api/sappy-owl/__graphql", {
    method: "POST",
    cache: isDynamic ? "no-cache" : "default",
    next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        access_key: process.env.MEDIASTACK_API_KEY,
        categories: category,
        keywords,
      },
    }),
  });

  const newsResponse = await req.json();

  const sortedNewsResponse = sortNewsByImage(newsResponse.data.myQuery);

  return sortedNewsResponse;
};

export { fetchNews };
