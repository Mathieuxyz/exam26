"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { bookings } from "@/db/schema";

function parseBookingForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const guests = Number(formData.get("guests"));
  const time = String(formData.get("time") ?? "");

  if (!name || !phone || !time || !Number.isFinite(guests) || guests < 1) {
    throw new Error("Champs de réservation invalides");
  }

  return { name, phone, guests, time: new Date(time) };
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
