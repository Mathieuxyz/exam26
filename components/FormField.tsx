import { type ComponentProps } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  label: string;
};

export function FormField({ label, id, className, ...rest }: FormFieldProps) {
  const fieldId = id ?? rest.name;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={fieldId} className="text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        id={fieldId}
        className={`rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 ${className ?? ""}`}
        {...rest}
      />
    </div>
  );
}
