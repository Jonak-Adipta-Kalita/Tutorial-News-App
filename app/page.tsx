import React from "react";
import NewsList from "../components/NewsList";
import { categories } from "../constants";
import { fetchNews } from "../utils/fetchNews";

type Props = {};

const HomePage = async (props: Props) => {
  const news: NewsResponse = await fetchNews(categories.join(","));

  return (
    <div>
      <NewsList news={news} />
    </div>
  );
};

export default HomePage;
