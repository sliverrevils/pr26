import { PATHES } from "@/config/pathes";
import { IPlayer } from "@/mongo/models/playerModel";
import Image from "next/image";
import Link from "next/link";

export default function PlayerCard({
    player,
    foMain = true,
}: {
    player: IPlayer;
    foMain?: boolean;
}) {
    const { avatar, avatar200, avatar400, fargo, name, alias } = player;
    return (
        <Link
            href={PATHES.player.path + alias}
            className="flex flex-col gap-1.5  max-w-25 relative cursor-pointer "
        >
            {foMain && (
                <div className="absolute text-f-purple font-bold bg-f-gray-1 rounded-lg px-1 -left-2">
                    {player.fargo}
                </div>
            )}

            <Image
                src={avatar200 || avatar400 || avatar || "/png/userProfileDefault.png"}
                width={100}
                height={100}
                alt={alias}
                className="aspect-square object-cover rounded-full "
            />

            <div className="text-center text-f-default text-[16px] font-bold">{name}</div>
        </Link>
    );
}
