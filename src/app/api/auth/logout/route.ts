import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({ success: true });

    // 🔹 Verwijder de token cookie correct
    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
    });

    return response;
}