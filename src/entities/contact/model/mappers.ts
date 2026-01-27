import { ChatMemberDto } from "@/entities/user/model/types";

import {
  AddByPhonePayload,
  Contact,
  ContactDto,
  ContactListResponse,
  ContactListResponseDto,
} from "./types";

export const mapContactDtoToContact = (dto: ContactDto): Contact => {
  const { system_contact } = dto;

  return {
    // Поля из UserPreview (через пересечение)
    uid: dto.uid,
    systemUid: system_contact.uid,
    username: "", // В контактах часто нет юзернейма на верхнем уровне
    nickname: "",
    firstName: dto.first_name,
    lastName: dto.last_name,
    fullName: `${dto.first_name} ${dto.last_name}`.trim(),
    avatarUrl: system_contact.avatar_url || system_contact.avatar_webp_url,

    // Специфичные поля контакта
    phone: dto.phone,
    isOnline: system_contact.is_online,
    lastSeenAt: system_contact.was_online_at,
  };
};

export const mapContactListResponse = (dto: ContactListResponseDto): ContactListResponse => ({
  count: dto.count,
  next: dto.next,
  results: dto.results.map(mapContactDtoToContact),
});

/**
 * Маппер: Преобразование участника чата (ChatMemberDto) в модель Контакта (Contact)
 * для отображения в карточке на странице контактов
 */
export const mapChatMemberToContact = (dto: ChatMemberDto): Contact => {
  return {
    // Поля UserPreview (база)
    uid: dto.uid,
    username: dto.username,
    nickname: dto.nickname || "",
    firstName: dto.first_name,
    lastName: dto.last_name,
    fullName: `${dto.first_name} ${dto.last_name}`.trim() || dto.username || "Без имени",

    // Приоритет выбора аватара (webp -> url -> сырой путь)
    avatarUrl: dto.avatar_webp_url || dto.avatar_url || dto.avatar || "",

    // Поля расширения Contact
    phone: dto.phone || "", // В участниках чата телефон может быть скрыт
    isOnline: dto.is_online,
    lastSeenAt: dto.was_online_at,

    // В контексте ChatMemberDto, системный UID совпадает с UID объекта
    systemUid: dto.uid,
  };
};

/**
 * Если на входе массив участников
 */
export const mapChatMembersToContacts = (dtos: ChatMemberDto[]): Contact[] => {
  return dtos.map(mapChatMemberToContact);
};

type MinimalUserForMapping = {
  firstName: string;
  lastName: string;
  phone?: string; // Опционально, если берем из Contact
};

export const mapToAddByPhonePayload = (
  user: MinimalUserForMapping,
  phoneOverride?: string,
): AddByPhonePayload => {
  return {
    // Приоритет: override -> телефон из объекта -> пустая строка
    phone: phoneOverride || user.phone || "",
    first_name: user.firstName,
    last_name: user.lastName,
  };
};
