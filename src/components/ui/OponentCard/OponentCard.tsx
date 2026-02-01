import { PATHES } from "@/config/pathes";
import { WinnerIco } from "@/icons/iconsSvg";
import { IOponent } from "@/mongo/models/matchSearchModel";
import { IPlayer } from "@/mongo/models/playerModel";
import Image from "next/image";
import Link from "next/link";

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
    const {
        name = "unnamed",
        alias = "no_player",
        avatar200Path = "",
        avatar400Path = "",
        avatarPath = "",
    } = oponent;

    const Tag = link ? Link : "div";

    return (
        <Tag
            href={PATHES.player.path + alias}
            className="flex flex-col gap-1.5  max-w-25 relative cursor-pointer "
        >
            {win && (
                <div className="absolute text-f-purple font-bold  rounded-lg px-1 ">
                    <WinnerIco />
                </div>
            )}
            <Image
                src={avatar200Path || avatar400Path || avatarPath || "/png/userProfileDefault.png"}
                width={100}
                height={100}
                alt={""}
                className="aspect-square object-cover rounded-full bg-[url('/png/userProfileDefault.png')] bg-cover bg-center"
            />

            <div className="text-center text-f-default text-[16px] font-bold">{name}</div>
        </Tag>
    );
}
