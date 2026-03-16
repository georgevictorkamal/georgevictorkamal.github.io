import nodemailer from 'nodemailer';
import { ENV } from './env';



const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || '587'),
  user: process.env.SMTP_USER || '',
  pass: process.env.SMTP_PASS || '',
  contactEmail: process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'georgevictorkamal@gmail.com',
};

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!SMTP_CONFIG.user || !SMTP_CONFIG.pass) {
    console.warn('[Email] SMTP credentials not configured. Set SMTP_USER and SMTP_PASS environment variables.');
    return null;
  }

  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: SMTP_CONFIG.host,
      port: SMTP_CONFIG.port,
      secure: SMTP_CONFIG.port === 465,
      auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
      },
    });
  }

  return _transporter;
}

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}


export async function sendContactEmail(data: ContactEmailData): Promise<boolean> {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn('[Email] Skipping email: SMTP not configured.');
    return false;
  }

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
      <div style="background: linear-gradient(135deg, #6366f1, #818cf8); padding: 24px 30px; border-radius: 16px 16px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">📬 New Portfolio Contact</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 13px;">Someone reached out via your portfolio website</p>
      </div>
      <div style="background: white; padding: 28px 30px; border-radius: 0 0 16px 16px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: 600; vertical-align: top; width: 80px;">From</td>
            <td style="padding: 10px 0; font-size: 14px; color: #111827;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: 600; vertical-align: top;">Email</td>
            <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${data.email}" style="color: #6366f1; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 13px; font-weight: 600; vertical-align: top;">Subject</td>
            <td style="padding: 10px 0; font-size: 14px; color: #111827; font-weight: 500;">${data.subject}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
        <div style="background: #f9fafb; padding: 16px; border-radius: 10px; border: 1px solid #e5e7eb;">
          <p style="margin: 0 0 6px; color: #6b7280; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
          <p style="margin: 0; font-size: 14px; color: #374151; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}" style="display: inline-block; background: #6366f1; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 600;">Reply to ${data.name}</a>
        </div>
      </div>
      <p style="text-align: center; color: #9ca3af; font-size: 11px; margin-top: 16px;">Sent from your Portfolio Website</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_CONFIG.user}>`,
      to: SMTP_CONFIG.contactEmail,
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject} — from ${data.name}`,
      html: htmlBody,
      text: `New contact from ${data.name} (${data.email})\n\nSubject: ${data.subject}\n\n${data.message}`,
    });

    console.log(`[Email] ✅ Contact notification sent to ${SMTP_CONFIG.contactEmail}`);
    return true;
  } catch (error) {
    console.error('[Email] ❌ Failed to send:', error);
    return false;
  }
}
