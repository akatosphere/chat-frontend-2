import { SettingsMenu } from "@/entities/settings/settingsMenu/ui/settingsMenu";
import { getProfileServer } from "@/entities/user/api/getProfileServer";
import { UserProfile } from "@/widgets/userProfile/userProfile";

export const SettingsPageClient: React.FC = async () => {
  const res = await getProfileServer();

  if (!res.success || !res.data) {
    return <div className="p-4">Ошибка загрузки или профиль не найден</div>;
  }

  const user = res.data;

  return (
    <div className="flex h-full flex-col">
      <UserProfile
        avatarUrl={user.avatarUrl}
        name={user.fullName}
        phone={user.phone}
        tag={user.nickname}
        className="mb-4"
      />
      <SettingsMenu uid={user.uid} />
    </div>
  );
};
