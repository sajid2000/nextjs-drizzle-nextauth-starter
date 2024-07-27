import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.string().optional(),
    // db
    DATABASE_URL: z.string().url(),
    DB_AUTH_TOKEN: z.string(),
    // auth
    CONFIRMATION_TOKEN_SECRET: z.string(),
    CONFIRMATION_TOKEN_EXPIRES: z.coerce.number(),
    JWT_SALT: z.string(),
    JWT_SECRET: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_CALLBACK_URL: z.string(),
    // email
    SUPPORT_EMAIL_ADDRESS: z.string(),
    EMAIL_FROM_ADDRESS: z.string(),
    EMAIL_FROM_NAME: z.string(),
    EMAIL_HOST: z.string(),
    EMAIL_PORT: z.string(),
    EMAIL_USERNAME: z.string(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_ENCRYPTION: z.string(),
    RESEND_API_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_APP_NAME: z.string(),
    NEXT_PUBLIC_APP_TIMEZONE: z.string(),
    NEXT_PUBLIC_APP_LOCALE: z.string(),
    NEXT_PUBLIC_COMPANY_NAME: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_TIMEZONE: process.env.NEXT_PUBLIC_APP_TIMEZONE,
    NEXT_PUBLIC_APP_LOCALE: process.env.NEXT_PUBLIC_APP_LOCALE,
    NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME,
    // server
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DB_AUTH_TOKEN: process.env.DB_AUTH_TOKEN,
    CONFIRMATION_TOKEN_SECRET: process.env.CONFIRMATION_TOKEN_SECRET,
    CONFIRMATION_TOKEN_EXPIRES: process.env.CONFIRMATION_TOKEN_EXPIRES,
    JWT_SALT: process.env.JWT_SALT,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
    SUPPORT_EMAIL_ADDRESS: process.env.SUPPORT_EMAIL_ADDRESS,
    EMAIL_FROM_ADDRESS: process.env.EMAIL_FROM_ADDRESS,
    EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_ENCRYPTION: process.env.EMAIL_ENCRYPTION,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
});
