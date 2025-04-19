import getAlias from "@/lib/getAlias";
import { redirect } from "next/navigation";

export default async function ShortUrlPage({ params }: { params: { alias: string } }) {
    const site = await getAlias(params.alias);
    if (!site) {
        redirect("/");
    }
    redirect(site.url);
}