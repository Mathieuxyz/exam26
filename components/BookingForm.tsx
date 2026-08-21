import { FormField } from "@/components/FormField";
import { toDateTimeLocalValue } from "@/lib/format";
import type { Booking } from "@/db/schema";

type BookingFormProps = {
  action: (formData: FormData) => void;
  defaultValues?: Booking;
  submitLabel: string;
};

export function BookingForm({ action, defaultValues, submitLabel }: BookingFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <FormField
        label="Nom"
        name="name"
        type="text"
        required
        autoComplete="name"
        defaultValue={defaultValues?.name}
        placeholder="Jean Dupont"
      />
      <FormField
        label="Téléphone"
        name="phone"
        type="tel"
        required
        autoComplete="tel"
        defaultValue={defaultValues?.phone}
        placeholder="0470 12 34 56"
      />
      <FormField
        label="Nombre de personnes"
        name="guests"
        type="number"
        min={1}
        required
        defaultValue={defaultValues?.guests}
        placeholder="4"
      />
      <FormField
        label="Heure de réservation"
        name="time"
        type="datetime-local"
        required
        defaultValue={
          defaultValues ? toDateTimeLocalValue(new Date(defaultValues.time)) : undefined
        }
      />
      <button
        type="submit"
        className="mt-2 rounded-md bg-neutral-900 px-4 py-2 font-medium text-white transition-colors hover:bg-neutral-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
