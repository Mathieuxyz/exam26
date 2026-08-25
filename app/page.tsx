import { BookingForm } from "@/components/BookingForm";
import { createBooking } from "@/lib/bookings";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Ajouter un article à l'inventaire :
        </h1>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <BookingForm action={createBooking} submitLabel="Ajouter" />
      </div>
      </div>
    </div>
  );
}
