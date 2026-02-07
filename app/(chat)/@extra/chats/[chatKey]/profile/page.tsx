import { AnothersProfileClient } from "@/widgets/anothersProfile/ui/anothersProfileClient";

type ProfilePageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { chatKey } = await params;
  return <AnothersProfileClient chatKey={chatKey} />;
}
