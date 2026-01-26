export interface ContactUser {
  uid: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  avatar_webp_url?: string;
  is_online: boolean;
  was_online_at?: number;
  username?: string;
  nickname?: string | null;
  is_in_contacts?: boolean;
}

export interface ContactItem {
  id: number;
  user: ContactUser;
  is_favorite: boolean;
  last_seen_at: number;
  status_text?: string;
}
