import View from "@/components/common/View/View";
import ProfileMenu from "@/components/menus/ProfileMenu/ProfileMenu";
import AuthToggle from "@/components/ui/AuthToggle/AuthToggle";
import LeftSideBlock from "@/components/ui/LeftSideBlock/LeftSideBlock";
import UserInfo from "@/components/ui/UserInfo/UserInfo";
import { getCurrentUser } from "@/services/userService";
import { Activity, PropsWithChildren } from "react";

export default async function ProfileLayoyt({ children }: PropsWithChildren) {
    const user = await getCurrentUser();
    return (
        <div className="container flex gap-5 items-start pt-8 pb-16 w-full ">
            <LeftSideBlock user={user} />

            <div className="flex-1">{children}</div>
        </div>
    );
}
