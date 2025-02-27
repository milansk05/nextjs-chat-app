import { ForgotPasswordForm } from "@/components/forgot-password-form"

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6">
            <div className="w-full max-w-md">
                <ForgotPasswordForm />
            </div>
        </div>
    )
}