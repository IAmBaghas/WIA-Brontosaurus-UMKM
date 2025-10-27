"use client"

import { useState } from "react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Body from "./components/Body"
import HomePage from "./components/pages/HomePage"
import ExplorePage from "./components/pages/ExplorePage"
import AboutPage from "./components/pages/AboutPage"

export default function SinglePageApp() {
  const [page, setPage] = useState("Beranda")

  const renderPage = () => {
    switch (page) {
      case "Jelajah":
        return <ExplorePage />
      case "Tentang":
        return <AboutPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPage={page} onNavigate={setPage} />
      <main className="grow container mx-auto px-4 py-6">
        <Body>{renderPage()}</Body>
      </main>
      <Footer />
    </div>
  )
}
