"use client";

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    phoneNumber?: string;
    dob?: Date;
    role: string;
    status: string;
    title: string;
    gender: string;
}

interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    loading: boolean;
    refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function getUser() {
        try {
            const response = await fetch("/api/user/getUser", { credentials: "include" });

            if (!response.ok) throw new Error("Failed to fetch user data");

            const getData = await response.json();

            if (getData?.userData?.success) {
                setUser(getData.userData || null);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Auth Error:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, refreshUser: getUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}