"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Menu, Send, MoreVertical } from "lucide-react"

export function ChatWindow({ selectedChat, onOpenSidebar }: { selectedChat: any; onOpenSidebar: () => void }) {
    const [messages, setMessages] = useState([
        { id: 1, sender: "other", text: "Hey, hoe gaat het?" },
        { id: 2, sender: "me", text: "Goed, en met jou?" },
        { id: 3, sender: "other", text: "Ook goed! Wat ben je aan het doen?" },
        { id: 4, sender: "me", text: "Ik ben bezig met een Next.js project en werk aan een chat-interface!" },
        { id: 5, sender: "other", text: "Klinkt geweldig! Ik wil ook leren hoe ik Next.js kan gebruiken." },
        { id: 6, sender: "me", text: "Dit is een superlang bericht zonder spaties: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" },
    ])
    const [newMessage, setNewMessage] = useState("")

    if (!selectedChat) {
        return (
            <div className="flex flex-1 items-center justify-center text-gray-500 bg-gray-100">
                Selecteer een chat om te beginnen
            </div>
        )
    }

    function sendMessage() {
        if (!newMessage.trim()) return
        setMessages([...messages, { id: messages.length + 1, sender: "me", text: newMessage }])
        setNewMessage("")
    }

    return (
        <div className="flex flex-col flex-1 w-full mx-auto h-screen bg-white overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 flex items-center justify-between border-b bg-gray-200 w-full">
                <div className="flex items-center gap-3">
                    {/* Hamburger-menu voor mobiel */}
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenSidebar}>
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Profielfoto en naam */}
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChat?.avatar} alt={selectedChat?.name} />
                        <AvatarFallback>{selectedChat?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-lg font-semibold">{selectedChat?.name}</h1>
                        <p className="text-sm text-gray-500">Online</p>
                    </div>
                </div>

                {/* Drie puntjes voor extra opties */}
                <MoreVertical className="h-6 w-6 text-gray-600 cursor-pointer" />
            </div>

            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4 space-y-2 w-full">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"} w-full`}
                    >
                        <div
                            className={`rounded-lg p-3 break-all 
                max-w-[85%] sm:max-w-[60ch] w-fit
                ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"}
              `}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t flex items-center gap-2 bg-gray-200 w-full">
                <Input
                    placeholder="Typ een bericht..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={sendMessage} className="p-2">
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}