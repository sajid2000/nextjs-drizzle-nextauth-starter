import config from "@/config";
import { ResetPasswordEmail } from "@/emails/reset-password";
import { VerifyEmail } from "@/emails/verify-email";
import { sendEmail } from "@/lib/email";
import { ApplicationError } from "@/lib/errors";
import { generateRandomToken } from "@/lib/utils";
import {
  deletePasswordResetToken,
  deleteVerifyToken,
  getPasswordResetTokenByEmail,
  getVerifyTokenByEmail,
  insertPasswordResetToken,
  insertVerifyToken,
} from "@/repositories/tokens";

const TOKEN_LENGTH = 32;
const TOKEN_TTL = 1000 * 60 * 1; // 1 min

export async function sendPasswordResetTokenEmail(email: string) {
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    if (existingToken.expiresAt >= new Date()) {
      throw new ApplicationError("Email already sent. Try after a few minutes");
    }

    await deletePasswordResetToken(email);
  }

  // if token not exists or expires, send new verify link
  const token = await generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_TTL);
  console.log(token);

  await insertPasswordResetToken({ email, token, expiresAt });

  await sendEmail(email, `Your password reset link for ${config.appName}`, ResetPasswordEmail({ token }));
}

export async function sendVerifyEmail(email: string) {
  const existingToken = await getVerifyTokenByEmail(email);

  if (existingToken) {
    console.log((new Date(existingToken.expires).getTime() - Date.now()) / 1000);
    if (existingToken.expires >= new Date()) {
      throw new ApplicationError("Email already sent. Try after a few minutes");
    }

    await deleteVerifyToken(email);
  }

  // if token not exists or expires, send new verify link
  const token = await generateRandomToken(TOKEN_LENGTH);
  const expiresAt = new Date(Date.now() + TOKEN_TTL);
  console.log(token);

  await insertVerifyToken({ email, token, expiresAt });

  await sendEmail(email, `Verify your email for ${config.appName}`, VerifyEmail({ token }));
}
