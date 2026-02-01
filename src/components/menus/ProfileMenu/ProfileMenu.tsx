"use client";
import View from "@/components/common/View/View";
import AuthToggle from "@/components/ui/AuthToggle/AuthToggle";
import { PATHES } from "@/config/pathes";
import useMenu, { IProfileMenuItem } from "@/hooks/useMenu";
import { LogoutSvg } from "@/icons/iconsSvg";
import { IUser } from "@/mongo/models/userModel";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as motion from "framer-motion/client";

export default function ProfileMenu({ user }: { user: IUser | null }) {
    const { profileMenu } = useMenu();

    if (!user) return <AuthToggle />;

    return (
        <View className="flex flex-col p-5 rounded-2xl bg-white w-full" gap={false}>
            <div>
                {profileMenu.map(MenuItem)}

                <div className="flex items-center gap-4 h-12.5 px-4 cursor-pointer rounded-xl">
                    <LogoutSvg />
                    <div
                        className="text-f-default text-lg font-semibold"
                        onClick={() =>
                            confirm("Exit?") && signOut({ redirectTo: PATHES.signIn.path })
                        }
                    >
                        Logout
                    </div>
                </div>
            </div>
        </View>
    );
}

const MenuItem = ({ path, selected, title, Icon }: IProfileMenuItem, idx: number) => (
    <div key={path + "_prof_menus"}>
        <Link
            href={path}
            className="relative  flex items-center gap-4  px-4 py-4.5 cursor-pointer rounded-xl"
        >
            {selected && <SelectedItem />}
            <div className="flex gap-4 z-10">
                {Icon && <Icon />}
                <div className="text-f-default text-lg font-semibold">{title}</div>
            </div>
        </Link>
        {!((idx + 1) % 3) && <div className="border-b-2 border-b-f-purple-transparent my-1" />}
    </div>
);

const SelectedItem = () => (
    <motion.div
        layoutId="profile-menu-highlight"
        className="absolute inset-0 rounded-xl bg-f-purple-transparent"
        transition={{ type: "spring", stiffness: 350, damping: 50 }}
    />
);
