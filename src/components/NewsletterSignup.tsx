export default function NewsletterSignup() {
    return (
        <section className="container mx-auto bg-orange-50 p-14 mb-10">
            <div className="container mx-auto px-4 grid md:grid-cols-2 items-center gap-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 leading-snug">
                        Deals and travel inspiration
                    </h2>
                    <p className="mt-2 text-gray-600 text-base">
                        Weekly in your inbox, daily in your feed
                    </p>
                    <form
                        className="mt-6 flex flex-col sm:flex-row gap-3"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Sign up
                        </button>
                    </form>
                </div>

                {/* Placeholder Images */}
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="https://placehold.co/150x150?text=Beach+1"
                        className="rounded-lg object-cover w-full h-full"
                        alt="Placeholder 1"
                    />
                    <img
                        src="https://placehold.co/150x150?text=Beach+2"
                        className="rounded-lg object-cover w-full h-full"
                        alt="Placeholder 2"
                    />
                    <img
                        src="https://placehold.co/150x150?text=Beach+3"
                        className="rounded-lg object-cover w-full h-full"
                        alt="Placeholder 3"
                    />
                    <img
                        src="https://placehold.co/150x150?text=Beach+4"
                        className="rounded-lg object-cover w-full h-full"
                        alt="Placeholder 4"
                    />
                </div>
            </div>
        </section>
    );
}