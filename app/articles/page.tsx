import { ArticlesTable } from "@/components/ArticlesTable";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function ArticlePage() {
  const articles = await getArticles();
  
  if (!articles) {
    return (
      <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Erreur lors du chargement des articles
        </h1>
    );
  }

  else {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Liste des articles:
        </h1>
      </div>
      <ArticlesTable articles={articles} />
    </div>
  );
  }
}
