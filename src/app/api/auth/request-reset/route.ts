import { NextResponse } from "next/server";

import crypto from "crypto";
import { connectDB } from "@/mongo/connect";
import { UserModel } from "@/mongo/models/userModel";
import { sendMail } from "@/libs/email";

export async function POST(req: Request) {
    await connectDB();

    const { email } = await req.json();

    const user = await UserModel.findOne({ email });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.emailConfirmationToken = crypto.randomUUID();
    await user.save();

    await sendMail({
        to: user.email,
        subject: "Performstars : Reset your password",
        html: `
      <p>Hello ${user.name},</p>
      <p>Click the link below to reset your password:</p>
      <a href="${process.env.NEXTAUTH_URL}/reset-password/confirm?token=${user.emailConfirmationToken}">
        Reset Password
      </a>
    `,
    });

    return NextResponse.json({ ok: true });
}
