import Link from "next/link";

import type { Booking } from "@/db/schema";

type ArticlesTableProps = {
  articles: Article[];
};

export function ArticlesTable({ articles }: ArticlesTableProps) {
  if (articles.length === 0) {
    return (
      <p className="text-neutral-600">Aucun article d'enregistré pour le moment.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-neutral-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-neutral-50 text-neutral-600">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              Nom
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Téléphone
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Personnes
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Heure
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-200">
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="px-4 py-3 text-neutral-900">{article.article}</td>
              <td className="px-4 py-3 text-neutral-600">{article.number}</td>
              <td className="px-4 py-3 text-neutral-600">{article.peremption}</td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/articles/${article.id}`}
                  className="font-medium text-neutral-900 underline underline-offset-2 hover:text-neutral-600"
                >
                  Modifier
                </Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
