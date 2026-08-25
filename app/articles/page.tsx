import { BookingsTable } from "@/components/BookingsTable";
import { getBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export default async function ArticlePage() {
  const bookings = await getBookings();
  
  if (!getBookings) {
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
      <BookingsTable bookings={bookings} />
    </div>
  );
  }
}
