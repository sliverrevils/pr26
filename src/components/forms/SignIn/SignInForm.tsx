"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/Input/Input";
import { PATHES } from "@/config/pathes";
import Link from "next/link";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password is required"),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
    const search = useSearchParams();

    const errorMemo: string = useMemo(() => {
        const error = search.get("code");
        if (error == "credentials") {
            return "Login or password error";
        }
        if (error == "email_not_confirmed") {
            return "You have not confirmed the email address you provided.";
        }
        return "";
    }, [search]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
        mode: "onChange",
    });

    async function onSubmit(data: SignInFormData) {
        const { email, password } = data;

        await signIn("credentials", {
            email,
            password,
            //!redirect from authLayout
            // redirect: false,
            // callbackUrl: PATHES.profile.path,
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
            <Input
                title="E-mail address"
                requiredTitle
                placeholder="Enter your email address"
                error={errors.email?.message || errorMemo}
                {...register("email")}
            />

            <Input
                title="Password"
                requiredTitle
                hideBtn
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
            />

            <button
                type="submit"
                disabled={!isValid}
                className="bg-f-purple text-white rounded-full p-4 cursor-pointer
          transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Sign in
            </button>

            <Link
                href={PATHES.recovery.path}
                className="text-sm text-center text-f-green-main underline underline-offset-3"
            >
                {PATHES.recovery.title}
            </Link>
        </form>
    );
}
