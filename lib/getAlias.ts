"use server";
import { AliasProps } from "@/types";
import getCollection, { ALIAS_COLLECTION } from "@/db";

export default async function getAlias(alias: string): Promise<AliasProps | null> {
    const aliasCollection = await getCollection(ALIAS_COLLECTION);
    const data = await aliasCollection.findOne({ alias });

    if (!data) return null;

    return {
        id: data._id.toHexString(),
        alias: data.alias,
        url: data.url,
        shortUrl: data.shortUrl,
    };
}
