import { z } from "zod";

import { formSchema } from "./schema";

export type CreateGroupFormValues = z.infer<typeof formSchema>;
