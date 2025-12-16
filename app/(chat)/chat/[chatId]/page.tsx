import { ChatFooter } from '@/widgets/chat/chatFooter/ui/chatFooter'
import { notFound } from 'next/navigation'

interface ChatPageProps {
  params: Promise<{ chatId: string }>
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatId } = await params

  // Заглушка проверки
  if (!chatId) {
    notFound()
  }

  return (
    <div className="flex flex-col h-svh">

      <ChatFooter />
    </div>
  )
}
