import { FormField } from "@/components/FormField";
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
        label="Nom de l'article"
        name="article"
        type="text"
        required
        autoComplete="name"
        defaultValue={defaultValues?.article}
        placeholder="Thé vert"
      />
      <FormField
        label="Numéro d'article"
        name="number"
        type="integer"
        required
        autoComplete="name"
        defaultValue={defaultValues?.number}
        placeholder="345554642342543"
      />
      <FormField
        label="Date de péremption"
        name="peremption"
        type="text"
        required
        autoComplete="name"
        defaultValue={defaultValues?.peremption}
        placeholder="01/04/2067"
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
