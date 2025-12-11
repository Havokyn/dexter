'use client'

import { useState, KeyboardEvent } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSendMessage, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-4">
      <div className="flex items-end gap-3 bg-background-tertiary rounded-lg border border-border focus-within:border-primary transition-colors p-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a financial research question..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none placeholder:text-muted disabled:opacity-50 min-h-[24px] max-h-[200px]"
          style={{
            height: 'auto',
            overflowY: input.split('\n').length > 5 ? 'scroll' : 'hidden'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement
            target.style.height = 'auto'
            target.style.height = target.scrollHeight + 'px'
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="p-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex-shrink-0"
          aria-label="Send message"
        >
          {disabled ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>

      <div className="mt-2 text-xs text-muted text-center">
        Press Enter to send • Shift+Enter for new line
      </div>
    </div>
  )
}
