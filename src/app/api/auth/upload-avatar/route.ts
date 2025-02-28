import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prismadb";
import { verify } from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });

    try {
        const decoded: any = verify(token, process.env.AUTH_SECRET || "fallback-secret");
        const userId = decoded.userId;

        const formData = await req.formData();
        const file = formData.get("file") as Blob;

        if (!file) return NextResponse.json({ error: "Geen bestand geüpload" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(process.cwd(), "public/avatars", `${userId}.png`);

        await fs.writeFile(filePath, buffer);

        await prisma.user.update({ where: { id: userId }, data: { image: `/avatars/${userId}.png` } });

        return NextResponse.json({ image: `/avatars/${userId}.png` });
    } catch (error) {
        return NextResponse.json({ error: "Upload mislukt" }, { status: 500 });
    }
}