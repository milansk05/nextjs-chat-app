"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname(); // ✅ Haalt de huidige pagina op

    useEffect(() => {
        // ✅ Skip de auth-check als de gebruiker op de login- of registerpagina is
        if (pathname === "/login" || pathname === "/register") {
            setLoading(false);
            return;
        }

        async function checkAuth() {
            try {
                const res = await fetch("/api/auth/check", {
                    method: "GET",
                    credentials: "include",
                });
                if (!res.ok) {
                    router.push("/login"); // ✅ Redirect alleen als je NIET op login zit
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                router.push("/login");
            }
        }

        checkAuth();
    }, [router, pathname]);

    if (loading) {
        return <p>Loading...</p>; // ✅ Voorkomt eindeloze loading-loop
    }

    return <>{children}</>;
}