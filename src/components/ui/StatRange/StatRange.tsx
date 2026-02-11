"use client";

import { roundNumber } from "@/helpers/numbersHelpers";
import { IOponent } from "@/mongo/models/matchSearchModel";
import { IPlayerEmb } from "@/mongo/models/videosModel";

type Props = {
    oponents: IPlayerEmb[];
    title: string;
    field: keyof Omit<IPlayerEmb["stats"], "pockets">;
    symbol?: string;
    isFirstWin: boolean;
    isSecondWin: boolean;
};
export default function StatRange({
    title,
    symbol = "",
    oponents,
    isFirstWin,
    isSecondWin,
    field,
}: Props) {
    if (!oponents?.[0]?.stats?.[field] || !oponents?.[1]?.stats?.[field]) return false;
    const firstColor = isFirstWin ? "bg-f-green-main" : "bg-f-red-main";
    const secondColor = isSecondWin ? "bg-f-green-main" : "bg-f-red-main";
    const calcPocent = (num: number) =>
        Math.round(
            oponents[num].stats[field] /
                ((oponents[0].stats[field] + oponents[1].stats[field]) / 100),
        );
    return (
        <div className={`w-full flex flex-col gap-4  items-center p-4 rounded-xl bg-f-gray-4`}>
            <div className="text-f-default font-bold text-lg">{title}</div>

            <div className="flex w-full items-center gap-3.75">
                <div className="text-f-default font-bold text-lg text-nowrap">
                    {roundNumber(oponents[0].stats[field])}
                    {symbol}
                </div>

                <div className="w-full h-4.25 rounded-lg overflow-hidden  flex items-stretch">
                    <div
                        className={`${firstColor} h-full`}
                        style={{ width: `${calcPocent(0)}%` }}
                    />
                    <div
                        className={`${secondColor} h-full`}
                        style={{ width: `${calcPocent(1)}%` }}
                    />
                </div>

                <div className="text-f-default font-bold text-lg text-nowrap">
                    {roundNumber(oponents[1].stats[field])}
                    {symbol}
                </div>
            </div>
        </div>
    );
}
