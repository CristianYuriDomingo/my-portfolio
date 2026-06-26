import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(200).optional().default(''),
  message: z.string().min(1, 'Message is required').max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return Response.json({ ok: false, errors }, { status: 400 });
    }

    const { name, email, company, message } = parsed.data;

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'dcristianyuri@gmail.com',
      subject: `Portfolio inquiry from ${name}`,
      text: [
        `From: ${name} (${email})`,
        company ? `Company: ${company}` : '',
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json(
      { ok: false, errors: { _form: ['Failed to send message'] } },
      { status: 500 }
    );
  }
}
