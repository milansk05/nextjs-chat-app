import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value; // ✅ Correcte manier om de cookie te lezen

    if (!token) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        verify(token, process.env.AUTH_SECRET || "fallback-secret");
        return NextResponse.json({ authenticated: true });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}