"use client";

import { roundNumber } from "@/helpers/numbersHelpers";

//! Arr - shots logic [good,bad]-> [good,good+bad]
export const RangeShots = ({ arr, all }: { arr: number[]; all: number }) => {
    const colorArr = ["bg-f-green-main", "bg-f-red-main", "bg-f-purple"];
    const sum = roundNumber(arr.reduce<number>((acc, num) => acc + num, 0));
    const proc = roundNumber(all / 100);
    const getWidth = (index: number) =>
        !index
            ? `${roundNumber(arr[index] / proc)}%`
            : `${roundNumber(arr.reduce<number>((acc, num, idx) => (idx <= index ? acc + num : num), 0) / proc)}%`;
    return (
        <div className="relative w-full h-2.75 bg-white rounded-full overflow-hidden">
            {arr.map((num, idx) => (
                <div
                    key={Math.random()}
                    className={`absolute left-0 top-0 bottom-0 rounded-full ${colorArr[idx]}`}
                    style={{ width: getWidth(idx), zIndex: 10 - idx }}
                ></div>
            ))}
        </div>
    );
};
