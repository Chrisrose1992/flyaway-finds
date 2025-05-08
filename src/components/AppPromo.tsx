import Image from "next/image";

export default function AppPromo() {
    return (
        <section className="container m-auto bg-white py-14 border-t border-b mt-6 mb-8">
            <div className="container mx-auto px-6 lg:px-4">
                <div className="bg-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            3 million downloads and counting
                        </h2>
                        <p className="text-gray-600 text-base mb-3">
                            Rated <span className="font-bold text-black">4.9/5</span> on the App Store and{" "}
                            <span className="font-bold text-black">4.8/5</span> on Google Play, the Flyaway Finds app is the
                            easiest way to find, book and manage your next holiday.
                        </p>
                        <p className="text-gray-600 mb-6">
                            Download it now for an unmatched experience.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="block w-36">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                    alt="Google Play"
                                />
                            </a>
                            <a href="#" className="block w-32">
                                <img
                                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                    alt="App Store"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Phone Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <Image
                            src="/images/phone.jpg"
                            alt="App preview"
                            width={300}
                            height={600}
                            className="w-64 md:w-80 h-auto"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
