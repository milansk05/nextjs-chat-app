import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prismadb"; // Zorg dat prisma correct is geïmporteerd

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // 🔹 Controleer of de gebruiker bestaat in de database
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.hashedPassword) {
            return NextResponse.json({ error: "Ongeldige inloggegevens" }, { status: 401 });
        }

        // 🔹 Controleer of het wachtwoord klopt
        const isMatch = await bcrypt.compare(password, user.hashedPassword);
        if (!isMatch) {
            return NextResponse.json({ error: "Ongeldige inloggegevens" }, { status: 401 });
        }

        // 🔹 Genereer JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.AUTH_SECRET || "fallback-secret", {
            expiresIn: "1h",
        });

        // 🔹 Zet de token in een cookie
        const response = NextResponse.json({ success: true });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 3600,
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login API Error:", error);
        return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
    }
}