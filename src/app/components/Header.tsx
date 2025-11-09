"use client"

import Image from "next/image"
import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/material/Stack';

type HeaderProps = {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = ["Beranda", "Jelajah", "Tentang"]

  return (
    <header className="w-full bg-[#204564] text-white shadow-md sticky top-0 z-9999">
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
            <Button
              key={item}
              onClick={() => onNavigate(item)}
              variant="plain"
              color="neutral"
              sx={{
                position: 'relative',
                px: 1.5,
                py: 0.5,
                fontWeight: currentPage === item ? 600 : 500,
                color: currentPage === item ? 'white' : 'white',
                textTransform: 'none',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: currentPage === item ? '100%' : '0%',
                  height: '3px',
                  backgroundColor: 'white',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease',
                },
                '&:hover::after': {
                  width: '100%',
                },
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'white',
                },
              }}
            >
              {item}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  )
}
