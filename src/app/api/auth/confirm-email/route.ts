import { connectDB } from "@/mongo/connect";
import { UserModel } from "@/mongo/models/userModel";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sign-in?verification=error`);
    }

    const user = await UserModel.findOne({ emailConfirmationToken: token });

    if (!user) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sign-in?verification=error`);
    }

    user.emailConfirmed = true;
    user.emailConfirmationToken = undefined;

    await user.save();

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/sign-in?verification=success`);
}
