"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar met inklapfunctie */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Chatvenster (rechts) */}
      <main className="flex-1 p-6 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Selecteer een chat om te beginnen</p>
      </main>
    </div>
  )
}