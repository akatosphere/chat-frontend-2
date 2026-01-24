import { User, UserDto } from "./types";

export const mapUserDtoToUser = (dto: UserDto): User => {
  return {
    uid: dto.uid,
    username: dto.username,
    nickname: dto.nickname,
    firstName: dto.first_name,
    lastName: dto.last_name,
    patronymic: dto.patronymic,
    fullName: `${dto.first_name} ${dto.last_name}`.trim() || dto.username,
    bio: dto.additional_information,
    birthday: dto.birthday,
    email: dto.email,
    gender: dto.gender,
    phone: dto.phone,
    avatarUrl: dto.avatar_url || dto.avatar_webp_url,
    isFilled: dto.is_filled,
    isDoctor: dto.is_doctor,
    hasAvatar: Boolean(dto.avatar_url),
  };
};
