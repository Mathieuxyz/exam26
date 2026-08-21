import { deleteBooking } from "@/lib/bookings";

type DeleteBookingButtonProps = {
  id: string;
};

export function DeleteBookingButton({ id }: DeleteBookingButtonProps) {
  const deleteBookingWithId = deleteBooking.bind(null, id);

  return (
    <form action={deleteBookingWithId}>
      <button
        type="submit"
        className="rounded-md border border-red-300 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-50"
      >
        Supprimer la réservation
      </button>
    </form>
  );
}
