"use client"

import Image from "next/image"

type HeaderProps = {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = ["Beranda", "Jelajah", "Tentang"]

  return (
    <header className="w-full bg-[#204564] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate("Beranda")}
        >
          <div className="relative w-[120px] h-[50px]">
            <Image
              src="/assets/images/placeholder.png"
              alt="Placeholder"
              fill
              sizes="120px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-x-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => onNavigate(item)}
              className={`hover:underline transition ${
                currentPage === item ? "font-semibold underline" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
