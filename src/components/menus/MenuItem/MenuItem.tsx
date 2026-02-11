"use client";
import { IProfileMenuItem } from "@/hooks/useMenu";
import Link from "next/link";
import { DOMAttributes } from "react";
import * as motion from "framer-motion/client";

export const MenuItem = ({
    path,
    selected,
    title,
    Icon,
    idx,
    ...divProps
}: DOMAttributes<HTMLDivElement> & IProfileMenuItem & { idx: number }) => (
    <div {...divProps}>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    />
);
