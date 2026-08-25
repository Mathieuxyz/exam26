"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { articles } from "@/db/schema";

function parseArticleForm(formData: FormData) {
  const article = String(formData.get("article") ?? "").trim();
  const number = String(formData.get("number") ?? "").trim();
  const peremption = Number(formData.get("peremption"));

  if (!article || !number || !peremption || !Number.isFinite(peremption) || peremption < 1) {
    throw new Error("Invalid");
  }

  return { article, number, peremption };
}

export async function getArticles() {
  return db.query.articles.findMany({
    orderBy: (a, { asc }) => asc(a.article),
  });
}

export async function getArticle(id: string) {
  return db.query.articles.findFirst({
    where: eq(articles.id, id),
  });
}

export async function createArticle(formData: FormData) {
  const data = parseArticleForm(formData);
  await db.insert(articles).values(data);
  redirect("/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const data = parseArticleForm(formData);
  await db.update(articles).set(data).where(eq(articles.id, id));
  redirect("/articles");
}

export async function deleteArticle(id: string) {
  await db.delete(articles).where(eq(articles.id, id));
  redirect("/articles");
}
