import twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, name } = await req.json();

    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

    await client.messages.create({
      body: `Hello ${name}, your registration was successful!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    return NextResponse.json({ message: "SMS sent successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error sending SMS" }, { status: 500 });
  }
}
