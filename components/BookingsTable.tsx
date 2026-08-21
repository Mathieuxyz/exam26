import Link from "next/link";

import { formatBookingTime } from "@/lib/format";
import type { Booking } from "@/db/schema";

type BookingsTableProps = {
  bookings: Booking[];
};

export function BookingsTable({ bookings }: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <p className="text-neutral-600">Aucune réservation pour le moment.</p>
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
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="px-4 py-3 text-neutral-900">{booking.name}</td>
              <td className="px-4 py-3 text-neutral-600">{booking.phone}</td>
              <td className="px-4 py-3 text-neutral-600">{booking.guests}</td>
              <td className="px-4 py-3 text-neutral-600">
                {formatBookingTime(new Date(booking.time))}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/bookings/${booking.id}`}
                  className="font-medium text-neutral-900 underline underline-offset-2 hover:text-neutral-600"
                >
                  Modifier
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
