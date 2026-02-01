"use client";

import View from "@/components/common/View/View";
import SignInForm from "@/components/forms/SignIn/SignInForm";
import SignUpForm from "@/components/forms/SignUp/SignUpForm";
import { PATHES } from "@/config/pathes";
import Image from "next/image";
import { Activity, useState } from "react";

export default function AuthToggle() {
    const [isLogin, setIsLogin] = useState(true);

    const isLoginTextStyle = (is: boolean) => (is ? `bg-f-purple text-white` : ``);

    return (
        <View className="flex flex-col gap-16 justify-center items-center h-full ">
            <div className="flex gap-20 w-full ">
                <div className="flex flex-col gap-9  w-full">
                    <div className="flex items-center border border-f-purple rounded-2xl overflow-hidden text-f-default text-[20px]">
                        <div
                            className={`w-full text-center py-3.5 cursor-pointer ${isLoginTextStyle(isLogin)}`}
                            onClick={() => setIsLogin((state) => !state)}
                        >
                            {PATHES.signIn.title}
                        </div>
                        <div
                            className={`w-full text-center py-3.5 cursor-pointer ${isLoginTextStyle(!isLogin)}`}
                            onClick={() => setIsLogin((state) => !state)}
                        >
                            {PATHES.signUp.title}
                        </div>
                    </div>
                    <div>
                        <Activity mode={isLogin ? "visible" : "hidden"}>
                            <SignInForm />
                        </Activity>
                        <Activity mode={!isLogin ? "visible" : "hidden"}>
                            <SignUpForm />
                        </Activity>
                    </div>
                </div>
            </div>
        </View>
    );
}
