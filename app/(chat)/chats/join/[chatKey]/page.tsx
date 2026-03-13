import { getGroupChannelServer } from "@/entities/chat/api/getGroupChannelServer";

type PageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function Page({ params }: PageProps) {
  const { chatKey } = await params;
  const response = await getGroupChannelServer(chatKey);
  if (response.success) {
    const isPrivate =
      response.data.type == "private-channel" || response.data.type == "private-group";
    if (isPrivate) {
      return (
        <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
          Приватный чат
        </div>
      );
    } else {
      return (
        <div className="desktop:flex text-gray hidden h-full w-full items-center justify-center">
          Публичный чат
        </div>
      );
    }
  } else {
    return (
      <div className="desktop:flex text-error hidden h-full w-full items-center justify-center">
        Ошибка загрузки чата
      </div>
    );
  }
}
