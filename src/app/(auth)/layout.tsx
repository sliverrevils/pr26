import "@/styles/tailwind.css";
import "@/styles/globals.scss";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";

export default async function SignLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (session?.user) redirect("/user");
    return <AuthLayout>{children}</AuthLayout>;
}
