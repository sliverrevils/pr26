"use client";

import Block from "@/components/common/Block/Block";
import View from "@/components/common/View/View";
import { IReport } from "@/mongo/models/reportsModel";

import styles from "./raports.module.scss";
import clsx from "clsx";
import dayjs from "dayjs";

export default function RaportList({ raports }: { raports: IReport[] }) {
    return (
        <div className={clsx("flex flex-col gap-5", styles.base)}>
            {raports.map((raport) => (
                <div key={raport._id}>
                    <Block className="bg-f-gray-4 ">
                        <div className="text-[12px] text-right text-f-text-light font-bold">
                            {dayjs(raport._createdAt).format("DD.MM.YYYY  HH:MM")}
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: raport.content }}></div>
                    </Block>
                </div>
            ))}
        </div>
    );
}
