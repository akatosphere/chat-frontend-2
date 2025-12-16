import { ChatFooter } from '@/widgets/chat/chatFooter/ui/chatFooter'
import { notFound } from 'next/navigation'

interface ChatPageProps {
  params: Promise<{ chatId: string }>
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params

  if (!chatId) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-1 overflow-y-auto">{/* messages */}</main>

      <ChatFooter />
    </div>
  )
}
