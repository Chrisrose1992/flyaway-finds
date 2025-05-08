import Image from "next/image";

export default function PromoBanner() {
    return (
        <section className="relative container m-auto h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden my-16">
            <Image
                src="/images/happy-family.jpg"
                alt="Family on holiday"
                fill
                priority
                className="object-cover z-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-xl max-w-md shadow-lg">
                <h2 className="text-white text-3xl md:text-4xl font-bold">
                    Let the Memories Begin
                </h2>
                <p className="text-white text-sm md:text-base mt-3">
                    Family holidays you’ll always remember. Explore beach escapes,
                    all-inclusive resorts and more — all for less.
                </p>
                <button className="cursor-pointer mt-5 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2 rounded-full text-sm transition">
                    Discover Packages
                </button>
            </div>
        </section>
    );
}
