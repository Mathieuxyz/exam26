export function toDateTimeLocalValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatBookingTime(date: Date) {
  return new Intl.DateTimeFormat("fr-BE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
