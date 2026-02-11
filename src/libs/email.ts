"use server";
import { logDev } from "@/helpers/testHelpers";
import nodemailer from "nodemailer";

//await sendMail({ to: "user@example.com", subject: "Hello", html: "<b>Test message</b>" });

export async function sendMail({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) {
    const transporter = nodemailer.createTransport(process.env.MAIL_URL as string);
    transporter.verify().then(() => logDev("SMTP OK"));

    await transporter.sendMail({
        from: "system@performstars.com",
        to,
        subject,
        html,
    });
}
