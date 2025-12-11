# Dexter Web Interface

A modern, responsive web interface for Dexter - the autonomous financial research agent powered by Claude AI.

## Features

- 🎨 **Modern UI**: Clean, GitHub-inspired dark theme with smooth animations
- 💬 **Chat Interface**: Intuitive conversation-based interface for financial research
- 📊 **Real-time Task Tracking**: Visual progress indicators for research tasks and subtasks
- 🤖 **Multi-Model Support**: Switch between GPT-4.1, Claude Sonnet 4.5, and Gemini 3
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- ⚡ **Streaming Responses**: Real-time answer streaming with cursor animation
- 🎯 **Task Visualization**: Hierarchical display of research tasks with status indicators

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **UI Library**: React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: React Markdown with GitHub Flavored Markdown support
- **TypeScript**: Full type safety throughout the application

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- The main Dexter backend running (see root README)

### Installation

1. Navigate to the web directory:

```bash
cd web
```

2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Create environment variables (optional):

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
web/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   │   ├── chat/         # Chat endpoint (streaming)
│   │   │   └── models/       # Models list endpoint
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/            # React components
│   │   ├── ChatInterface.tsx # Main chat component
│   │   ├── ChatInput.tsx     # Message input
│   │   ├── MessageList.tsx   # Message container
│   │   ├── MessageBubble.tsx # Individual message
│   │   ├── TaskProgress.tsx  # Task visualization
│   │   ├── ModelSelector.tsx # Model switcher
│   │   ├── Header.tsx        # Top navigation
│   │   ├── Sidebar.tsx       # Left sidebar
│   │   └── EmptyState.tsx    # Welcome screen
│   ├── types/                 # TypeScript definitions
│   │   └── index.ts          # Shared types
│   └── utils/                 # Utility functions
│       ├── api.ts            # API client
│       └── cn.ts             # Classname merger
├── public/                    # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

## Key Components

### ChatInterface

The main container component that manages:
- Message state and history
- Processing state
- Message sending and receiving
- Scrolling behavior

### MessageBubble

Displays individual messages with:
- User/Assistant avatars
- Markdown rendering
- Task progress visualization
- Streaming indicators
- Timestamps

### TaskProgress

Visualizes research tasks with:
- Status indicators (pending, running, completed, failed)
- Hierarchical subtask display
- Real-time updates
- Smooth animations

### ModelSelector

Allows switching between AI models:
- GPT-4.1 (OpenAI)
- Claude Sonnet 4.5 (Anthropic)
- Gemini 3 Thinking (Google)

## API Integration

### Current State

The web interface currently uses mock data for demonstration. To enable full functionality:

1. **Backend Integration**: Connect to the Dexter agent backend
2. **WebSocket Support**: Implement real-time task updates
3. **Streaming**: Add proper SSE/WebSocket streaming from the agent

### API Routes

- `POST /api/chat`: Send a message and receive streaming responses
- `GET /api/models`: Get available AI models

### Connecting to Backend

To integrate with the Dexter backend, update `/src/app/api/chat/route.ts`:

```typescript
// Replace the mock implementation with actual agent integration
import { executeAgent } from '@/agent/agent' // Assuming backend is accessible

export async function POST(req: NextRequest) {
  const { message, model } = await req.json()

  // Execute agent and stream results
  const stream = executeAgent(message, model)

  // Stream task updates and responses back to client
  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
```

## Styling & Theming

The design system uses a GitHub-inspired dark theme with custom colors defined in `tailwind.config.ts`:

- **Primary**: #58A6FF (GitHub blue)
- **Success**: #3fb950 (Green)
- **Error**: #f85149 (Red)
- **Accent Cyan**: #39c5cf
- **Accent Magenta**: #bc4de0
- **Backgrounds**: Dark shades (#0d1117, #161b22, #1c2128)

## Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler
```

### Adding New Components

1. Create component in `src/components/`
2. Export from the component file
3. Import and use in pages or other components

### Modifying Theme

Edit `tailwind.config.ts` to customize colors, spacing, and other design tokens.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Docker

```bash
docker build -t dexter-web .
docker run -p 3000:3000 dexter-web
```

### Static Export

For static hosting (note: API routes won't work):

```bash
npm run build
npm run export
```

## Roadmap

- [ ] Full backend integration with Dexter agent
- [ ] WebSocket support for real-time updates
- [ ] Session history and persistence
- [ ] User authentication
- [ ] Share research results
- [ ] Export to PDF/CSV
- [ ] Dark/Light theme toggle
- [ ] Keyboard shortcuts
- [ ] Mobile app (React Native)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

Same as the main Dexter project.

## Support

For issues and questions, please open an issue on the main Dexter repository.
