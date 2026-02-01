"use client";

import Input from "@/components/common/Input/Input";
import { PATHES } from "@/config/pathes";
import { capitalizeWords } from "@/helpers/stringFncs";
import { toastShowResult } from "@/helpers/toastHalper";
import { checkEmailExists, singUpUserDB } from "@/services/userService";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signUpSchema = z
    .object({
        name: z.string().min(2, "Name is too short"),

        email: z.string().email("Invalid email address"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[a-z]/, "Password must contain a lowercase letter")
            .regex(/[A-Z]/, "Password must contain an uppercase letter")
            .regex(/\d/, "Password must contain a number")
            .regex(/^[A-Za-z0-9]+$/, "Only Latin letters and numbers are allowed"),

        passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
    });

export type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: "onChange", // важно: валидируем при вводе
    });

    async function onSubmit(data: SignUpFormData) {
        const emailExists = await checkEmailExists(data.email);
        if (emailExists) {
            setError("email", {
                type: "server",
                message: "This email is already in use",
            });
            return;
        }

        const res = await singUpUserDB(data);
        toastShowResult(res);
        if (res.type === "success") {
            router.push(PATHES.signIn.path);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <Input
                title="Your full name"
                requiredTitle
                placeholder="Enter your full name"
                error={errors.name?.message}
                {...register("name", {
                    onChange: (e) => {
                        e.target.value = capitalizeWords(e.target.value);
                    },
                })}
            />

            <Input
                title="E-mail address"
                requiredTitle
                placeholder="Enter your email address"
                error={errors.email?.message}
                {...register("email")}
            />

            <Input
                title="Password"
                requiredTitle
                hideBtn
                placeholder="Create a password"
                error={errors.password?.message}
                {...register("password")}
            />

            <Input
                title="Password confirmation"
                requiredTitle
                hideBtn
                placeholder="Confirm your password"
                error={errors.passwordConfirm?.message}
                {...register("passwordConfirm")}
            />

            <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="rounded-full p-4 text-white transition cursor-pointer
                         disabled:opacity-50 disabled:cursor-not-allowed
                         bg-f-purple"
            >
                Sign up
            </button>

            <Link href={PATHES.recovery.path} className="text-sm text-center text-f-green-main">
                {PATHES.recovery.title}
            </Link>
        </form>
    );
}
