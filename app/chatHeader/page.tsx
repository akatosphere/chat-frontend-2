import ChatHeaderClient from "@/widgets/activeChatHeader/ui/chatHeaderClient";

export default function Page() {
  return (
    // Тест позиционирования, хедер позиционируется и адаптируется под размеры родителя
    <div className="md:ml-72">
      <div className="md:h-30">
      </div>
      <div className="relative h-screen bg-white md:w-3xl">
        <ChatHeaderClient />
      </div>
    </div>
  )
}
