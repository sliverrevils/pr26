"use client";
import Select from "@/components/common/Select/Select";
import { HummerIco, PlusIco } from "@/icons/iconsSvg";
import { IPlayerSearch } from "@/mongo/models/playersSearchModel";
import { findTopPlayers } from "@/services/playerService";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { addToFavoritePlayers } from "@/services/userService";
import { toastShowResult } from "@/helpers/toastHalper";

export default function CoachingBackground({
    className = "",
    favoritePlayers,
}: {
    className?: string;
    favoritePlayers: IPlayerSearch[];
}) {
    const [isSelect, setIsSelect] = useState(false);
    const [topPlayers, setTopPlayer] = useState<IPlayerSearch[]>([]);

    const onSelected = async (id: string) => {
        const res = toastShowResult(await addToFavoritePlayers(id));
    };

    useEffect(() => {
        findTopPlayers().then(setTopPlayer);
    }, []);
    return (
        <div className={clsx(" w-full h-full flex items-center", className ? className : "")}>
            <div className=" w-full h-13.5  flex justify-between">
                <div className="ml-4 relative h-full opacity-60 bg-white  aspect-square rounded-full flex items-center justify-center">
                    <div className="absolute text-white text-[16px] font-semibold -top-7 text-nowrap">
                        My coach
                    </div>
                    <HummerIco />
                    <div className="absolute text-white text-[14px] font-normal  -bottom-6 text-nowrap">
                        Coming soon
                    </div>
                </div>
                <div className="relative h-full flex">
                    <div className="absolute text-white text-[16px] font-semibold -top-7 left-1/2 -translate-x-1/2 text-nowrap">
                        My favorite players
                    </div>

                    {favoritePlayers.map((player) => (
                        <div key={player._id + "_favaritePlayer"} className="h-full w-10.5">
                            <div className="relative h-full outline-2 outline-white aspect-square rounded-full flex items-center justify-center">
                                <Avatar human={player} size="favorite" showCorona={false} />
                            </div>
                        </div>
                    ))}

                    {new Array(4 - favoritePlayers.length).fill("").map((_, idx) => (
                        <div key={idx + "_blanckPlayer"} className="h-full w-10.5">
                            <div className="relative h-full border border-white border-dashed aspect-square rounded-full flex items-center justify-center" />
                        </div>
                    ))}
                    <div
                        className="relative h-full bg-white/80 aspect-square rounded-full flex items-center justify-center cursor-pointer transition
                                    hover:bg-white
                                    "
                        onClick={() => setIsSelect((state) => !state)}
                    >
                        <PlusIco />
                    </div>
                </div>
                {isSelect && (
                    <div className="absolute bottom-[1px] left-0 right-0 mx-5  z-20 shadow-2xl">
                        <Select
                            onChange={onSelected}
                            onCloseSelect={() => setIsSelect(() => false)}
                            onAfterSelect={() => setIsSelect(() => false)}
                            options={topPlayers.map((player) => ({
                                label: player.name,
                                value: player._id,
                                icon: <Avatar human={player} size="small" showCorona={false} />,
                            }))}
                            placeholder="select from top players"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
