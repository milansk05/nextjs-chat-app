import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { verify } from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("token")?.value;
        if (!token) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

        const decoded: any = verify(token, process.env.AUTH_SECRET || "fallback-secret");
        const { name } = await req.json();

        if (!name || name.trim().length < 3) {
            return NextResponse.json({ error: "Naam moet minimaal 3 tekens lang zijn" }, { status: 400 });
        }

        // ✅ Update de naam in de database
        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: { name },
        });

        return NextResponse.json({ name: updatedUser.name, email: updatedUser.email, image: updatedUser.image });
    } catch (error) {
        console.error("Fout bij updaten van naam:", error);
        return NextResponse.json({ error: "Interne serverfout" }, { status: 500 });
    }
}