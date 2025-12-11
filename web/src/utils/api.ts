import { Message, Task } from '@/types'

export interface StreamEvent {
  type: 'task_update' | 'message' | 'error'
  task?: Task
  content?: string
  tasks?: Task[]
  error?: string
}

export async function sendMessage(
  message: string,
  model: string,
  onUpdate: (event: StreamEvent) => void
): Promise<void> {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      model,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send message')
  }

  const reader = response.body?.getReader()
  const decoder = new TextDecoder()

  if (!reader) {
    throw new Error('No response body')
  }

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = decoder.decode(value)
    const lines = chunk.split('\n')

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6)
        try {
          const event = JSON.parse(data) as StreamEvent
          onUpdate(event)
        } catch (e) {
          console.error('Failed to parse event:', e)
        }
      }
    }
  }
}
