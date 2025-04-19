import NewUrlAlias from "@/components/NewUrlAlias";

export default async function Home() {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-blue-200 p-4">
                <NewUrlAlias />
            </div>
        </>
    );
}