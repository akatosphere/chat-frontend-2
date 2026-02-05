import { AnothersProfile } from "@/widgets/anothersProfile/ui/anothersProfile";

type ProfilePageProps = {
  params: Promise<{ chatKey: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { chatKey } = await params;
  return <AnothersProfile chatKey={chatKey} />;
}
