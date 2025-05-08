import { ReactNode } from "react";
import "../styles/globals.css";
import { AuthProvider } from '@/context/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HideLayout from '@/components/HideLayout';

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
        <head>
            <title>FlyAway Finds</title>
            <meta name="description" content="Your gateway to amazing destinations!" />
        </head>
        <body className="w-full h-screen">
        <AuthProvider>
            <HideLayout>
                <Header />
            </HideLayout>

            {children}

            <HideLayout>
                <Footer />
            </HideLayout>
        </AuthProvider>
        </body>
        </html>
    );
}