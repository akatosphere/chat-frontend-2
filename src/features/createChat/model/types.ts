import { z } from "zod";

import { formSchema } from "./schema";

export type ChatType = "private-group" | "public-group" | "private-channel" | "public-channel";

export type CreateChatFormValues = z.infer<typeof formSchema>;
