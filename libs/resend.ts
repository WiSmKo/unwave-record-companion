import { Resend } from 'resend';
import config from '@/config';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, text: string, html: string, replyTo?: string): Promise<void> => {
  await resend.emails.send({
    from: config.mailgun.fromAdmin,
    to,
    reply_to: replyTo,
    subject,
    text,
    html,
  });
};