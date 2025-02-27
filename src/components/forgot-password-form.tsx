import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-6 md:p-8">
                    <form className="flex flex-col gap-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Wachtwoord Vergeten?</h1>
                            <p className="text-muted-foreground">
                                Voer je e-mailadres in en we sturen je een resetlink.
                            </p>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="email@example.com" required />
                        </div>

                        <Button type="submit" className="w-full">
                            Stuur Reset-link
                        </Button>

                        <div className="text-center text-sm">
                            Weet je je wachtwoord weer?{" "}
                            <a href="/login" className="underline underline-offset-4">
                                Log in
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}