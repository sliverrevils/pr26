import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { connectDB } from "@/mongo/connect";
import ErrorLayout from "@/layouts/ErrorLayout/ErrorLayout";
import BaseLayout from "@/layouts/BaseLayout/BaseLayout";
import { ToastContainer } from "react-toastify";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "next-auth/react";

import "@/styles/tailwind.css";
import "@/styles/globals.scss";
import "react-circular-progressbar/dist/styles.css";

const nunitoFont = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Performstars",
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
                    <SessionProvider>
                        <BaseLayout>{children}</BaseLayout>
                    </SessionProvider>
                </NuqsAdapter>
            </body>
        </html>
    );
}
