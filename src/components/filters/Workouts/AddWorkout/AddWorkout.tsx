"use client";

import Block from "@/components/common/Block/Block";
import { FolderPlusIco, LinkIco, WorkoutsSvg } from "@/icons/iconsSvg";
import { useMemo, useState } from "react";
import { UploadVideo } from "./UpoadVideo";

const BUTTONS = [
    {
        idx: 1,
        icon: <FolderPlusIco />,
        title: "Upload video",
        about: "Select video from gallery",
        content: <UploadVideo />,
    },
    {
        idx: 2,
        icon: <LinkIco />,
        title: "Share video link",
        about: "Select video from youtube",
        content: <div>Share video</div>,
    },
    {
        idx: 3,
        icon: <WorkoutsSvg />,
        title: "Capture video",
        about: "Capture and upload",
        content: <div>Capture video</div>,
    },
];

export default function AddWorkout() {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(0);

    const ContentManeger = useMemo(() => {
        if (page === 1) {
            return (
                <div className="flex flex-col gap-4 w-full">
                    {BUTTONS.map((btn, idx) => (
                        <ButtonItem
                            key={btn.title}
                            {...btn}
                            onClick={() => setSelected(() => idx + 1)}
                            className={
                                selected === btn.idx ? "bg-f-purple-transparent" : " bg-f-gray-4"
                            }
                        />
                    ))}
                </div>
            );
        }

        return BUTTONS[selected - 1].content;
    }, [selected, page, setSelected]);
    return (
        <div className="flex flex-col gap-8 w-100 max-w-100">
            <div className="flex flex-col gap-4">
                <div className="text-f-text-default text-center text-[20px] font-bold">
                    ADD WORKOUT
                </div>
                <div className="w-full  h-1 flex gap-0.5">
                    <div className="flex-1 h-full bg-f-purple rounded-full" />
                    <div
                        className={`flex-1 h-full rounded-full ${page > 1 ? "bg-f-purple" : "bg-f-gray-2"}`}
                    />
                </div>
            </div>
            {ContentManeger}
            <button
                className="btn-blue-50 disabled:bg-f-gray-button-disabled disabled:opacity-100 self-center"
                onClick={() => setPage((state) => (state === 1 ? state + 1 : state - 1))}
                disabled={!!!selected}
            >
                {page > 1 ? "Back" : "Next"}
            </button>
        </div>
    );
}

const ButtonItem = ({
    about,
    icon,
    title,
    className,
    onClick,
}: (typeof BUTTONS)[0] & { onClick: () => void; className: string }) => (
    <Block
        onClick={onClick}
        className={`flex gap-4.5 items-center w-full cursor-pointer 
                ${className}
                `}
    >
        <div>{icon}</div>
        <div className="w-full flex flex-col ">
            <div className="text-f-text-default text-lg font-semibold">{title}</div>
            <div className="text-f-text-default text-[14px font-semibold]">{about}</div>
        </div>
    </Block>
);
