import { fetchNews } from "../../../utils/fetchNews";
import NewsList from "../../../components/NewsList";
import { categories } from "../../../constants";

type Props = {
  params: { category: Category };
};

const NewsCategoryPage = async ({ params: { category } }: Props) => {
  const news = await fetchNews(category);

  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
};

export default NewsCategoryPage;

export const generateStaticParams = async () => {
  return categories.map((category) => ({
    category,
  }));
};
