// Типизация для конкретного чата (на основе вашего JSON)
export type ChatObject = {
  chat_id: string;
  chat_key: string;
  name: string;
  description: string;
  chat_type: string;
  created_by: string;
  owner_full_name: string;
  avatar: {
    filename: string;
    url: string;
  } | null;
  added_users: Array<{
    uid: string;
    full_name: string;
  }>;
};
