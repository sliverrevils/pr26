"use client";

import { roundNumber } from "@/helpers/numbersHelpers";
import { IOponent } from "@/mongo/models/matchSearchModel";

type Props = {
    oponents: IOponent[];
    title: string;
    field: keyof IOponent["matchStats"];
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
    const firstColor = isFirstWin ? "bg-f-green-main" : "bg-f-red-main";
    const secondColor = isSecondWin ? "bg-f-green-main" : "bg-f-red-main";
    const calcPocent = (num: number) =>
        Math.round(
            oponents[num].matchStats[field] /
                ((oponents[0].matchStats[field] + oponents[1].matchStats[field]) / 100),
        );
    return (
        <div
            className={`w-full flex flex-col gap-4  items-center p-4 rounded-xl bg-f-purple-transparent`}
        >
            <div className="text-f-default font-bold text-lg">{title}</div>

            <div className="flex w-full items-center gap-3.75">
                <div className="text-f-default font-bold text-lg">
                    {roundNumber(oponents[0].matchStats[field])}
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

                <div className="text-f-default font-bold text-lg">
                    {roundNumber(oponents[1].matchStats[field])}
                    {symbol}
                </div>
            </div>
        </div>
    );
}
