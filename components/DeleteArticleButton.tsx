import { deleteArticle } from "@/lib/articles";

type DeleteArticleButtonProps = {
  id: string;
};

export function DeleteArticleButton({ id }: DeleteArticleButtonProps) {
  const deleteArticleWithId = deleteArticle.bind(null, id);

  return (
    <form action={deleteArticleWithId}>
      <button
        type="submit"
        className="rounded-md border border-red-300 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-50"
      >
        Supprimer l'article'
      </button>
    </form>
  );
}
