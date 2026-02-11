import { hashPassword } from "@/helpers/passwordHelper";
import { connectDB } from "@/mongo/connect";
import { UserModel } from "@/mongo/models/userModel";
import { NextResponse } from "next/server";
import { Binary } from "mongodb";

export async function POST(req: Request) {
    await connectDB();

    const { token, password } = await req.json();

    const user = await UserModel.findOne({ emailConfirmationToken: token });

    if (!user) {
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.password = (await hashPassword(password)) as any as Binary;
    user.emailConfirmationToken = undefined;
    user.emailConfirmed = true;

    await user.save();

    return NextResponse.json({ ok: true });
}
