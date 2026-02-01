"use client";
import { IUser } from "@/mongo/models/userModel";
import UserInfo from "../UserInfo/UserInfo";
import AuthToggle from "../AuthToggle/AuthToggle";
import { Activity } from "react";
import ProfileMenu from "@/components/menus/ProfileMenu/ProfileMenu";
import { usePathname } from "next/navigation";
import { PATHES } from "@/config/pathes";

export default function LeftSideBlock({ user }: { user: IUser | null }) {
    const pathname = usePathname();

    const isProfile = pathname.includes(PATHES.profile.path);
    const isAuth = !!user;
    return (
        <div className="flex flex-col gap-5 w-full max-w-87">
            <Activity mode={!isAuth ? "visible" : "hidden"}>
                <AuthToggle />
            </Activity>
            <Activity mode={isProfile ? "visible" : "hidden"}>
                <UserInfo user={user!} />
            </Activity>
            <Activity mode={user ? "visible" : "hidden"}>
                <ProfileMenu user={user} />
            </Activity>
        </div>
    );
}
