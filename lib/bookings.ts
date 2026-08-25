"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { bookings } from "@/db/schema";

function parseBookingForm(formData: FormData) {
  const article = String(formData.get("article") ?? "").trim();
  const number = String(formData.get("number") ?? "").trim();
  const peremption = Number(formData.get("peremption"));

  if (!article || !number || !peremption || !Number.isFinite(peremption) || peremption < 1) {
    throw new Error("Invalid");
  }

  return { article, number, peremption };
}

export async function getBookings() {
  return db.query.bookings.findMany({
    orderBy: (b, { asc }) => asc(b.time),
  });
}

export async function getBooking(id: string) {
  return db.query.bookings.findFirst({
    where: eq(bookings.id, id),
  });
}

export async function createBooking(formData: FormData) {
  const data = parseBookingForm(formData);
  await db.insert(bookings).values(data);
  redirect("/bookings");
}

export async function updateBooking(id: string, formData: FormData) {
  const data = parseBookingForm(formData);
  await db.update(bookings).set(data).where(eq(bookings.id, id));
  redirect("/bookings");
}

export async function deleteBooking(id: string) {
  await db.delete(bookings).where(eq(bookings.id, id));
  redirect("/bookings");
}
