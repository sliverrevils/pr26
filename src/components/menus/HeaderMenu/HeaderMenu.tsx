"use client";
import useMenu, { IHeaderMenuItem } from "@/hooks/useMenu";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { PATHES } from "@/config/pathes";

export default function HeaderMenu({
    className = "",
    headerMenu,
}: {
    className?: string;
    headerMenu: IHeaderMenuItem[];
}) {
    const pathname = usePathname();

    const [selectedTitle, setSelectedTitle] = useState<string>(
        headerMenu.find((el) => el.selected)?.title ?? "",
    );

    useEffect(() => {
        if (pathname === PATHES.home.path || pathname.startsWith("/profile"))
            setSelectedTitle(() => "");
    }, [pathname]);

    return (
        <aside className={`flex items-center gap-x-8 h-full overflow-hidden ${className}`}>
            {headerMenu.map(({ path, selected, title }) => (
                <Link
                    onClick={() => setSelectedTitle(title)}
                    key={`${title}__headerMenu`}
                    href={path}
                    className={` relative  h-full flex items-center 
                        ${
                            selected ? "text-f-gray-5" : "text-f-gray-5/60"
                        } hover:text-f-gray-5 font-semibold
                        `}
                >
                    <div>{title}</div>

                    {selectedTitle === title && (
                        <motion.div
                            transition={{ type: "spring", stiffness: 350, damping: 50 }}
                            layoutId="header_select"
                            className={` absolute bottom-0 w-full h-1 bg-f-green-main rounded-t-sm 
                                    transition-colors duration-300
                                    `}
                        />
                    )}
                </Link>
            ))}
        </aside>
    );
}
