'use client'

import { TrendingUp, Search, BarChart3, DollarSign } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8">
      <div className="max-w-3xl text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent-cyan to-accent-magenta bg-clip-text text-transparent">
            Dexter
          </h1>
          <p className="text-xl text-muted">
            Autonomous Financial Research Agent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <ExampleCard
            icon={<TrendingUp className="text-primary" size={24} />}
            title="Revenue Analysis"
            example="What was Apple's revenue growth over the last 4 quarters?"
          />
          <ExampleCard
            icon={<Search className="text-accent-cyan" size={24} />}
            title="Market Research"
            example="Compare the market caps of Tesla, Ford, and GM"
          />
          <ExampleCard
            icon={<BarChart3 className="text-accent-magenta" size={24} />}
            title="Financial Metrics"
            example="Show me Microsoft's P/E ratio trend for the past year"
          />
          <ExampleCard
            icon={<DollarSign className="text-success" size={24} />}
            title="Earnings Reports"
            example="Summarize Amazon's latest earnings report"
          />
        </div>

        <p className="text-sm text-muted-light">
          Ask complex financial questions and get data-driven answers with real-time research
        </p>
      </div>
    </div>
  )
}

interface ExampleCardProps {
  icon: React.ReactNode
  title: string
  example: string
}

function ExampleCard({ icon, title, example }: ExampleCardProps) {
  return (
    <button className="flex items-start gap-4 p-4 rounded-lg bg-background-tertiary border border-border hover:border-primary/50 transition-all text-left group">
      <div className="mt-1 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold mb-1 text-sm">{title}</h3>
        <p className="text-sm text-muted">{example}</p>
      </div>
    </button>
  )
}
