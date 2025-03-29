import { z } from "zod";

export const messageSchema = z.object({
    content: z.string().min(1,"content must be at least 1 character").max(200,"content must be less than 200 characters"),
})


