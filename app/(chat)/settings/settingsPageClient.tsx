import { SettingsMenu } from "@/entities/settings/settingsMenu/ui/settingsMenu";
import { getProfileServer } from "@/entities/user/api/getProfileServer";

import { UserProfile } from "../../../src/widgets/userProfile/userProfile";

export const SettingsPageClient: React.FC = async () => {
  const res = await getProfileServer();

  if (!res.success || !res.data) {
    return <div>Ошибка загрузки или профиль не найден</div>;
  }

  const data = res.data;

  return (
    <div className="flex h-full flex-col">
      <UserProfile
        avatarUrl={data.avatar_url}
        name={`${data.first_name} ${data.last_name}`}
        phone={data.phone}
        tag={data.nickname}
        className="mb-4"
      />
      <SettingsMenu uid={data.uid} />
    </div>
  );
};
