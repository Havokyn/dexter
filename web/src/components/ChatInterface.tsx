'use client'

import { useState, useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import EmptyState from './EmptyState'
import { Message } from '@/types'

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)

    // Simulate API call - in production, this would call the backend
    // TODO: Implement actual API integration with the Dexter agent
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'This is a demo response. To enable full functionality, connect the backend API.',
        timestamp: new Date(),
        tasks: [
          {
            id: '1',
            description: 'Planning research strategy',
            status: 'completed',
            subTasks: [
              {
                id: '1-1',
                description: 'Breaking down query into tasks',
                status: 'completed',
              },
              {
                id: '1-2',
                description: 'Identifying data sources',
                status: 'completed',
              },
            ],
          },
          {
            id: '2',
            description: 'Fetching financial data',
            status: 'running',
            subTasks: [
              {
                id: '2-1',
                description: 'Querying Financial Datasets API',
                status: 'running',
              },
            ],
          },
        ],
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <MessageList messages={messages} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-border bg-background-secondary">
        <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
      </div>
    </div>
  )
}
