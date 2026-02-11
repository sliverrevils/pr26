"use client";

import { PieChart } from "@/components/charts/PieChart";
import Block from "@/components/common/Block/Block";
import { IStats } from "@/mongo/models/drillsModel";
import Image from "next/image";

export function TableStats({ pockets }: IStats) {
    if (!pockets) return false;
    return (
        <Block className="relative p-5 bg-f-gray-4 ">
            <Image width={380} height={205} src={"/svg/table.svg"} alt="table" />
            <div className="text-[14px] text-f-purple font-bold absolute left-3 bottom-2">
                {pockets[0].count}
            </div>
            <div className="text-[14px] text-f-purple font-bold absolute left-1/2 -translate-x-1/2 bottom-1">
                {pockets[1].count}
            </div>
            <div className="text-[14px] text-f-purple font-bold absolute right-3 bottom-2">
                {pockets[2].count}
            </div>

            <div className="text-[14px] text-f-purple font-bold absolute left-3 top-2">
                {pockets[3].count}
            </div>
            <div className="text-[14px] text-f-purple font-bold absolute left-1/2 -translate-x-1/2 top-1">
                {pockets[4].count}
            </div>
            <div className="text-[14px] text-f-purple font-bold absolute right-3 top-2">
                {pockets[5].count}
            </div>

            <PieChart
                className="absolute bottom-8 left-8"
                data={[
                    { name: "acc", value: pockets[0].acc || 0 },
                    { name: "acc1", value: 100 },
                ]}
                colors={["#7FCCB6", "#FA5C7C"]}
                size={(pockets[0].acc || 30) / 1.7}
            />
            <PieChart
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                data={[
                    { name: "acc", value: pockets[1].acc || 0 },
                    { name: "acc1", value: 100 },
                ]}
                colors={["#7FCCB6", "#FA5C7C"]}
                size={(pockets[1].acc || 30) / 1.7}
            />
            <PieChart
                className="absolute bottom-8 right-8 "
                data={[
                    { name: "acc", value: pockets[2].acc || 0 },
                    { name: "acc1", value: 100 },
                ]}
                colors={["#7FCCB6", "#FA5C7C"]}
                size={(pockets[2].acc || 30) / 1.7}
            />

            <PieChart
                className="absolute top-8 left-8"
                data={[
                    { name: "acc", value: pockets[3].acc || 0 },
                    { name: "acc1", value: 100 },
                ]}
                colors={["#7FCCB6", "#FA5C7C"]}
                size={(pockets[3].acc || 30) / 1.7}
            />
            <PieChart
                className="absolute top-8 left-1/2 -translate-x-1/2"
                data={[
                    { name: "acc", value: pockets[4].acc || 0 },
                    { name: "acc1", value: 100 },
                ]}
                colors={["#7FCCB6", "#FA5C7C"]}
                size={(pockets[4].acc || 30) / 1.7}
            />
            <PieChart
                className="absolute top-8 right-8 "
                data={[
                    { name: "acc", value: pockets[5].acc || 0 },
                    { name: "acc1", value: 100 },
                ]}
                colors={["#7FCCB6", "#FA5C7C"]}
                size={(pockets[5].acc || 30) / 1.7}
            />
        </Block>
    );
}
