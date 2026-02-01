"use client";
import { PATHES } from "@/config/pathes";
import useMenu from "@/hooks/useMenu";
import Link from "next/link";

export default function FooterMenu({ className }: { className: string }) {
    const footerMenus = Object.values(PATHES).filter(({ menuLocation }) =>
        menuLocation.includes("footer"),
    );
    const titles = [...new Set(footerMenus.map(({ category }) => category))];

    const { footerMenu } = useMenu();
    return (
        <div className={` ${className}`}>
            {footerMenu.map(({ categoryTitle, items }) => (
                <div key={categoryTitle + "_footerMenu"} className="flex flex-col gap-6">
                    <div className="text-white font-bold text-[16px] tracking-wider">
                        {categoryTitle}
                    </div>
                    <div className="flex flex-col gap-5">
                        {items.map(({ path, selected, title }) => (
                            <Link
                                key={title + "_footerMenu"}
                                href={path}
                                className={`text-[15px] text-white/50 transition-colors
                                ${selected ? "underline underline-offset-3 text-white/80" : ""}
                                hover:text-white/90
                                `}
                            >
                                {title}
                                {selected && <div></div>}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
