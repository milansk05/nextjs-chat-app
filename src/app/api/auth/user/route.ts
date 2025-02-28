import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { prisma } from "@/lib/prismadb";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

    try {
        const decoded: any = verify(token, process.env.AUTH_SECRET || "fallback-secret");
        const user = await prisma.user.findUnique({ where: { email: decoded.email } });

        if (!user) return NextResponse.json({ error: "Gebruiker niet gevonden" }, { status: 404 });

        return NextResponse.json({ name: user.name, email: user.email, image: user.image });
    } catch (error) {
        return NextResponse.json({ error: "Ongeldig token" }, { status: 401 });
    }
}