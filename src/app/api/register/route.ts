import { NextResponse } from "next/server"
import { prisma } from "@/lib/prismadb"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    try {
        const { name, email, password, confirmPassword } = await req.json()

        // Controleer of de wachtwoorden overeenkomen
        if (password !== confirmPassword) {
            return NextResponse.json({ error: "Wachtwoorden komen niet overeen" }, { status: 400 })
        }

        // Controleer of de gebruiker al bestaat
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ error: "E-mail is al in gebruik" }, { status: 400 })
        }

        // Hash het wachtwoord
        const hashedPassword = await bcrypt.hash(password, 10)

        // Sla de gebruiker op in de database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
            },
        })

        return NextResponse.json({ message: "Gebruiker aangemaakt", user }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: "Fout bij registratie" }, { status: 500 })
    }
}