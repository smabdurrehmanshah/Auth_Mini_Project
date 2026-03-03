import { z } from "zod";

const usernameValidation = z
  .string()
  .trim()
  .min(3, { message: "Username must be atleast 3 characters long!" })
  .max(15, { message: "Username must be no more than 15 characters" });

const emailValidation = z
  .email({ message: "Please enter a valid email address." })
  .trim()
  .max(30, { messae: "Email must be no more than 30 characters long" });

const passwordValidation = z
  .string()
  .trim()
  .min(6, { message: "Password must be atleast 6 characters long." })
  .max(15, { message: "Password must be no more than 15 characters." })
  .regex(/[0-9]/, { message: "Password must contain atleast one number." })
  .regex(/[A-Z]/, {
    message: "Password must include atleast one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must include atleast one lowercase letter.",
  });

export const userRegistrationSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

export const userLoginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
