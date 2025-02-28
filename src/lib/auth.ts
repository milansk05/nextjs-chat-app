import { betterAuth } from "better-auth"
import { prismaAdapter, type PrismaConfig } from "better-auth/adapters/prisma"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const prismaConfig: PrismaConfig = {
    entities: {
        user: "user",
        session: "session",
    },
}

export const auth = betterAuth({
    adapter: prismaAdapter(prisma, prismaConfig),
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
})

export const { handler, api } = auth