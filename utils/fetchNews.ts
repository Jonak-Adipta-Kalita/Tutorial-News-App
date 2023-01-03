import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";
import dummyData from "../dummyData.json";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  const USE_DUMMY_DATA = true;

  if (!USE_DUMMY_DATA) {
    const query = gql`
      query MyQuery(
        $access_key: String!
        $categories: String!
        $keywords: String
      ) {
        myQuery(
          access_key: $access_key
          categories: $categories
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

    const req = await fetch(
      "https://alva.stepzen.net/api/sappy-owl/__graphql",
      {
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
            access_key: process.env.MEDIA_STACK_API_KEY,
            categories: category,
            keywords,
          },
        }),
      }
    );

    return sortNewsByImage((await req.json()).data.myQuery);
  }

  return sortNewsByImage(dummyData);
};

export { fetchNews };
