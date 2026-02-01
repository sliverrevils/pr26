"use client";
import { PATHES } from "@/config/pathes";
import { ISvg } from "@/types/types";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type IProfileMenuItem = {
    title: string;
    path: string;
    selected: boolean;
    Icon: ISvg | null;
};

export default function useMenu() {
    const pagePath = usePathname();

    const headerMenu = Object.values(PATHES)
        .filter((el) => el.menuLocation.includes("header"))
        .map(({ title, path }) => ({
            title,
            path,
            selected: pagePath.includes(path),
        }));

    const profileMenu: IProfileMenuItem[] = Object.values(PATHES)
        .filter((el) => el.menuLocation.includes("profile"))
        .map(({ title, path, icon }) => ({
            title,
            path,
            selected: pagePath === path,
            Icon: icon || null,
        }));

    const footerMenusCategories = Object.values(PATHES).filter(({ menuLocation }) =>
        menuLocation.includes("footer"),
    );
    const titles = [...new Set(footerMenusCategories.map(({ category }) => category))];
    const footerMenu = titles.map((title) => {
        const currentMenues = footerMenusCategories.filter(({ category }) => category === title);

        return {
            categoryTitle: title,
            items: currentMenues.map(({ title, path }) => ({
                title,
                path,
                selected: pagePath === path,
            })),
        };
    });

    return { headerMenu, profileMenu, footerMenu };
}
