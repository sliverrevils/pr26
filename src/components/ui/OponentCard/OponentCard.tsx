"use client";
import { PATHES } from "@/config/pathes";
import { IOponent } from "@/mongo/models/matchSearchModel";
import Link from "next/link";
import { Avatar } from "../Avatar/Avatar";

export default function OponentCard({
    oponent,
    win = false,
    link, // при указании компонет становится ссылкой
}: {
    oponent: IOponent | null;
    win?: boolean;
    link?: boolean;
}) {
    if (!oponent) return <div className="text-center text-f-red-main font-extrabold">[error]</div>;
    const { name = "unnamed", alias = "no_player" } = oponent;

    const Tag = link ? Link : "div";

    return (
        <Tag
            href={PATHES.player.path + alias}
            className="flex flex-col gap-1.5  max-w-25 relative cursor-pointer "
        >
            <Avatar human={oponent} size="oponent" />

            <div className="text-center text-f-default text-[16px] font-bold">{name}</div>
        </Tag>
    );
}
