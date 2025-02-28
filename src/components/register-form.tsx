"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        // Verstuur de registratiegegevens naar de API
        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password, confirmPassword }),
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || "Er is iets misgegaan")
            return
        }

        // Stuur gebruiker na registratie naar de loginpagina
        router.push("/login")
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-6 md:p-8">
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Maak een account aan</h1>
                            <p className="text-muted-foreground">Meld je aan om te beginnen</p>
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <div className="grid gap-2">
                            <Label htmlFor="name">Naam</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Naam"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="email@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="**********"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Bevestig Wachtwoord</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="**********"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Aanmelden
                        </Button>

                        <div className="text-center text-sm">
                            Heb je al een account?{" "}
                            <a href="/login" className="underline underline-offset-4">
                                Inloggen
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}