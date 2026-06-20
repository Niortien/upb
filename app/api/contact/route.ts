import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Téléphone requis"),
  subject: z.string().min(1, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const res = await fetch("https://formsubmit.co/ajax/infos@upb.ci", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: `[UPB Contact] ${data.subject}`,
        message: data.message,
        _subject: `Nouveau message UPB — ${data.subject}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Échec d'envoi" }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      const first = err.issues[0];
      return NextResponse.json({ error: first?.message ?? "Validation échouée" }, { status: 400 });
    }
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
