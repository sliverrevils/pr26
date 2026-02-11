"use client";
import dayjs from "dayjs";
import { Match } from "../Match/Match";
import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import { ArrowLeft, EventIco } from "@/icons/iconsSvg";
import { Flag } from "@/components/common/Flag/Flag";
import { useRouter } from "next/navigation";
import StatRange from "../StatRange/StatRange";

export default function MatchInfo({ match }: { match: IMatchesSearch }) {
    const { back } = useRouter();

    const [isFirstWin, isSecondWin] = [
        match.score?.[0] >= match.score?.[1],
        match.score?.[1] >= match.score?.[0],
    ];
    return (
        <div className="flex flex-col gap-4  rounded-2xl bg-white overflow-hidden p-5">
            <div className="flex items-center justify-between">
                <div className="p-1.75 bg-f-gray-4 rounded-xl cursor-pointer" onClick={back}>
                    <ArrowLeft />
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-f-default text-[20px] ">MATCH</div>
                    <div className="font-normal text-f-text-purple text-[14px]">
                        {dayjs(match.date).format("DD.MM.YYYY")}
                    </div>
                </div>
                <div className="p-1.75  rounded-xl"> </div>
            </div>

            <div className=" bg-f-purple-transparent rounded-xl p-4 flex gap-4 items-center">
                <EventIco />
                <div className="text-center font-bold text-f-default leading-[120%]">
                    {match.event.name || "Unknown event"}
                </div>

                <div className="w-7.5 aspect-square  flex items-center">
                    {(match.event.country || match.event.countryCode) && (
                        <Flag
                            code={match.event.country || match.event.countryCode}
                            sizeBig
                            className="w-full object-contain"
                        />
                    )}
                </div>
            </div>

            <Match match={match} forInfo bigTextScore={false} noPadding resultStyle />

            <StatRange
                title="Shots"
                oponents={match.opponents}
                field="shots"
                isFirstWin={isFirstWin}
                isSecondWin={isSecondWin}
            />
            <StatRange
                title="Innings"
                oponents={match.opponents}
                field="innings"
                isFirstWin={isFirstWin}
                isSecondWin={isSecondWin}
            />
            <StatRange
                title="Time In Seconds"
                oponents={match.opponents}
                field="tableTimeInSeconds"
                isFirstWin={isFirstWin}
                isSecondWin={isSecondWin}
            />
            <StatRange
                title="Compexity"
                oponents={match.opponents}
                field="avgCompexity"
                isFirstWin={isFirstWin}
                isSecondWin={isSecondWin}
            />
            <StatRange
                title="ShotDurationInSeconds"
                oponents={match.opponents}
                field="avgShotDurationInSeconds"
                isFirstWin={isFirstWin}
                isSecondWin={isSecondWin}
            />
        </div>
    );
}
