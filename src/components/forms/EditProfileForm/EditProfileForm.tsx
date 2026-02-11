"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/components/common/Input/Input";
import Select from "@/components/common/Select/Select";
import TextArea from "@/components/common/TextArea/TextArea";
import { Flag } from "@/components/common/Flag/Flag";
import { countries } from "@/constants/countres";
import { FemaleIco, MaleIco } from "@/icons/iconsSvg";
import { IUser } from "@/mongo/models/userModel";
import { changePassword, checkUserPassword, updateUser } from "@/services/userService";
import { toastShowResult } from "@/helpers/toastHalper";
import { capitalizeWords } from "@/helpers/stringFncs";
import Choose from "@/components/common/Choose/Choose";

const editProfileSchema = z.object({
    name: z.string().trim().min(2, "Minimum 2 characters"),
    countryCode: z.string().optional(),
    gender: z.string().optional(),
    city: z.string().trim().optional(),

    date: z
        .string()
        .optional()
        .refine((v) => !v || !isNaN(Date.parse(v)), "Invalid date"),

    socialLink: z.string().trim().optional(),
    description: z.string().trim().optional(),
    password: z.string().optional(),
    newPassword: z.string().optional(),
    fargoRate: z.number().min(0, " BIGGER THEN 0").optional(), //TODO Change text
});

//type EditProfileFormValues = z.infer<typeof editProfileSchema>;
type EditProfileFormValues = {
    name: string;
    countryCode?: string;
    gender?: string;
    city?: string;
    date?: string;
    socialLink?: string;
    description?: string;
    fargoRate?: number; // ← ВАЖНО
    password?: string;
    newPassword?: string;
};

export default function EditProfileForm({ user }: { user: IUser }) {
    const defaultValues: EditProfileFormValues = useMemo(
        () => ({
            name: user.name ?? "",
            countryCode: user.countryCode ?? "",
            gender: user.gender ?? "",
            city: user.city ?? "",
            date: user.date ? new Date(user.date).toISOString().slice(0, 10) : "",
            socialLink: user.socialLink ?? "",
            description: user.description ?? "",
            fargoRate: user.fargoRate ?? 0,
            password: "",
            newPassword: "",
        }),
        [user],
    );

    const {
        control,
        register,
        handleSubmit,
        watch,
        reset,
        setError,
        clearErrors,
        formState: { errors, isDirty },
    } = useForm<EditProfileFormValues>({
        resolver: zodResolver(editProfileSchema),
        defaultValues,
    });

    const password = watch("password");

    useEffect(() => {
        if (!password) {
            clearErrors("newPassword");
        }
    }, [password, clearErrors]);

    const onSubmit = async (data: EditProfileFormValues) => {
        if (data.password) {
            const isValid = await checkUserPassword({ email: user.email, password: data.password });

            if (!isValid) {
                setError("password", {
                    message: "Wrong password",
                });
                return;
            }

            if (!data.newPassword) {
                setError("newPassword", {
                    message: "Enter new password",
                });
                return;
            }

            const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(data.newPassword);

            if (!strongPassword) {
                setError("newPassword", {
                    message: "Min 8 chars, upper, lower and number",
                });
                return;
            }
            toastShowResult(await changePassword({ password: data.newPassword }));
        }

        const { password, newPassword, ...newData } = {
            ...data,
        };

        toastShowResult(await updateUser({ newData }));

        reset({
            ...newData,
            password: "",
            newPassword: "",
        });
    };

    return (
        <form
            className="relative flex flex-col gap-y-5 text-f-default"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-center text-xl font-bold">EDIT PROFILE</h2>

            <div
                className="grid grid-cols-1 gap-x-5 gap-y-6
                            xl:grid-cols-2
                            "
            >
                <Input
                    title="Full name"
                    requiredTitle
                    error={errors.name?.message}
                    {...register("name", {
                        setValueAs: (v) => v?.trim(),
                    })}
                />

                <Input title="Birth date" date error={errors.date?.message} {...register("date")} />

                <Controller
                    control={control}
                    name="countryCode"
                    render={({ field }) => (
                        <Select
                            title="Select a country"
                            {...field}
                            options={countries.map(({ code, country }) => ({
                                value: code,
                                label: country,
                                icon: <Flag code={code} className="rounded-sm" />,
                            }))}
                            placeholder="Choose country"
                            error={errors.countryCode?.message}
                        />
                    )}
                />

                <Input
                    title="E-mail address ( not changeable )"
                    className="opacity-80"
                    value={user.email}
                    disabled
                />

                <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <Choose
                            title="Gender"
                            chooseText="Your gender"
                            error={errors.gender?.message}
                            {...field}
                            options={[
                                { value: "Male", label: "Male", icon: <MaleIco /> },
                                { value: "Female", label: "Female", icon: <FemaleIco /> },
                            ]}
                        ></Choose>
                    )}
                />

                <Input
                    title="Contact link"
                    error={errors.socialLink?.message}
                    {...register("socialLink", {
                        setValueAs: (v: string) => v?.trim(),
                    })}
                />

                <Input
                    title="City"
                    error={errors.city?.message}
                    {...register("city", {
                        setValueAs: (v: string) => capitalizeWords(v?.trim()),
                    })}
                />

                <Input
                    title="Fargo rate"
                    type="number"
                    {...register("fargoRate", {
                        setValueAs: (v) => (v === "" ? undefined : Number(v)),
                    })}
                    error={errors.fargoRate?.message}
                    min={0}
                />
            </div>
            <TextArea
                title="Describe yourself, in short"
                placeholder="Tell others about you"
                maxHeight={300}
                error={errors.description?.message}
                {...register("description", {
                    setValueAs: (v) => v?.trim(),
                })}
            />

            <div
                className="grid grid-cols-1 gap-x-5 gap-y-6 
                            xl:grid-cols-2
                            "
            >
                <Input
                    title="Your old password"
                    placeholder="Enter your password"
                    hideBtn
                    className="bg-white"
                    error={errors.password?.message}
                    {...register("password", {
                        setValueAs: (v) => v?.trim(),
                    })}
                />

                <Input
                    title="Your new password"
                    placeholder="Enter new password"
                    hideBtn
                    disabled={!password}
                    className="bg-white"
                    error={errors.newPassword?.message}
                    {...register("newPassword", {
                        setValueAs: (v) => v?.trim(),
                    })}
                />
            </div>

            <div
                className="flex justify-end gap-5 fixed bottom-5 right-5
                            xl:static
                            "
            >
                {isDirty && (
                    <button
                        type="button"
                        disabled={!isDirty}
                        onClick={() => reset(defaultValues)}
                        className="btn-blue-40 bg-f-red-like disabled:hidden 
                                    
                                    "
                    >
                        cancel
                    </button>
                )}

                <button
                    type="submit"
                    disabled={!isDirty}
                    className=" btn-blue-40 disabled:hidden 
                                xl:disabled:block                                        
                                "
                >
                    update
                </button>
            </div>
        </form>
    );
}
