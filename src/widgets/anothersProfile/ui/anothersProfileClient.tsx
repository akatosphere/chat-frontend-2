import { getUserByUIDServer } from "@/entities/user/api/getUserByUIDServer";

import { AnothersProfile } from "./anothersProfile";

type AnothersProfileClientProps = {
  chatKey: string;
};

export const AnothersProfileClient: React.FC<AnothersProfileClientProps> = async ({ chatKey }) => {
  let data = null;
  const response = await getUserByUIDServer(chatKey);
  if (response.success) {
    data = response.data;
  }
  return <AnothersProfile chatKey={chatKey} initialData={data} />;
};
