export type MessageRole = 'user' | 'assistant' | 'system'

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed'

export interface SubTask {
  id: string
  description: string
  status: TaskStatus
  result?: string
  error?: string
}

export interface Task {
  id: string
  description: string
  status: TaskStatus
  subTasks?: SubTask[]
  result?: string
  error?: string
}

export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  tasks?: Task[]
  isStreaming?: boolean
}

export interface ConversationTurn {
  id: string
  userQuery: string
  assistantResponse: string
  tasks: Task[]
  timestamp: Date
}

export type ModelProvider = 'openai' | 'anthropic' | 'google'

export interface ModelConfig {
  provider: ModelProvider
  modelName: string
  displayName: string
  description: string
}

export const AVAILABLE_MODELS: ModelConfig[] = [
  {
    provider: 'openai',
    modelName: 'gpt-4.1-preview',
    displayName: 'GPT-4.1',
    description: 'Latest OpenAI model with enhanced reasoning',
  },
  {
    provider: 'anthropic',
    modelName: 'claude-sonnet-4.5-20250929',
    displayName: 'Claude Sonnet 4.5',
    description: 'Anthropic\'s most capable model',
  },
  {
    provider: 'google',
    modelName: 'gemini-3-thinking-experimental',
    displayName: 'Gemini 3 Thinking',
    description: 'Google\'s experimental reasoning model',
  },
]
