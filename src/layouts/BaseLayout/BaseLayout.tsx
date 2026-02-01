import Footer from "@/components/base/Footer/Footer";
import Header from "@/components/base/Header/Header";
import { auth } from "@/config/auth";
import { UserModel } from "@/mongo/models/userModel";
import { getCurrentUser } from "@/services/userService";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

import { PropsWithChildren, Suspense } from "react";

export default async function BaseLayout({ children }: PropsWithChildren) {
    const user = await getCurrentUser();

    return (
        <div className="flex flex-col  flex-1 w-screen  ">
            <Header user={user} />

            <main className="flex justify-center w-full shrink grow basis-0 self-center">
                {children}
            </main>
            <Footer />
        </div>
    );
}
