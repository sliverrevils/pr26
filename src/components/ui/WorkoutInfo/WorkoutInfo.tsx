"use client";
import dayjs from "dayjs";
import { Match } from "../Match/Match";
import { IMatchesSearch } from "@/mongo/models/matchSearchModel";
import { ArrowLeft, EventIco } from "@/icons/iconsSvg";
import { Flag } from "@/components/common/Flag/Flag";
import { useRouter } from "next/navigation";
import StatRange from "../StatRange/StatRange";
import { IDrill, IStats } from "@/mongo/models/drillsModel";
import Block from "@/components/common/Block/Block";
import Image from "next/image";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PieChart } from "@/components/charts/PieChart";
import { TableStats } from "../TableStats/TableStats";

export default function WorkoutInfo({ drill }: { drill: IDrill }) {
    if (!drill) return false;
    const { back } = useRouter();
    const { date, durationStr, stats } = drill;

    return (
        <div className="flex flex-col gap-4  rounded-2xl bg-white overflow-hidden p-5">
            <div className="flex items-center justify-between">
                <div className="p-1.75 bg-f-gray-4 rounded-xl cursor-pointer" onClick={back}>
                    <ArrowLeft />
                </div>
                <div className="flex flex-col items-center">
                    <div className="font-bold text-f-default text-[20px] ">WORKOUTS</div>
                    <div className="font-normal text-f-text-default text-[14px]">
                        {dayjs(date).format("DD.MM.YYYY HH:MM")}
                    </div>
                </div>
                <div className="p-1.75  rounded-xl"> </div>
            </div>
            <Block className="bg-f-green-transparent2 flex justify-between items-center">
                <Image
                    src={"/png/rec_work.png"}
                    width={60}
                    height={60}
                    alt="rec"
                    className="self-center"
                />
                <div className="text-f-text-default text-lg font-semibold">{durationStr}</div>
                <div className="btn-40 bg-f-green-main text-white">Details</div>
            </Block>
            <div className="grid grid-cols-2 gap-4">
                <Block className="bg-f-gray-4 flex flex-col gap-4">
                    <div className="p-4 pb-0">
                        <CircularProgressbar
                            value={stats?.accuracy || 0}
                            maxValue={100}
                            text={`${stats?.accuracy || 0}%`}
                            styles={buildStyles({
                                textColor: "#7876F2",
                                trailColor: "#E1E6EE",
                                pathColor: "#7876F2",
                                textSize: 22,
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="text-xl text-f-green-main font-bold">Accuracy</div>
                        <div className="text-[14px] text-f-text-light font-semibold">
                            {stats?.miss || 0} miss | {stats?.made || 0} made
                        </div>
                    </div>
                </Block>
                <Block className="bg-f-gray-4 flex flex-col gap-4">
                    <div className="p-4 pb-0">
                        <CircularProgressbar
                            value={stats?.positioning || 0}
                            maxValue={100}
                            text={`${stats?.positioning || 0}%`}
                            styles={buildStyles({
                                textColor: "#7876F2",
                                trailColor: "#E1E6EE",
                                pathColor: "#7876F2",
                            })}
                        />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <div className="text-xl text-f-purple font-bold">Positioning</div>
                        <div className="text-[14px] text-f-text-light font-semibold">
                            form {stats?.shots || 0} shots
                        </div>
                    </div>
                </Block>
                <Block className="bg-f-gray-4 flex flex-col items-center gap-2">
                    <div className="text-f-complexity-purple text-xl font-bold">Performance</div>
                    <div className="text-f-purple text-[22px] font-bold">{stats?.performance}</div>
                </Block>
                <Block className="bg-f-gray-4 flex flex-col items-center gap-2">
                    <div className="text-f-complexity-purple text-xl font-bold text-nowrap">
                        Shot duration
                    </div>
                    <div className="text-f-purple text-[22px] font-bold">{stats?.duration} s</div>
                </Block>
            </div>
            <Block className="flex gap-4.5 bg-f-gray-4">
                <PieChart
                    size={128}
                    colors={["#616A72", "#FF912B", "#9747FF", "#3BC21F", "#3E7A75"]}
                    data={[
                        { name: "Shots", value: stats?.shots || 0 },
                        { name: "Strong", value: stats?.strong || 0 },
                        { name: "Complex", value: stats?.complex || 0 },
                        { name: "Long", value: stats?.long || 0 },
                        { name: "Breaks", value: stats?.breaks || 0 },
                    ]}
                />
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className=" text-base font-bold text-f-text-default">Shots</div>
                    <div className=" text-base font-bold text-f-text-default">
                        {stats?.shots || 0}
                    </div>
                    <div className=" text-base font-bold text-f-orange-standart">Strong</div>
                    <div className=" text-base font-bold text-f-orange-standart">
                        {stats?.strong || 0}
                    </div>
                    <div className=" text-base font-bold text-f-complexity-purple">Complex</div>
                    <div className=" text-base font-bold text-f-complexity-purple">
                        {stats?.complex || 0}
                    </div>
                    <div className=" text-base font-bold text-f-green-distance">Long</div>
                    <div className=" text-base font-bold text-f-green-distance">
                        {stats?.long || 0}
                    </div>
                    <div className=" text-base font-bold text-f-green-dark">Breaks</div>
                    <div className=" text-base font-bold text-f-green-dark">
                        {stats?.breaks || 0}
                    </div>
                </div>
            </Block>
            <TableStats {...stats!} />
        </div>
    );
}
