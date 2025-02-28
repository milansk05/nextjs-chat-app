"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, LogOut, Settings } from "lucide-react";

const chats = [
    { name: "Systeem 🤖", message: "Laatste bericht weergeeft hier", time: "maandag", avatar: "" },
    { name: "Test Persoon 1", message: "Laatste bericht weergeeft hier", time: "dinsdag", avatar: "" },
    { name: "Test Persoon 2", message: "Laatste bericht weergeeft hier", time: "13:43", avatar: "" },
];

export function Sidebar({ isOpen, toggleSidebar, onSelectChat }: { isOpen: boolean; toggleSidebar: () => void; onSelectChat: (chat: any) => void }) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobiele Sidebar */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-96 p-0 bg-gray-900 text-white md:hidden">
                    <SheetHeader>
                        <SheetTitle className="sr-only">Chats</SheetTitle>
                    </SheetHeader>
                    <SidebarContent isOpen={true} onSelectChat={(chat) => {
                        onSelectChat(chat);
                        setIsMobileOpen(false); // Sluit sidebar op mobiel
                    }} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar met inklapfunctie */}
            <aside className={cn(
                "hidden md:flex h-screen bg-gray-900 text-white flex-col border-r border-gray-800 transition-all duration-300",
                isOpen ? "w-100" : "w-16"
            )}>
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    {isOpen && <span className="text-lg font-bold">Chats</span>}
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Chatlijst met zoekfunctie */}
                <SidebarContent isOpen={isOpen} onSelectChat={onSelectChat} />

                {/* Profiel onderaan */}
                <SidebarFooter isOpen={isOpen} />
            </aside>
        </>
    );
}

function SidebarContent({ isOpen = true, onSelectChat }: { isOpen?: boolean; onSelectChat: (chat: any) => void }) {
    const [search, setSearch] = useState("");

    const filteredChats = chats.filter(chat =>
        chat.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col flex-1">
            {/* Zoekbalk */}
            {isOpen && (
                <div className="p-4">
                    <Input
                        type="text"
                        placeholder="Zoeken"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-800 text-white placeholder-gray-400"
                    />
                </div>
            )}

            {/* Chatlijst */}
            <ScrollArea className="flex-1">
                {filteredChats.map((chat, index) => (
                    <button
                        key={index}
                        className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-800 transition"
                        onClick={() => onSelectChat(chat)}
                    >
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {isOpen && (
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="font-medium">{chat.name}</span>
                                    <span className="text-xs text-gray-400">{chat.time}</span>
                                </div>
                                <p className="text-sm text-gray-400 truncate">{chat.message}</p>
                            </div>
                        )}
                    </button>
                ))}
            </ScrollArea>
        </div>
    );
}

/* Profiel onderaan de sidebar */
function SidebarFooter({ isOpen }: { isOpen: boolean }) {
    const [user, setUser] = useState<{ name: string; email: string; image?: string } | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch("/api/auth/user", { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        }
        fetchUser();
    }, []);

    return (
        <div className="p-4 border-t border-gray-800 flex items-center gap-3 hover:bg-gray-800 transition">
            <Popover>
                <PopoverTrigger asChild>
                    <button className="flex items-center gap-3 w-full text-left focus:outline-none">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.image} alt="User" />
                            <AvatarFallback>{user?.name?.charAt(0) || "?"}</AvatarFallback>
                        </Avatar>
                        {isOpen && (
                            <div className="flex-1">
                                <span className="text-sm font-medium">{user?.name || "Gebruiker"}</span>
                                <p className="text-xs text-gray-400">{user?.email || "Onbekend"}</p>
                            </div>
                        )}
                    </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-2 bg-gray-900 border border-gray-800 rounded-md shadow-lg">
                    <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-2 text-white"
                        onClick={() => window.location.href = "/settings"}
                    >
                        <Settings className="h-4 w-4" />
                        Instellingen
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full flex items-center justify-start gap-2 text-red-500"
                        onClick={async () => {
                            await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
                            document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; HttpOnly; SameSite=Lax";
                            window.location.href = "/login";
                        }}
                    >
                        <LogOut className="h-4 w-4" />
                        Uitloggen
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}