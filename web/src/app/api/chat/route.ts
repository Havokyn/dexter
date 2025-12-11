import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

interface ChatRequest {
  message: string
  model: string
  conversationHistory?: Array<{
    role: string
    content: string
  }>
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ChatRequest
    const { message, model, conversationHistory = [] } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // TODO: Integrate with the Dexter agent backend
    // This is a placeholder that returns a streaming response
    // In production, this should:
    // 1. Forward the request to the Dexter agent
    // 2. Stream back task updates and responses
    // 3. Handle WebSocket connections for real-time updates

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        // Simulate streaming response
        const mockResponse = {
          type: 'task_update',
          task: {
            id: '1',
            description: 'Processing your request',
            status: 'running',
          },
        }

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(mockResponse)}\n\n`)
        )

        // Simulate final response
        setTimeout(() => {
          const finalResponse = {
            type: 'message',
            content: 'This is a demo response. To enable full functionality, please connect the Dexter agent backend.',
            tasks: [
              {
                id: '1',
                description: 'Processed request',
                status: 'completed',
              },
            ],
          }

          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(finalResponse)}\n\n`)
          )
          controller.close()
        }, 1000)
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
