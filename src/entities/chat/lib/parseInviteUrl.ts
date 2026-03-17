type InviteUrlData = {
  chatKey: string;
  token: string;
  isPrivate: boolean;
};

export const INVITE_PUBLIC_URL_REGEX =
  /(?:https?:\/\/[^/\s]+)?\/chats\/((?:group|channel)_[a-f0-9-]+)\?token=([^\s&]+)/;

export const INVITE_PRIVATE_URL_REGEX =
  /(?:https?:\/\/[^/\s]+)?\/chats\/join\/((?:group|channel)_[a-f0-9-]+)\?token=([^\s&]+)/;

export const parseInviteUrl = (text: string): InviteUrlData | null => {
  const matchPublic = text.match(INVITE_PUBLIC_URL_REGEX);
  const matchPrivate = text.match(INVITE_PRIVATE_URL_REGEX);

  if (matchPublic) {
    return {
      chatKey: matchPublic[1],
      token: matchPublic[2],
      isPrivate: false,
    };
  }
  if (matchPrivate) {
    return {
      chatKey: matchPrivate[1],
      token: matchPrivate[2],
      isPrivate: true,
    };
  }
  return null;
};
