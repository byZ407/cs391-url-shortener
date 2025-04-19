import Link from "next/link";

export default function Header() {
    const titleLinkClasses = "text-4xl font-semibold p-4 hover:underline";
    return (
        <header className="flex items-center h-20">
            <Link href="/" className={titleLinkClasses}>
                Url Shortener
            </Link>
        </header>
    );
}