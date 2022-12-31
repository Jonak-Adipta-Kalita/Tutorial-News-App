export default (news: NewsResponse) => {
  const newsWithImages = news.data.filter((article) => article.image !== null);
  const newsWithoutImages = news.data.filter(
    (article) => article.image === null
  );

  const sortedNewsResponse = {
    ...news,
    data: [...newsWithImages, ...newsWithoutImages],
  };

  return sortedNewsResponse;
};
