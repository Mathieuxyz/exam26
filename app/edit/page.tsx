import { notFound } from "next/navigation";

import { BookingForm } from "@/components/BookingForm";
import { DeleteBookingButton } from "@/components/DeleteBookingButton";
import { getBooking, updateBooking } from "@/lib/bookings";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditPage(props: Props) {
  const { id } = await props.params;
  const booking = await getBooking(id);

  if (!booking) {
    return (
      <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Erreur lors du chargement des articles
        </h1>
    );
  }

  const updateBookingWithId = updateBooking.bind(null, id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
          Réservation de {booking.name}
        </h1>
        <p className="mt-1 text-neutral-600">
          Modifiez les informations sur l'article
        </p>
      </div>
      <div className="rounded-lg border border-neutral-200 bg-white p-6">
        <BookingForm
          action={updateBookingWithId}
          defaultValues={booking}
          submitLabel="Enregistrer les modifications"
        />
      </div>
      <DeleteBookingButton id={booking.id} />
    </div>
  );
}
