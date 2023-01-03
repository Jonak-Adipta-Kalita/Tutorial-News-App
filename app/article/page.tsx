import { notFound } from "next/navigation";
import LiveTimestamp from "../../components/LiveTimestamp";

type Props = {
  searchParams?: Article;
};

const ArticlePage = ({ searchParams: article }: Props) => {
  if ((article && Object.entries(article).length === 0) || !article) {
    return notFound();
  }

  return (
    <article className="">
      <section className="flex flex-col lg:flex-row pb-24 px-0 lg:px-10">
        {article.image !== "null" && (
          <img
            loading="lazy"
            src={article.image!}
            alt={article.title}
            className="h-50 max-w-md mx-auto md:max-w-lg lg:max-w-xl object-cover rounded-lg shadow-md"
          />
        )}
        <div className="px-10">
          <h1 className="headerTitle px-0 no-underline pb-2">
            {article.title}
          </h1>
          <div className="flex divide-x-2 space-x-4">
            {article.author !== "null" && (
              <h2 className="font-bold">By: {article.author}</h2>
            )}
            <h2 className="font-bold pl-4">Source: {article.source}</h2>
            <div className="pl-4">
              <LiveTimestamp time={article.published_at} />
            </div>
          </div>
          <p className="pt-4">{article.description}</p>
        </div>
      </section>
    </article>
  );
};

export default ArticlePage;
