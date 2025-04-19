"use server";
import getCollection, { ALIAS_COLLECTION } from "@/db";
import { AliasProps } from "@/types";

export default async function createNewAlias(
    url: string,
    alias: string,
): Promise<AliasProps|string> {

    try {
        new URL(url);
    } catch {
        return "Invalid URL: Please check your format and try again.";
    }
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return `Failed to fetch, status: ${res.status}`;
        }
    } catch {
        return "Invalid URL: Could not verify URL. Please try again.";
    }

    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const exists = await aliasCollection.findOne({ alias });
    if (exists) {
        return "Invalid alias: This alias already exists";
    }

    const base = process.env.VERCEL_URL ? `https://my-cs391-url-shortener.vercel.app` : `http://localhost:${process.env.PORT || 3000}`;
    const shortUrl = `${base}/${alias}`;

    const p = {url, alias, shortUrl};
    const res = await aliasCollection.insertOne({ ...p });

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { ...p, id: res.insertedId.toHexString() };
}