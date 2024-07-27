import bcrypt from "bcryptjs";

import { LoginPayload } from "@/app/(auth)/sign-in/validators";
import { RegisterPayload } from "@/app/(auth)/sign-up/validators";
import { ApplicationError, TokenExpiredError, ValidationError } from "@/lib/errors";
import { deletePasswordResetToken, deleteVerifyToken, getPasswordResetToken, getVerifyToken } from "@/repositories/tokens";
import { createUser, getUserByEmail, updateUserByEmail } from "@/repositories/users";

import { sendPasswordResetTokenEmail, sendVerifyEmail } from "./tokenService";

export async function login(payload: LoginPayload) {
  const { email, password } = payload;

  const user = await getUserByEmail(email);

  if (!user || !user.email || !user.password) {
    throw new ValidationError({ email: ["Email does not exist!"] });
  }

  if (!user.emailVerified) {
    await sendVerifyEmail(email);

    return { success: true, message: "Confirmation email sent!" } as const;
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new ApplicationError("Invalid credentials!");
  }

  return user;
}

export async function signUpUser({ name, email, password }: RegisterPayload) {
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (existingUser.emailVerified) {
      throw new ValidationError({ email: ["Email is already taken"] });
    }

    await sendVerifyEmail(email);

    return { success: true, message: "Confirmation email sent!" } as const;
  }

  const user = await createUser({ email, name, password: bcrypt.hashSync(password, 10) });

  await sendVerifyEmail(email);

  return user;
}

export async function verifyEmail(token: string) {
  const tokenEntry = await getVerifyToken(token);

  if (!tokenEntry || tokenEntry.expires <= new Date()) {
    throw new TokenExpiredError();
  }

  await updateUserByEmail(tokenEntry.identifier, { emailVerified: new Date() });

  await deleteVerifyToken(tokenEntry.identifier);
}

export async function forgotPassword(email: string) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new ValidationError({ email: ["Not exists!"] });
  }

  await sendPasswordResetTokenEmail(email);
}

export async function changePassword({ token, password }: { token: string; password: string }) {
  const tokenEntry = await getPasswordResetToken(token);

  if (!tokenEntry || tokenEntry.expiresAt <= new Date()) {
    throw new TokenExpiredError();
  }

  await updateUserByEmail(tokenEntry.email, { password: bcrypt.hashSync(password, 10) });

  await deletePasswordResetToken(tokenEntry.email);
}
