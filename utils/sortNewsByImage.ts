export default (news: NewsResponse) => {
  const newsWithImages = news.data.filter((article) => article.image !== null);
  const newsWithoutImages = news.data.filter(
    (article) => article.image === null
  );
  const articles = [...newsWithImages, ...newsWithoutImages];

  const sortedNewsResponse = {
    ...news,
    data: articles.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.title === item.title)
    ),
  };

  return sortedNewsResponse;
};
