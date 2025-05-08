'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import Logo from '@/components/Logo';
import Link from 'next/link';
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const navigation = {
    holidays: [
        { name: 'All Inclusive', href: '/holidays/all-inclusive' },
        { name: 'Last Minute', href: '/holidays/last-minute' },
        { name: 'Beach Holidays', href: '/holidays/beach' },
        { name: 'Luxury', href: '/holidays/luxury' },
        { name: 'Family Holidays', href: '/holidays/family' },
    ],
    destinations: [
        { name: 'Europe', href: '/destinations/europe' },
        { name: 'Asia', href: '/destinations/asia' },
        { name: 'America', href: '/destinations/america' },
        { name: 'Caribbean', href: '/destinations/caribbean' },
        { name: 'Australia', href: '/destinations/australia' },
    ],
    bookings: [
        { name: 'Upcoming Trips', href: '/bookings/upcoming' },
        { name: 'Past Trips', href: '/bookings/past' },
        { name: 'Manage Booking', href: '/manage-my-booking' },
    ],
};

export default function Header() {
    const router = useRouter();
    const { user, loading, refreshUser } = useAuth();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error || "Logout failed.");
                return;
            }

            refreshUser();
            router.replace('/auth/login');

        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2">
                <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between text-sm font-medium space-x-4 md:space-x-8">
                    <div className="flex items-center gap-2">
                        <span>FLASH SALE! Save an extra £100 on all holidays departing before November 2026 with code SPRING100. T&Cs apply.</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            className={`px-6 py-4 rounded-full text-sm font-medium text-white shadow-sm transition duration-300 cursor-pointer bg-orange-400`}
                        >
                            See Offers
                        </button>
                    </div>
                </div>
            </div>
            <header className="py-4">
                <nav className="container mx-auto flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Logo/>
                    </div>
                    <div className="flex flex-grow justify-center lg:gap-x-12">
                        <Popover className="relative">
                            <PopoverButton
                                className="flex items-center gap-x-1 text-sm font-semibold text-gray-900 cursor-pointer">
                                Holidays
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033L10 14.0607L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L10 11.9393L14.4697 7.46967C14.7626 7.17678 15.2374 7.17678 15.5303 7.46967Z"
                                        fill="#3F434A"
                                    />
                                </svg>
                            </PopoverButton>
                            <PopoverPanel className="absolute top-full z-10 mt-3 w-56 rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-900/10">
                                {navigation.holidays.map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                        {item.name}
                                    </Link>
                                ))}
                            </PopoverPanel>
                        </Popover>

                        <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900 cursor-pointer">
                                Destinations
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033L10 14.0607L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L10 11.9393L14.4697 7.46967C14.7626 7.17678 15.2374 7.17678 15.5303 7.46967Z"
                                        fill="#3F434A"
                                    />
                                </svg>
                            </PopoverButton>
                            <PopoverPanel className="absolute top-full z-10 mt-3 w-56 rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-900/10">
                                {navigation.destinations.map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                        {item.name}
                                    </Link>
                                ))}
                            </PopoverPanel>
                        </Popover>

                        <Popover className="relative">
                            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900 cursor-pointer">
                                Bookings
                                <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033L10 14.0607L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L10 11.9393L14.4697 7.46967C14.7626 7.17678 15.2374 7.17678 15.5303 7.46967Z"
                                        fill="#3F434A"
                                    />
                                </svg>
                            </PopoverButton>
                            <PopoverPanel className="absolute top-full z-10 mt-3 w-56 rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-900/10">
                                {navigation.bookings.map((item) => (
                                    <Link key={item.name} href={item.href} className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md">
                                        {item.name}
                                    </Link>
                                ))}
                            </PopoverPanel>
                        </Popover>
                    </div>
                    <div className="flex-shrink-0">
                        {!loading && (
                            user ? (
                                <Popover className="relative">
                                    <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold text-gray-900 cursor-pointer">
                                        {user.username}
                                        <svg
                                            width={20}
                                            height={20}
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033L10 14.0607L4.46967 8.53033C4.17678 8.23744 4.17678 7.76256 4.46967 7.46967C4.76256 7.17678 5.23744 7.17678 5.53033 7.46967L10 11.9393L14.4697 7.46967C14.7626 7.17678 15.2374 7.17678 15.5303 7.46967Z"
                                                fill="#3F434A"
                                            />
                                        </svg>
                                    </PopoverButton>
                                    <PopoverPanel className="absolute top-full z-10 mt-3 w-56 rounded-lg bg-white p-4 shadow-lg ring-1 ring-gray-900/10">
                                        <Link
                                            href="/account/my-profile"
                                            className="block p-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                        >
                                            My Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left p-2 text-red-600 hover:bg-gray-100 rounded-md"
                                        >
                                            Logout
                                        </button>
                                    </PopoverPanel>
                                </Popover>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className="px-6 py-2 rounded-full font-medium transition duration-300 bg-gradient-to-r from-orange-500 to-orange-700 text-white"
                                >
                                    Login
                                </Link>
                            )
                        )}
                    </div>
                </nav>
            </header>
        </>
    );
}
