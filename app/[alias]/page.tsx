import getAlias from "@/lib/getAlias";
import { redirect } from "next/navigation";

interface Props {
    params: {
        alias: string;
    };
}

export default async function ShortUrlPage({ params }: Props) {
    const { alias } = params;
    const site = await getAlias(alias);
    if (!site) {
        redirect("/");
    }
    redirect(site.url);
}
