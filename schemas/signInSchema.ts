import { z } from "zod";
import { signUpSchema } from "./signUpSchema";

export const signInSchema = z.object({
    email: signUpSchema.shape.email,
    password: signUpSchema.shape.password,
})


