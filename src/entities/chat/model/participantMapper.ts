import {
  ChatParticipant,
  ChatParticipantDto,
  ChatParticipantListResponse,
  ChatParticipantListResponseDto,
} from "./types";

/** Маппер одного участника */
export const mapChatParticipantDto = (dto: ChatParticipantDto): ChatParticipant => ({
  uid: dto.uid,
  firstName: dto.first_name,
  lastName: dto.last_name || "",
  fullName: `${dto.first_name} ${dto.last_name || ""}`.trim(),
  avatarUrl: dto.avatar_url || dto.avatar_webp_url || "",
  avatarWebpUrl: dto.avatar_webp_url || "",
  isDeleted: dto.is_deleted,
  isOwner: dto.is_owner,
  isBlocked: dto.is_blocked,
  isOnline: dto.is_online,
  wasOnlineAt: dto.was_online_at,
  isInContacts: dto.is_in_contacts,
});

/** Маппер пагинированного ответа */
export const mapChatParticipantListResponse = (
  dto: ChatParticipantListResponseDto,
): ChatParticipantListResponse => ({
  count: dto.count,
  next: dto.next,
  results: dto.results.map(mapChatParticipantDto),
});
