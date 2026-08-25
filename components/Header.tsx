import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-lg font-semibold text-neutral-900">
          Blog d'amateur de thés
        </Link>
        <nav aria-label="Navigation principale" className="flex gap-4 text-sm font-medium">
          <Link href="/articles" className="text-neutral-600 hover:text-neutral-900">
            Liste des articles
          </Link>
          <Link href="/edit" className="text-neutral-600 hover:text-neutral-900">
            Modifier un article
          </Link>
        </nav>
      </div>
    </header>
  );
}
