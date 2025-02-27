"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const chats = [
    { name: "Papa 🧑‍🦰", message: "Je reageerde met 👍 op: 'Klaar'", time: "maandag", avatar: "/avatars/papa.png" },
    { name: "Mama 👩‍🦰", message: "❤️ op: 'Vanochtend'", time: "dinsdag", avatar: "/avatars/mama.png" },
    { name: "Noorderpoort", message: "Jij: Dit doet gewoon soms dingen met je 😕", time: "13:43", avatar: "/avatars/noorderpoort.png" },
    { name: "Test Gebruiker", message: "Hoi! Ik ben een test gebruiker. 🐈", time: "vandaag", avatar: "" },
    { name: "Test Gebruiker", message: "Hoi! Ik ben een test gebruiker. 🐈", time: "vandaag", avatar: "" },
    { name: "Test Gebruiker", message: "Hoi! Ik ben een test gebruiker. 🐈", time: "vandaag", avatar: "" },
    { name: "Test Gebruiker", message: "Hoi! Ik ben een test gebruiker. 🐈", time: "vandaag", avatar: "" },
    { name: "Test Gebruiker", message: "Hoi! Ik ben een test gebruiker. 🐈", time: "vandaag", avatar: "" },
]

export function Sidebar({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) {
    const [search, setSearch] = useState("")

    return (
        <>
            {/* Mobiele Sidebar (hidden op desktop) */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                {/* Vergroot de breedte van de mobiele sidebar */}
                <SheetContent side="left" className="w-104 p-0 bg-gray-900 text-white md:hidden">
                    <SidebarContent isOpen={true} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar (hidden op mobiel) */}
            <aside className={cn(
                "hidden md:flex h-screen bg-gray-900 text-white flex-col border-r border-gray-800 transition-all duration-300",
                isOpen ? "w-104" : "w-16"
            )}>
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                    {isOpen && <span className="text-lg font-bold">Chats</span>}
                    <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>

                {/* Chatlijst met zoekfunctie */}
                <SidebarContent isOpen={isOpen} />
            </aside>
        </>
    )
}

function SidebarContent({ isOpen = true }: { isOpen?: boolean }) {
    const [search, setSearch] = useState("")

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
                {chats.map((chat, index) => (
                    <button key={index} className="flex items-center gap-3 p-3 w-full text-left hover:bg-gray-800 transition">
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

            {/* Gebruikersprofiel onderaan */}
            <div className="p-4 border-t border-gray-800 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/user.png" alt="User" />
                    <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                {isOpen && (
                    <div className="flex-1">
                        <span className="text-sm font-medium">Milan S</span>
                        <p className="text-xs text-gray-400">milans@example.com</p>
                    </div>
                )}
            </div>
        </div>
    )
}