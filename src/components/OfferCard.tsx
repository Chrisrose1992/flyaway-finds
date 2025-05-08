"use client";
import { useEffect, useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";

export default function OfferCard({ hotel }) {
    const [currentParams, setCurrentParams] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentParams(window.location.search);
        }
    }, []);

    return (
        <div className="border-gray-200 border p-4 rounded-lg flex items-stretch justify-start gap-4">
            <div className="w-2/3">
                <ImageCarousel images={hotel.hotel?.details?.photos?.map((e) => e.url)} />
            </div>
            <div className="w-1/3 flex flex-col">
                <div>
                    <h3 className="text-2xl">
                        {hotel.hotel?.name}
                    </h3>
                    <p>
                        <strong>Rating:</strong> {hotel.hotel?.rating} ⭐
                    </p>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <span>£{hotel.price?.total || "N/A"}</span>
                    <a
                        target={"_blank"}
                        href={`/holiday/${hotel.hotel.hotelId}/${hotel.offer.id}${currentParams}`}
                        className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    >
                        See More Details
                    </a>
                </div>
            </div>
        </div>
    );
}
