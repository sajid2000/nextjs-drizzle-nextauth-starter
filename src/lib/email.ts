import { ReactNode } from "react";
import { Resend } from "resend";

import { env } from "@/env";

// const resend = new Resend(env.RESEND_API_KEY);

const resend = {
  emails: {
    send: ({}: any): { error: any } => {
      return { error: null };
    },
  },
};

export async function sendEmail(email: string, subject: string, body: ReactNode) {
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM_ADDRESS,
    to: email,
    subject,
    react: body,
  });

  if (error) {
    throw error;
  }
}
