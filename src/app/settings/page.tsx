"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { LogOut, Camera, ArrowLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null);
    const [darkMode, setDarkMode] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newName, setNewName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/auth/user", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setNewName(data.name || ""); // 🔹 Vul de huidige naam in
            }
        }
        fetchUser();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSaveName = async () => {
        if (!newName.trim() || newName === user?.name) return;
        setLoading(true);

        const res = await fetch("/api/auth/update-name", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName }),
            credentials: "include",
        });

        if (res.ok) {
            const updatedUser = await res.json();
            setUser(updatedUser);
        }

        setLoading(false);
    };

    const uploadProfilePicture = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch("/api/auth/upload-avatar", {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        if (res.ok) {
            const data = await res.json();
            setUser((prev) => (prev ? { ...prev, image: data.image } : null));
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            {/* 🔹 Terug naar chatpagina knop */}
            <Button variant="outline" onClick={() => router.push("/")}>
                <ArrowLeft className="h-5 w-5 mr-2" /> Terug naar chat
            </Button>

            <h1 className="text-3xl font-bold">Instellingen</h1>

            {/* 🔹 Profielinstellingen */}
            <Card>
                <CardHeader>
                    <CardTitle>Profiel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={user?.image} alt="Profielfoto" />
                                <AvatarFallback>{user?.name?.charAt(0) || "?"}</AvatarFallback>
                            </Avatar>
                            <label
                                htmlFor="avatar-upload"
                                className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full cursor-pointer hover:bg-gray-700"
                            >
                                <Camera className="h-4 w-4 text-white" />
                            </label>
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="name">Naam</Label>
                            <Input
                                id="name"
                                type="text"
                                value={newName}
                                className="mt-2"
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        variant="default"
                        className="w-full flex items-center gap-2"
                        onClick={handleSaveName}
                        disabled={loading}
                    >
                        <Save className="h-4 w-4" />
                        {loading ? "Opslaan..." : "Opslaan"}
                    </Button>
                </CardContent>
            </Card>

            {/* 🔹 Knop om profielfoto te uploaden */}
            {selectedFile && (
                <Button variant="default" className="w-full" onClick={uploadProfilePicture}>
                    Profielfoto opslaan
                </Button>
            )}

            {/* 🔹 Thema-instellingen */}
            <Card>
                <CardHeader>
                    <CardTitle>Weergave</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <span>Donkere modus</span>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                </CardContent>
            </Card>

            {/* 🔹 Uitlogknop */}
            <Button
                variant="destructive"
                className="w-full flex items-center gap-2"
                onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
                    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; HttpOnly; SameSite=Lax";
                    router.push("/login");
                }}
            >
                <LogOut className="h-4 w-4" />
                Uitloggen
            </Button>
        </div>
    );
}