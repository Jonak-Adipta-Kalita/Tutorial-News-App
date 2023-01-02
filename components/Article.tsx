type Props = {
  article: Article;
};

const Article = ({ article }: Props) => {
  return (
    <article>
      {article.image && (
        <img
          loading="lazy"
          src={article.image}
          alt={article.title}
          className="h-56 w-full object-cover rounded-t-lg shadow-md"
        />
      )}
      <div className="">
        <div className=""></div>
      </div>
    </article>
  );
};

export default Article;
