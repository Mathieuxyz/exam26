import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/ArticleForm";
import { DeleteArticleButton } from "@/components/DeleteArticleButton";
import { getArticle, updateArticle } from "@/lib/articles";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditPage(props: Props) {
  const { id } = await props.params;
  const article = await getArticle(id);

  if (!article) {
    return (
      <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Erreur lors du chargement de l'article
        </h1>
    );
  }

  const updateArticleWithId = updateArticle.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Édition de {article.title}
        </h1>
    );
  }

  const updateArticleWithId = updateArticle.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Édition de {article.title}
        </h1>
        <p className="mt-1 text-neutral-600">
          Modifiez les informations sur l'article
        </p>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <ArticleForm
          action={updateArticleWithId}
          defaultValues={article}
          submitLabel="Enregistrer les modifications"
        />
      </div>
      <DeleteArticleButton id={article.id} />
    </div>
  );
}
