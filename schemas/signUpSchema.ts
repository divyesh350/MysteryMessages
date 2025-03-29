import { z } from "zod";

export const usernameValidation = z.string().min(2,"Username must be at least 2 characters").max(20,"Username must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/,"Username must contain only letters, numbers and underscores");


export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Please use a valid email address"}),
    password: z.string().min(6,"Password must be at least 6 characters").max(20,"Password must be less than 20 characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"}),
})


