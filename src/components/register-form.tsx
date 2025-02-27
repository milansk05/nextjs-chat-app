import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-6 md:p-8">
                    <form className="flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Maak een account aan</h1>
                            <p className="text-muted-foreground">Meld je aan om te beginnen</p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Naam</Label>
                            <Input id="name" type="text" placeholder="Naam" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="email@example.com" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Wachtwoord</Label>
                            <Input id="password" type="password" placeholder="**********" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Bevestig Wachtwoord</Label>
                            <Input id="confirm-password" type="password" placeholder="**********" required />
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