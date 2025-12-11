'use client'

import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { AVAILABLE_MODELS, ModelConfig } from '@/types'

interface ModelSelectorProps {
  selectedModel: ModelConfig
  onSelectModel: (model: ModelConfig) => void
}

export default function ModelSelector({ selectedModel, onSelectModel }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-background-tertiary hover:bg-background-primary border border-border rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getProviderColor(selectedModel.provider)}`} />
          <span className="font-medium">{selectedModel.displayName}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-80 bg-background-secondary border border-border rounded-lg shadow-xl z-20 overflow-hidden"
            >
              {AVAILABLE_MODELS.map((model) => (
                <button
                  key={model.modelName}
                  onClick={() => {
                    onSelectModel(model)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-start gap-3 px-4 py-3 hover:bg-background-tertiary transition-colors text-left"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${getProviderColor(model.provider)}`} />
                  <div className="flex-1">
                    <div className="font-medium">{model.displayName}</div>
                    <div className="text-sm text-muted mt-0.5">{model.description}</div>
                  </div>
                  {selectedModel.modelName === model.modelName && (
                    <Check size={18} className="text-primary flex-shrink-0 mt-1" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function getProviderColor(provider: string): string {
  switch (provider) {
    case 'openai':
      return 'bg-success'
    case 'anthropic':
      return 'bg-primary'
    case 'google':
      return 'bg-accent-cyan'
    default:
      return 'bg-muted'
  }
}
