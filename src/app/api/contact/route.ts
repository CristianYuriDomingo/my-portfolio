// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = 'dcristianyuri@gmail.com';

// Resend's sandbox domain (onboarding@resend.dev) can ONLY deliver to the
// email address tied to your own Resend account — it will 403 on any other
// recipient. That's why this route no longer tries to auto-reply to the
// visitor (see note below). Once you verify a real domain in Resend,
// update this to something like 'CYD <hello@yourdomain.com>'.
const FROM = 'CYD Portfolio <onboarding@resend.dev>';

// ── Schema ─────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(200).optional().default(''),
  message: z.string().min(1, 'Message is required').max(5000),
});

// ── Helpers ────────────────────────────────────────────────────────────────
// Visitor-supplied text goes straight into an HTML email below, so escape it
// first — otherwise a stray "<" or a pasted link renders as live HTML in
// your inbox instead of as plain text.
function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ── Email template ─────────────────────────────────────────────────────────
function ownerEmailHtml(data: z.infer<typeof contactSchema>) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const company = escapeHtml(data.company ?? '');
  const message = escapeHtml(data.message).replace(/\n/g, '<br/>');

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
          <td style="padding:16px 0;font-size:14px;line-height:1.7;">${message}</td>
        </tr>
      </table>
      <p style="margin-top:40px;font-size:11px;color:#bbb;">Sent via portfolio contact form</p>
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

    // Only the owner notification is sent. There's no reliable way to
    // auto-reply to the visitor yet — Resend's sandbox domain refuses to
    // deliver to anyone but your own account email. Add that send back in
    // once a real domain is verified in Resend.
    await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      html: ownerEmailHtml(parsed.data),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ['Failed to send message'] } },
      { status: 500 }
    );
  }
}
