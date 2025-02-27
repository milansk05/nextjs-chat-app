"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { ChatWindow } from "@/components/chat-window"

export default function HomePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [selectedChat, setSelectedChat] = useState(null)

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        onSelectChat={setSelectedChat}
      />
      <ChatWindow
        selectedChat={selectedChat}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
    </div>
  )
}