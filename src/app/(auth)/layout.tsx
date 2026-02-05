import "@/styles/tailwind.css";
import "@/styles/globals.scss";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import { auth } from "@/config/auth";
import { redirect } from "next/navigation";
import { PATHES } from "@/config/pathes";

export default async function SignLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    if (session?.user) redirect(PATHES.profile.path);
    return <AuthLayout>{children}</AuthLayout>;
}
