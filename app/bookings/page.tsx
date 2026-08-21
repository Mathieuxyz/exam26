import { BookingsTable } from "@/components/BookingsTable";
import { getBookings } from "@/lib/bookings";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Réservations
        </h1>
        <p className="mt-1 text-neutral-600">
          Liste de toutes les réservations enregistrées.
        </p>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
