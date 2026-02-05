"use client";
import HeaderMenu from "@/components/menus/HeaderMenu/HeaderMenu";
import { Avatar } from "@/components/ui/Avatar/Avatar";

import { PATHES } from "@/config/pathes";
import { LogoSvg } from "@/icons/iconsSvg";
import { IUser } from "@/mongo/models/userModel";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({ user }: { user: IUser | null }) {
    const pathName = usePathname();
    const isRoot = pathName === "/";
    const avatarImage =
        user?.avatar200 || user?.avatar400 || user?.avatar || "/png/avatarDefault.png";

    const mainStyle = isRoot
        ? "bg-transparent absolute w-full flex justify-center"
        : "bg-(image:--gradient-PurpleLeftRight) flex justify-center";

    return (
        <div className={`${mainStyle} z-10 `}>
            <header className="container flex justify-between items-center h-23 ">
                <Link href={PATHES.home.path} className=" h-full flex items-center">
                    <div className="-translate-y-3">
                        <LogoSvg />
                    </div>
                </Link>

                <HeaderMenu />

                <div className="h-full flex items-center">
                    {user ? (
                        <Link
                            href={PATHES.profile.path}
                            className=" w-10 h-10 rounded-full flex items-center overflow-hidden"
                        >
                            {/* <Image src={avatarImage} width={40} height={40} alt="avatar" /> */}
                            <Avatar human={user} size="small" />
                        </Link>
                    ) : (
                        <Link href={PATHES.signIn.path} className="btn-white-40 bg-white border-0">
                            Sign in
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
}
