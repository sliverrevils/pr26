"use client";
import ContentLine from "../ContentLine/ContentLine";
import { IPlayerSearch } from "@/mongo/models/playersSearchModel";
import { Avatar } from "@/components/ui/Avatar/Avatar";

export default function TopPlayers({
    players,
    forMain = true,
}: {
    players: IPlayerSearch[];
    forMain?: boolean;
}) {
    return (
        <div className="container self-center  flex flex-col">
            {forMain && (
                <ContentLine
                    imgUrl="/svg/players-checkmarked.svg"
                    textGray="Top"
                    textBlue="players"
                />
            )}
            <div className="flex flex-wrap gap-x-16 gap-y-4 justify-center ">
                {players.map((player) => (
                    <Avatar key={player.alias} human={player} size="oponent" showName link />
                ))}
            </div>
        </div>
    );
}
