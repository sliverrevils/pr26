"use client";
import View from "@/components/common/View/View";
import AuthToggle from "@/components/ui/AuthToggle/AuthToggle";
import { PATHES } from "@/config/pathes";
import useMenu, { IProfileMenuItem } from "@/hooks/useMenu";
import { LogoutSvg } from "@/icons/iconsSvg";
import { IUser } from "@/mongo/models/userModel";
import { signOut } from "next-auth/react";
import { useState } from "react";
import clsx from "clsx";
import { MenuItem } from "../MenuItem/MenuItem";

export default function ProfileMenu({
    user,
    className,
    onClick,
}: {
    user: IUser | null;
    className?: string;
    onClick?: () => void;
}) {
    const { profileMenu } = useMenu();
    const [selectedTitle, setSelectedTitle] = useState<string>(
        profileMenu.find((el) => el.selected)?.title ?? "",
    );

    if (!user) return <AuthToggle />;

    return (
        <View
            className={clsx("flex flex-col p-5 rounded-2xl bg-white w-full", className)}
            gap={false}
        >
            <div>
                {profileMenu.map(({ Icon, path, title }, idx) => (
                    <MenuItem
                        key={path + "_prof_menus"}
                        Icon={Icon}
                        path={path}
                        title={title}
                        selected={selectedTitle === title}
                        idx={idx}
                        onClick={(e) => {
                            setSelectedTitle(() => title);
                            onClick && onClick();
                        }}
                    />
                ))}

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
