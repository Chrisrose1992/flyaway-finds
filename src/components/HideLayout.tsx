"use client";

import { usePathname } from "next/navigation";

export default function HideLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/auth/");

    return (
        <>
            {!isAuthPage && children}
        </>
    );
}