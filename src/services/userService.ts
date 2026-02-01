"use server";
import { auth, signOut } from "@/config/auth";
import { normalizeDbRes } from "@/helpers/dbHalpers";
import { hashPassword, verifyPassword } from "@/helpers/passwordHelper";
import { connectDB } from "@/mongo/connect";
import { IUser, UserModel } from "@/mongo/models/userModel";
import { IActionResult } from "@/types/types";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Binary } from "mongodb";
import { redirect } from "next/navigation";

//! SING UP
type IUserCreateProps = {
    email: string;
    password: string;
    name: string;
};
export const singUpUserDB = async (user: IUserCreateProps): Promise<IActionResult> => {
    try {
        await connectDB();
        const newUser = new UserModel();
        Object.assign(newUser, user);

        //const hashedPassword = await bcrypt.hash(user.password, 10);
        const hashedPassword = await hashPassword(user.password);
        newUser.password = hashedPassword as any as Binary;

        await newUser.save();
        return { type: "success", message: "You have been successfully registered." };
    } catch (error) {
        console.log("ERROR 👎", error);
        if (error instanceof Error) {
            return { type: "warning", message: error.message };
        }
        return { type: "error", message: "Operation error, please try again later." };
    }
};

export const getCurrentUser = async () => {
    const session = await auth();

    if (!session?.user) {
        return null;
    }
    try {
        await connectDB();
        const user = await UserModel.findOne({ _id: session.user.id });
        return normalizeDbRes<IUser | null>(user);
    } catch (error) {
        return null;
    }
};

export async function checkEmailExists(email: string) {
    await connectDB();
    const user = await UserModel.findOne({ email });
    return Boolean(user);
}

export const checkUserPassword = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    await connectDB();

    const user = await UserModel.findOne({ email }).lean();

    if (!user) return false;

    // const isValid = await bcrypt.compare(password, user.password);
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) return false;

    return true;
};

export const updateUser = async ({
    newData,
}: {
    newData: Record<string, any>;
}): Promise<IActionResult> => {
    const session = await auth();
    try {
        connectDB();
        if (session) {
            const user = await UserModel.findOne({ email: session.user.email });
            if (!user)
                return { type: "error", message: "Operation error, please try again later." };
            if (newData.password) {
                newData.password = await bcrypt.hash((newData as any).password, 10);
            }

            Object.assign(user, newData);

            await user.save();
            revalidatePath("/");
            return {
                type: "success",
                message: "Your personal data has been successfully updated!",
            };
        }
        return { type: "error", message: "Operation error, please try again later." };
    } catch (error) {
        return { type: "error", message: "Operation error, please try again later." };
    }
};
export const changePassword = async ({
    password,
}: {
    password: string;
}): Promise<IActionResult> => {
    const session = await auth();
    try {
        connectDB();
        if (session) {
            const user = await UserModel.findOne({ email: session.user.email });
            if (!user)
                return { type: "error", message: "Operation error, please try again later." };

            //const hashedPassword = await bcrypt.hash(password, 10);
            const hashedPassword = await hashPassword(password);
            user.password = hashedPassword as any as Binary;
            await user.save();
            return { type: "success", message: "Your password is changed !  " };
        }
        return { type: "error", message: "Operation error, please try again later." };
    } catch (error) {
        return { type: "error", message: "Operation error, please try again later." };
    }
};
