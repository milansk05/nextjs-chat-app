"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError("")

        const res = await fetch("/api/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data.error || "Fout bij inloggen")
            return
        }

        // 🔹 Opslaan als HTTP-only cookie via API response
        document.cookie = `token=${data.token}; path=/; max-age=604800; Secure;`

        console.log("Login succesvol, redirecting...")
        toast.success("Welkom terug! 🎉")

        // 🔹 Forceren dat Next.js de pagina herlaadt en middleware triggert
        router.push("/")
        router.refresh()
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">Welkom terug</h1>
                                <p className="text-balance text-muted-foreground">
                                    Log in op je APP-account
                                </p>
                            </div>
                            {error && <p className="text-red-500 text-center">{error}</p>}
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
                                <div className="flex items-center">
                                    <Label htmlFor="password">Wachtwoord</Label>
                                    <a
                                        href="/forgot-password"
                                        className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                        Wachtwoord vergeten?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="**********"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Inloggen
                            </Button>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    Of ga verder met
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <Button variant="outline" className="w-full">
                                    <span className="sr-only">Inloggen met Apple</span>
                                    🍏
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <span className="sr-only">Login met Google</span>
                                    🔴
                                </Button>
                                <Button variant="outline" className="w-full">
                                    <span className="sr-only">Login met Meta</span>
                                    🔵
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Heb je geen account?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Aanmelden
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="./images/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                Door op doorgaan te klikken, ga je akkoord met onze{" "}
                <a href="#">Servicevoorwaarden</a> en <a href="#">Privacybeleid</a>.
            </div>
        </div>
    )
}