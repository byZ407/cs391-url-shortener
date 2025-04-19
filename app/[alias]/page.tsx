import getAlias from "@/lib/getAlias";
import { redirect } from "next/navigation";

export default async function ShortUrlPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;
    const site = await getAlias(alias);
    if (!site) {
        redirect("/");
    }
    redirect(site.url);
}
