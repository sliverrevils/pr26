"use client";

import Block from "@/components/common/Block/Block";
import Image from "next/image";
import clsx from "clsx";
import { StarForString } from "@/icons/iconsSvg";
import { roundNumber } from "@/helpers/numbersHelpers";
import { IDrill } from "@/mongo/models/drillsModel";
import { DevBlock } from "@/helpers/testHelpers";
import dayjs from "dayjs";
import { RangeShots } from "@/components/ui/RangeShots/RangeShots";
import Link from "next/link";
import { PATHES } from "@/config/pathes";

export default function WorkoutsList({ drills }: { drills: IDrill[] }) {
    let datesArr: string[] = [];

    return (
        <div className="flex flex-col gap-4">
            {drills.map((drill, idx) => {
                const { date, _id } = drill;
                const dateStr = dayjs(date).format("DD.MM.YYYY");
                const isNewDate = !datesArr.includes(dateStr);
                datesArr = [...new Set([...datesArr, dateStr])];
                return (
                    <>
                        {isNewDate && (
                            <div className="text-f-text-default text-lg text-center font-bold mt-8">
                                {dateStr}
                            </div>
                        )}
                        <WorkoutRecord
                            key={_id + "_workouts"}
                            {...drill}
                            className="cursor-pointer"
                        />
                    </>
                );
            })}
        </div>
    );
}

const WorkoutRecord = ({
    _id,
    className = "",
    date,
    shots,
    durationStr,
    process,
    good,
    bad,
    status,
    stats,
    err,
}: IDrill & { className?: string }) => {
    const isComplete = !err;
    const Tag = isComplete ? Link : "div";
    return (
        <Tag href={PATHES.workout.path + _id}>
            <Block
                className={clsx(
                    "flex gap-4",
                    className,
                    !isComplete ? "bg-f-red-transparent" : "bg-f-green-transparent2",
                )}
            >
                <Image
                    src={"/png/rec_work.png"}
                    width={60}
                    height={60}
                    alt="rec"
                    className="self-center"
                />
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between">
                        <div>
                            <div className="font-semibold text-f-text-default text-lg">
                                {durationStr}
                            </div>
                            {isComplete ? (
                                <div className="font-semibold text-f-text-light text-[14px]">
                                    {dayjs(date).format("h:mm:ss")} | {shots} shots
                                </div>
                            ) : (
                                <div className="font-semibold text-f-text-light text-[14px]">
                                    {status}
                                </div>
                            )}
                        </div>
                        <div className="relative  flex items-center text-f-text-default font-bold text-[15px] ">
                            <div>{stats?.performance || 0}</div>
                            <StarForString className="**:fill-f-default absolute -translate-y-1.75 -translate-x-3" />
                        </div>
                    </div>
                    <RangeShots arr={[good, bad]} all={shots} />
                </div>
            </Block>
        </Tag>
    );
};
