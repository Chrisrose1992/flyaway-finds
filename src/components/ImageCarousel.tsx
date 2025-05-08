"use client";

import { useState } from "react";

interface ImageCarouselProps {
    images: string[];
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const goToPrevious = (): void => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (): void => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number): void => {
        setCurrentIndex(slideIndex);
    };

    if (!images || images.length === 0) {
        return (
            <div className="relative w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
                <p className="text-gray-500 text-lg">No images available</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center py-3">
                {images.map((_: string, slideIndex: number) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`cursor-pointer w-2 h-2 rounded-full mx-1 shadow-xl border ${
                            slideIndex === currentIndex ? "bg-gray-100 border-gray-200" : "bg-gray-50 border-gray-100"
                        }`}
                    ></div>
                ))}
            </div>
            <div className="overflow-hidden relative rounded-lg z-10">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="w-full h-96 object-cover"
                />
                <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
                    </svg>
                </button>
                <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                         stroke="currentColor" className="h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
