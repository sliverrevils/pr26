"use client";

import HeaderMenu from "@/components/menus/HeaderMenu/HeaderMenu";
import { SideMenu } from "@/components/animation/SideMenu/SideMenu";
import { UserMenu } from "@/components/animation/UserMenu/UserMenu";
import { Avatar } from "@/components/ui/Avatar/Avatar";
import { PATHES } from "@/config/pathes";
import useMenu from "@/hooks/useMenu";
import { LogoSvg, MenuIco } from "@/icons/iconsSvg";
import { IUser } from "@/mongo/models/userModel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header({ user }: { user: IUser | null }) {
    const [isLeftMenu, setIsLeftMenu] = useState(false);
    const [isUserMenu, setIsUserMenu] = useState(false);
    const pathName = usePathname();
    const { headerMenu } = useMenu();
    const isRoot = pathName === "/";

    const mainStyle = isRoot
        ? "bg-transparent absolute w-full flex justify-center"
        : "bg-(image:--gradient-PurpleLeftRight) flex justify-center";

    return (
        <div className={`${mainStyle} z-10 `}>
            <header className=" container flex justify-between items-center h-23">
                <div className="lg:hidden cursor-pointer">
                    <MenuIco
                        width={40}
                        height={40}
                        onClick={() => setIsLeftMenu((state) => !state)}
                    />
                </div>
                <Link href={PATHES.home.path} className=" h-full flex items-center">
                    <div className="-translate-y-3">
                        <LogoSvg />
                    </div>
                </Link>

                <HeaderMenu className="hidden lg:flex" headerMenu={headerMenu} />
                <SideMenu
                    isOpen={isLeftMenu}
                    onClose={() => setIsLeftMenu(false)}
                    headerMenu={headerMenu}
                />
                <UserMenu isOpen={isUserMenu} onClose={() => setIsUserMenu(false)} user={user} />

                <div className="h-full flex items-center">
                    {user ? (
                        <>
                            <Link
                                href={PATHES.profile.path}
                                className=" w-10 h-10 rounded-full  items-center overflow-hidden hidden
                                            lg:flex
                                            "
                            >
                                {/* <Image src={avatarImage} width={40} height={40} alt="avatar" /> */}
                                <Avatar human={user} size="small" />
                            </Link>
                            <div
                                onClick={() => setIsUserMenu((state) => true)}
                                className=" w-10 h-10 rounded-full flex items-center overflow-hidden 
                                            lg:hidden
                                            "
                            >
                                {/* <Image src={avatarImage} width={40} height={40} alt="avatar" /> */}
                                <Avatar human={user} size="small" />
                            </div>
                        </>
                    ) : (
                        <Link
                            href={PATHES.signIn.path}
                            className="btn-white-40 bg-white border-0 text-nowrap"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            </header>
        </div>
    );
}
