// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'dcristianyuri@gmail.com';
const FROM = 'CYD Portfolio <onboarding@resend.dev>';

// ── Schema ─────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(200).optional().default(''),
  message: z.string().min(1, 'Message is required').max(5000),
});

// ── Email templates ────────────────────────────────────────────────────────
function ownerEmailHtml(data: z.infer<typeof contactSchema>) {
  const { name, email, company, message } = data;
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
      <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:32px;">
        New Inquiry — CYD Portfolio
      </p>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;width:100px;">From</td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;">Email</td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;"><a href="mailto:${email}" style="color:#111;">${email}</a></td>
        </tr>
        ${
          company
            ? `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;">Company</td>
          <td style="padding:12px 0;border-bottom:1px solid #eee;font-size:14px;">${company}</td>
        </tr>`
            : ''
        }
        <tr>
          <td style="padding:16px 0;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#999;vertical-align:top;">Message</td>
          <td style="padding:16px 0;font-size:14px;line-height:1.7;">${message.replace(/\n/g, '<br/>')}</td>
        </tr>
      </table>
      <p style="margin-top:40px;font-size:11px;color:#bbb;">Sent via cyd.dev contact form</p>
    </div>
  `;
}

function autoReplyHtml(name: string) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#111;">
      <p style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#999;margin-bottom:32px;">
        CYD Portfolio
      </p>
      <p style="font-size:20px;font-weight:700;margin-bottom:8px;">Hey ${name},</p>
      <p style="font-size:14px;line-height:1.8;color:#555;">
        Got your message — I'll get back to you within 24 hours.
      </p>
      <p style="font-size:14px;line-height:1.8;color:#555;margin-top:16px;">— CYD</p>
      <hr style="border:none;border-top:1px solid #eee;margin:40px 0;" />
      <p style="font-size:11px;color:#bbb;">Cristian Yuri Domingo · dcristianyuri@gmail.com</p>
    </div>
  `;
}

// ── Handler ────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email } = parsed.data;

    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: RECIPIENT,
        replyTo: email,
        subject: `New inquiry from ${name}`,
        html: ownerEmailHtml(parsed.data),
      }),
      resend.emails.send({
        from: FROM,
        to: email,
        subject: `Got your message, ${name}.`,
        html: autoReplyHtml(name),
      }),
    ]);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ['Failed to send message'] } },
      { status: 500 }
    );
  }
}
