import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Hardcoded constants to avoid build issues with imports outside api root
const PHONE = "721 055 441";
const EMAIL_DISPLAY = process.env.GMAIL_USER || "strechymohwald@gmail.com";
const WEB_URL = "https://martinmohwald.cz";

// Credentials from environment variables
const GMAIL_USER = process.env.GMAIL_USER || "";
const GMAIL_PASS = process.env.GMAIL_PASS || "";

// Sanitize user input to prevent XSS in email HTML
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.error('Missing GMAIL_USER or GMAIL_PASS environment variables');
    return response.status(500).json({ error: 'Server configuration error' });
  }

  const { name, phone, email, message } = request.body;

  if (!name || !phone || !email || !message) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  const safeName = escapeHtml(String(name));
  const safePhone = escapeHtml(String(phone));
  const safeEmail = escapeHtml(String(email));
  const safeMessage = escapeHtml(String(message));

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
  });

  const styles = `
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; color: #333; line-height: 1.6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
    .header { background: #121417; color: #c5a07e; padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 2px; }
    .content { padding: 30px; }
    .field { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
    .label { font-weight: bold; color: #c5a07e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 5px; }
    .value { font-size: 16px; color: #1a1c1e; }
    .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; }
    .button { display: inline-block; background: #c5a07e; color: #121417; padding: 12px 25px; text-decoration: none; font-weight: bold; text-transform: uppercase; border-radius: 4px; margin-top: 20px; }
    .accent { color: #c5a07e; }
  `;

  // Email to Owner
  const adminMailOptions = {
    from: GMAIL_USER,
    to: GMAIL_USER,
    replyTo: safeEmail,
    subject: `Nová poptávka z webu: ${safeName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${styles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Nová poptávka</h1>
          </div>
          <div class="content">
            <p style="margin-bottom: 20px;">Máte novou zprávu z kontaktního formuláře na webu.</p>
            
            <div class="field">
              <span class="label">Jméno</span>
              <div class="value">${safeName}</div>
            </div>
            
            <div class="field">
              <span class="label">Telefon</span>
              <div class="value"><a href="tel:${safePhone}" style="color: #1a1c1e; text-decoration: none;">${safePhone}</a></div>
            </div>
            
            <div class="field">
              <span class="label">Email</span>
              <div class="value"><a href="mailto:${safeEmail}" style="color: #1a1c1e; text-decoration: none;">${safeEmail}</a></div>
            </div>
            
            <div class="field" style="border: none;">
              <span class="label">Zpráva</span>
              <div class="value" style="white-space: pre-wrap;">${safeMessage}</div>
            </div>
          </div>
          <div class="footer">
            Toto je automaticky generovaný email z webu.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  // Email to Customer
  const customerMailOptions = {
    from: GMAIL_USER,
    to: safeEmail,
    subject: `Potvrzení přijetí poptávky - Martin Möhwald`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>${styles}</style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Potvrzení přijetí</h1>
          </div>
          <div class="content">
            <p>Dobrý den,</p>
            <p>děkuji za Váš zájem a poptávku. Váš formulář jsem v pořádku obdržel.</p>
            <p>Co nejdříve se Vám ozvu zpět (obvykle do 24 hodin), abychom probrali detaily Vašeho požadavku.</p>
            
            <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 3px solid #c5a07e;">
              <span class="label">Zpráva:</span>
              <p style="margin: 10px 0 0 0; font-style: italic;">"${safeMessage}"</p>
            </div>

            <p>Pokud jde o urgentní záležitost, neváhejte mě kontaktovat telefonicky.</p>
            
            <a href="tel:${PHONE.replace(/\s/g, '')}" class="button">Zavolat ${PHONE}</a>
          </div>
          <div class="footer">
            <strong>Martin Möhwald</strong> - Klempířské práce<br>
            <a href="mailto:${EMAIL_DISPLAY}" style="color: #888;">${EMAIL_DISPLAY}</a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);
    return response.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return response.status(500).json({ error: 'Failed to send email' });
  }
}
