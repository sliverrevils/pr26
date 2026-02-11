"use client";
import { Flag } from "@/components/common/Flag/Flag";
import { ArrowTopRightGreen, StarForString } from "@/icons/iconsSvg";
import { IPlayer } from "@/mongo/models/playerModel";
import Image from "next/image";
import { Avatar } from "../Avatar/Avatar";
import { IPlayerSearch } from "@/mongo/models/playersSearchModel";
import { IUser } from "@/mongo/models/userModel";

export default function PlayerInfo({ player }: { player: Partial<IPlayerSearch & IUser> }) {
    return (
        <div className="flex flex-col gap-9 rounded-2xl bg-white overflow-hidden">
            <div className=" h-40 bg-(image:--gradient-PurpleTopBottom) relative">
                <Image
                    src={"/png/userBgDefault.Black.png"}
                    width={388}
                    height={160}
                    alt="playerBg"
                    className="opacity-20 w-full h-full object-cover absolute"
                />
                <div className="flex items-start gap-7  translate-y-7 w-87 h-full px-5">
                    <Avatar human={player} size="big" showCorona={false} />
                    <div className=" flex-1 h-full flex justify-between items-center -translate-y-4 text-white">
                        <div className="relative">
                            <div className="font-semibold">
                                <span>FargoRate</span>
                            </div>
                            <div className="flex items-center gap-2 text-lg absolute -bottom-4 right-1/2 translate-x-1/2 translate-y-1/2">
                                <div className="text-[38px] font-semibold">{player.fargo}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1 items-center p-5 pt-0 text-f-default">
                <div className="flex items-center gap-2 text-lg font-bold">
                    {player.countryCode && (
                        <Flag code={player.countryCode} sizeBig className="rounded-sm" />
                    )}
                    <div>{player.name}</div>
                </div>
            </div>
        </div>
    );
}
