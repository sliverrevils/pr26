"use client";
import useMenu from "@/hooks/useMenu";
import Link from "next/link";
import * as motion from "framer-motion/client";

export default function HeaderMenu() {
    const { headerMenu } = useMenu();

    return (
        <aside className=" flex items-center gap-x-8 h-full">
            {headerMenu.map(({ path, selected, title }) => (
                <Link
                    key={`${title}__headerMenu`}
                    href={path}
                    className={` relative  h-full flex items-center 
                        ${
                            selected ? "text-f-gray-5" : "text-f-gray-5/60"
                        } hover:text-f-gray-5 font-semibold
                        `}
                >
                    <div>{title}</div>

                    {selected && (
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
