import Link from "next/link"

const NotFound = () => {
    return (
        <div className="text-center mx-auto max-w-xl px-4 py-24">
            <h1 className="font-display text-accent text-6xl mb-4">404</h1>
            <h2 className="font-display text-2xl uppercase mb-3">Page not found</h2>
            <p className="text-muted mb-8">
                That page doesn&apos;t exist. Try going back home.
            </p>
            <Link
            href="/"
            className="font-bold text-black text-sm uppercase bg-accent inline-block px-6 py-3 rounded-full"
            >
                back to home
            </Link>
        </div>
    );
};

export default NotFound;