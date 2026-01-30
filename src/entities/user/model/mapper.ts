import { ChatMember, ChatMemberDto, User, UserDto, UserPreview, UserPreviewDto } from "./types";

/**
 * Внутренний маппер для общих полей
 */
export const mapUserPreviewDto = (dto: UserPreviewDto): UserPreview => ({
  uid: dto.uid,
  username: dto.username,
  nickname: dto.nickname,
  firstName: dto.first_name,
  lastName: dto.last_name || "",
  fullName: `${dto.first_name} ${dto.last_name}`.trim() || dto.username,
  avatarUrl: dto.avatar_url || dto.avatar_webp_url || "",
});

/**
 * Маппер для ChatMemberDto (списки участников/контакты)
 */
export const mapChatMember = (dto: ChatMemberDto): ChatMember => {
  return {
    ...mapUserPreviewDto(dto),
    isBlocked: dto.is_blocked,
    isOnline: dto.is_online,
    lastSeenAt: dto.was_online_at,
    isInContacts: dto.is_in_contacts,
    chatId: dto.chat_id ?? null,
    bio: dto.additional_information ?? "",
  };
};

/**
 * Маппер для UserDto (полный профиль)
 */
export const mapUser = (dto: UserDto): User => {
  return {
    ...mapUserPreviewDto(dto),
    bio: dto.additional_information,
    birthday: dto.birthday,
    email: dto.email,
    gender: dto.gender,
    phone: dto.phone,
    isFilled: dto.is_filled,
    isDoctor: dto.is_doctor,
  };
};
