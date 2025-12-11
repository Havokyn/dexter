'use client'

import { Menu, Settings } from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background-secondary border-b border-border">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
            Dexter
          </div>
          <span className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full font-medium">
            v2.0.1
          </span>
        </div>
      </div>

      <button
        className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
        aria-label="Settings"
      >
        <Settings size={20} />
      </button>
    </header>
  )
}
