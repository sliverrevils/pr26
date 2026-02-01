"use client";
import { PATHES } from "@/config/pathes";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
    const isLogin = usePathname().includes(PATHES.signIn.path);

    const isLoginTextStyle = (is: boolean) => (is ? `bg-f-purple text-white` : ``);

    return (
        <div className="flex flex-col  justify-center items-center h-full">
            <div className="my-16">
                {isLogin ? (
                    <div className="flex gap-2 text-f-purple font-bold text-4xl">
                        <div>Welcome</div> <div className="text-f-default ">back</div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 items-center ">
                        <div className="text-f-default font-semibold text-2xl">
                            Keep track of your workouts and achievements.
                        </div>
                        <div className="text-f-purple font-bold text-4xl">
                            <span>Start</span> <span className="text-f-default">now!</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-20  mb-16">
                <Image
                    src="/png/auth.png"
                    width={393}
                    height={400}
                    alt="auth"
                    className="object-contain "
                    loading="eager"
                    priority
                />
                <div className="flex flex-col gap-9 w-100 py-5">
                    <div className="flex items-center border border-f-purple rounded-2xl overflow-hidden text-f-default text-[20px]">
                        <Link
                            href={PATHES.signIn.path}
                            className={`w-full text-center py-3.5 ${isLoginTextStyle(isLogin)}`}
                        >
                            {PATHES.signIn.title}
                        </Link>
                        <Link
                            href={PATHES.signUp.path}
                            className={`w-full text-center py-3.5 ${isLoginTextStyle(!isLogin)}`}
                        >
                            {PATHES.signUp.title}
                        </Link>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
