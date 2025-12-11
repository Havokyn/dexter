'use client'

import { Message } from '@/types'
import { User, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import TaskProgress from './TaskProgress'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
        isUser ? 'bg-primary' : 'bg-accent-cyan'
      }`}>
        {isUser ? <User size={20} /> : <Bot size={20} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className={`rounded-lg p-4 ${
          isUser
            ? 'bg-primary/10 border border-primary/30'
            : 'bg-background-secondary border border-border'
        }`}>
          <div className="markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>

          {message.isStreaming && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
          )}
        </div>

        {message.tasks && message.tasks.length > 0 && (
          <div className="mt-3">
            <TaskProgress tasks={message.tasks} />
          </div>
        )}

        <div className="mt-2 text-xs text-muted">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  )
}
