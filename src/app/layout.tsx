import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/styles/tailwind.css";
import "@/styles/globals.scss";
import { connectDB } from "@/mongo/connect";
import ErrorLayout from "@/layouts/ErrorLayout/ErrorLayout";
import BaseLayout from "@/layouts/BaseLayout/BaseLayout";
import { ToastContainer } from "react-toastify";
import { auth } from "@/config/auth";
import { headers } from "next/headers";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const nunitoFont = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "performstars",
    description: "performstars",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const dbConRes = await connectDB();
    if (!dbConRes) return <ErrorLayout error={"DB CONNECT ERROR"} />;

    return (
        <html lang="en">
            <body
                className={`${nunitoFont.className} flex justify-center bg-f-gray-1 overflow-x-hidden`}
            >
                <ToastContainer closeButton />
                <NuqsAdapter>
                    <BaseLayout>{children}</BaseLayout>
                </NuqsAdapter>
            </body>
        </html>
    );
}
