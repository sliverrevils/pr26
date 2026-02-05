"use client";

import Block from "@/components/common/Block/Block";
import Image from "next/image";
import clsx from "clsx";
import { StarForString } from "@/icons/iconsSvg";
import { roundNumber } from "@/helpers/numbersHelpers";

const WORKOUTS = [
    {
        date: "04.02.2026",
        items: [
            {
                status: "",
                time: "00:30:31",
                date: "16:57:18",
                shots: 81,
                shotsArr: [40, 10],
                point: 754,
            },
            {
                status: "Error Status code: 403",
                time: "00:30:31",
                date: "16:57:18",
                shots: 40,
                shotsArr: [20, 10],
                point: 343,
            },
        ],
    },
    {
        date: "04.02.2025",
        items: [
            {
                status: "Error Status code: 403",
                time: "00:17:31",
                date: "14:57:18",
                shots: 69,
                shotsArr: [40, 10],
                point: 345,
            },
        ],
    },
];

export default function WorkoutsList() {
    return (
        <div className="flex flex-col gap-8">
            {WORKOUTS.map((work, idx) => (
                <WorkoutItem key={idx + "_workouts"} {...work} />
            ))}
        </div>
    );
}

const WorkoutItem = ({ date, items }: (typeof WORKOUTS)[0]) => (
    <div className="flex flex-col gap-4">
        <div className="text-center font-bold text-f-text-default">{date}</div>
        {items.map((item, idxex) => (
            <WorkoutRecord key={Math.random()} {...item} />
        ))}
    </div>
);

const WorkoutRecord = ({
    date,
    point,
    shots,
    shotsArr,
    status,
    time,
}: (typeof WORKOUTS)[0]["items"][0]) => (
    <Block
        className={clsx("flex gap-4", status ? "bg-f-red-transparent" : "bg-f-green-transparent2")}
    >
        <Image src={"/png/rec_work.png"} width={60} height={60} alt="rec" className="self-center" />
        <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between">
                <div>
                    <div className="font-semibold text-f-text-default text-lg">{time}</div>
                    <div className="font-semibold text-f-text-light text-[14px]">
                        {date} | {shots} shots
                    </div>
                </div>
                <div className="relative  flex items-center text-f-text-default font-bold text-[15px] ">
                    <div>{point}</div>
                    <StarForString className="**:fill-f-default absolute -translate-y-1.75 -translate-x-3" />
                </div>
            </div>
            <RangeArr arr={shotsArr} all={shots} />
        </div>
    </Block>
);

//! Arr - shots logic [good,bad]-> [good,good+bad]
const RangeArr = ({ arr, all }: { arr: number[]; all: number }) => {
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
