"use client";
import View from "@/components/common/View/View";
import useMenu from "@/hooks/useMenu";
import { useState } from "react";
import clsx from "clsx";
import { MenuItem } from "../MenuItem/MenuItem";
import { usePathname } from "next/navigation";

export default function AsideMenu({
    className,
    onClick,
}: {
    className?: string;
    onClick?: () => void;
}) {
    const { headerMenu } = useMenu();
    const selected = usePathname() === "/";
    const [selectedTitle, setSelectedTitle] = useState<string>(
        headerMenu.find((el) => el.selected)?.title ?? "",
    );

    return (
        <View
            className={clsx("flex flex-col p-5 rounded-2xl bg-white w-full", className)}
            gap={false}
        >
            <div className="flex flex-col">
                <MenuItem
                    idx={8}
                    path="/"
                    selected={selected}
                    title="Main"
                    onClick={() => {
                        setSelectedTitle(() => "/");
                        onClick && onClick();
                    }}
                />

                {headerMenu.map(({ path, title }, idx) => (
                    <MenuItem
                        key={path + "_prof_menus"}
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
            </div>
        </View>
    );
}
