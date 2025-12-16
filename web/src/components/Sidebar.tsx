'use client'

import { Plus, MessageSquare, Clock, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          exit={{ x: -280 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="w-70 bg-background-secondary border-r border-border flex flex-col"
        >
          <div className="p-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary hover:bg-primary-dark rounded-lg transition-colors font-medium">
              <Plus size={20} />
              New Research Query
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2">
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">
                Recent Sessions
              </h3>
              <div className="space-y-1">
                <SessionItem
                  icon={<TrendingUp size={16} />}
                  title="Apple revenue analysis"
                  time="2 hours ago"
                />
                <SessionItem
                  icon={<MessageSquare size={16} />}
                  title="Tesla Q4 earnings"
                  time="Yesterday"
                />
                <SessionItem
                  icon={<Clock size={16} />}
                  title="Market cap comparison"
                  time="3 days ago"
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-border">
            <div className="text-xs text-muted">
              <p className="mb-1">Autonomous Financial Research</p>
              <p className="text-muted-dark">Powered by Claude AI</p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

interface SessionItemProps {
  icon: React.ReactNode
  title: string
  time: string
}

function SessionItem({ icon, title, time }: SessionItemProps) {
  return (
    <button className="w-full flex items-start gap-3 px-3 py-2 rounded-lg hover:bg-background-tertiary transition-colors text-left group">
      <div className="mt-0.5 text-muted group-hover:text-primary transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm truncate">{title}</p>
        <p className="text-xs text-muted">{time}</p>
      </div>
    </button>
  )
}
