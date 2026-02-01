import "@/styles/tailwind.css";
import "@/styles/globals.scss";

import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import ProfileLayoyt from "@/layouts/ProfileLayout/ProfileLayout";

export default async function UserLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <ProfileLayoyt>{children}</ProfileLayoyt>;
}
