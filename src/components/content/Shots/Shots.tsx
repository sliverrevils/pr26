"use client";

import { BallSpin } from "@/components/common/BallSpin/BallSpin";
import Block from "@/components/common/Block/Block";
import View from "@/components/common/View/View";
import { roundNumber, shotToPercent } from "@/helpers/numbersHelpers";
import { DevBlock } from "@/helpers/testHelpers";
import {
    ArrLeftIco,
    ArrowLeft,
    ArrowRightIco,
    ArrRightIco,
    DeleteIco,
    LinkIco,
} from "@/icons/iconsSvg";
import { IStats } from "@/mongo/models/drillsModel";
import { IShot } from "@/mongo/models/shotsModel";
import { getShotsByVideoId } from "@/services/shotsService";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

export default function Shots({ video, view }: { video: string; view: "workout" | "match" }) {
    const [shots, setShots] = useState<IShot[]>([]);
    const [racks, setRacks] = useState<IShot[][]>([]);
    const [selectedShot, setSelectedShot] = useState<IShot | null>(null);
    const [selectedRackIndex, setSelectedRackIndex] = useState(0);

    useEffect(() => {
        getShotsByVideoId(video).then((shotsData) => {
            if (shotsData.length) {
                if (view === "match") {
                    let racks: IShot[][] = [];
                    let index = 0;

                    shotsData.forEach((shot, idx) => {
                        if (shot.type === "break" && idx) {
                            index += 1;
                        }
                        racks[index] = [...(racks[index] || []), shot];
                    });

                    if (racks.length) {
                        setRacks(() => racks);
                        setSelectedRackIndex(() => 1);
                    }

                    return;
                }

                setShots(() => shotsData);
                setSelectedShot(shotsData[0]);
            }
        });
    }, []);

    useEffect(() => {
        if (racks.length && selectedRackIndex) {
            setShots(() => racks[selectedRackIndex]);
            setSelectedShot(() => racks[selectedRackIndex][0]);
        }
    }, [selectedRackIndex, racks]);

    const changeShot = useCallback(
        (side: boolean) => {
            if (selectedShot && shots.length) {
                const curIdx = shots.findIndex((shot) => shot._id === selectedShot._id);

                setSelectedShot((prev) =>
                    side
                        ? curIdx - 1 >= 0
                            ? shots[curIdx - 1]
                            : prev
                        : shots.length - 2 >= curIdx
                          ? shots[curIdx + 1]
                          : prev,
                );
            }
        },
        [shots, selectedShot, setSelectedShot],
    );

    const changeRack = useCallback(
        (side: boolean) => {
            if (selectedRackIndex && racks.length) {
                setSelectedRackIndex((prev) =>
                    side ? (prev > 1 ? prev - 1 : prev) : prev < racks.length - 1 ? prev + 1 : prev,
                );
            }
        },
        [selectedRackIndex, racks, shots],
    );

    const blockColor = (shot: IShot, selected: boolean) => {
        if (shot.type === "break") {
            return selected ? "bg-[#7876F2]" : "bg-[#E9E7FF]";
        }
        if (shot.r === 1) {
            return selected ? "bg-[#7FCCB6]" : "bg-[#D6EFED]";
        }
        if (shot.r === 2) {
            return selected ? "bg-[#FA5C7C]" : "bg-[#FFE1E7]";
        }
        if (shot.r === 0) {
            return selected ? "bg-[#85878A]" : "bg-[#F3F6FB]";
        }

        return selected ? "bg-[#85878A]" : "bg-[#F3F6FB]"; //! default unknown
    };

    return (
        <div className="w-full flex flex-col gap-5">
            <View gap={false} className="gap-2">
                <div className="w-full flex flex-col items-center">
                    <h2 className="text-center text-xl font-bold text-f-default">
                        {view === "workout" ? "WORKOUTS" : `RACK ${selectedRackIndex}`}
                    </h2>
                    <div className="text-[14px] text-f-text-purple">{shots.length} shots</div>
                </div>
                {!!shots.length && (
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="text-[14px] text-f-text-default">
                            Tap a tile to watch any shot
                        </div>
                        <div className="w-full flex ">
                            {!!selectedRackIndex && (
                                <div className="  bg-f-gray-4 p-1 rounded-full aspect-square cursor-pointer select-none">
                                    <ArrLeftIco onClick={() => changeRack(true)} />
                                </div>
                            )}

                            <div className="flex-1 flex gap-1.25 flex-wrap justify-center">
                                {selectedShot &&
                                    shots.map((shot) => (
                                        <div
                                            key={shot._id + "_shotBtn"}
                                            className={clsx(
                                                `w-7 h-7 rounded-lg  cursor-pointer transition-all`,

                                                blockColor(shot, shot._id === selectedShot?._id),
                                            )}
                                            onClick={() => setSelectedShot(() => shot)}
                                        ></div>
                                    ))}
                            </div>
                            {!!selectedRackIndex && (
                                <div className="  bg-f-gray-4 p-1 rounded-full aspect-square cursor-pointer select-none">
                                    <ArrRightIco onClick={() => changeRack(false)} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </View>
            {selectedShot && (
                <View>
                    <h2 className="text-center text-xl font-bold text-f-default">
                        SHOT №{shots.findIndex((shot) => shot._id === selectedShot._id) + 1}
                    </h2>
                    <Block className="flex justify-center gap-4 text-[12px] font-bold text-f-text-default bg-f-gray-4">
                        <div className="">AI ANALYSIS</div>
                        <div className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-f-green-pressed rounded-full"></div>
                            <div>
                                Shot confidence:{" "}
                                <span className="text-f-green-pressed">
                                    {Math.round((selectedShot?.conf || 0) * 10) / 10}
                                </span>
                                %
                            </div>
                        </div>
                    </Block>

                    <div className=" relative flex-1 w-full aspect-video flex items-center justify-center bg-f-gray-4 rounded-xl overflow-hidden">
                        <Image
                            src={`https://img.performstars.com/${video}/${selectedShot._id}/img.jpg`}
                            width={372}
                            height={278}
                            alt="player"
                            className="w-full h-full object-cover rounded-xl p-1"
                        />
                        <div className="absolute left-2 top-1/2 bg-white p-1 rounded-full aspect-square cursor-pointer select-none">
                            <ArrLeftIco onClick={() => changeShot(true)} />
                        </div>
                        <div className="absolute right-2 top-1/2 bg-white p-1 rounded-full aspect-square cursor-pointer select-none">
                            <ArrRightIco onClick={() => changeShot(false)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <BallSpin stats={selectedShot.stats} />
                        <div className="grid grid-cols-2 gap-4">
                            <Block className="flex flex-col gap-1 items-center justify-center bg-f-gray-4">
                                <div className="text-lg font-bold text-f-orange-standart">
                                    Speed
                                </div>
                                <div className="text-lg font-semibold text-f-text-default">
                                    {selectedShot.stats?.speed || 0} m/s
                                </div>
                            </Block>
                            <Block className="flex flex-col gap-1 items-center justify-center bg-f-gray-4">
                                <div className="text-lg font-bold text-f-text-grey-brown">Ang</div>
                                <div className="text-lg font-semibold text-f-text-default">
                                    {selectedShot.stats?.cueTargetAngle || 0} deg
                                </div>
                            </Block>
                            <Block className="flex flex-col gap-1 items-center justify-center bg-f-gray-4">
                                <div className="text-lg font-bold text-f-complexity-purple">
                                    Complex
                                </div>
                                <div className="text-lg font-semibold text-f-text-default">
                                    {selectedShot.stats?.complex || 0} stars
                                </div>
                            </Block>
                            <Block className="flex flex-col gap-1 items-center justify-center bg-f-gray-4">
                                <div className="text-lg font-bold text-f-green-distance">Dist.</div>
                                <div className="text-lg font-semibold text-f-text-default">
                                    {selectedShot.stats?.cueTargetDist || 0} m
                                </div>
                            </Block>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex gap-4">
                                <Block className="flex-1 flex flex-col gap-1 items-center justify-center bg-f-gray-4 ">
                                    <div className="text-lg font-bold text-f-green-main">Made</div>
                                    <div className="text-lg font-semibold text-f-text-default">
                                        {Math.round((selectedShot?.made || 0) * 10) / 10} %
                                    </div>
                                </Block>
                                <Block className="flex-1  flex flex-col gap-1 items-center justify-center bg-f-gray-4">
                                    <div className="text-lg font-bold text-f-red-main">Miss</div>
                                    <div className="text-lg font-semibold text-f-text-default">
                                        {Math.round((selectedShot?.miss || 0) * 10) / 10} %
                                    </div>
                                </Block>
                            </div>
                            <div className="flex-1 w-full aspect-video flex items-center justify-center bg-f-gray-4 rounded-xl overflow-hidden">
                                <Image
                                    src={`https://img.performstars.com/${video}/${selectedShot._id}/shm.jpg`}
                                    width={372}
                                    height={278}
                                    alt="schema"
                                    className="w-full h-full object-contain rounded-xl p-1 outline "
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-4">
                            <div className="flex-1 w-full aspect-video flex items-center justify-center bg-f-gray-4 rounded-xl overflow-hidden">
                                <Image
                                    src={`https://img.performstars.com/${video}/${selectedShot._id}/plr.jpg`}
                                    width={372}
                                    height={278}
                                    alt="player"
                                    className="w-full h-full object-contain rounded-xl p-1"
                                />
                            </div>
                            <div className="flex gap-4">
                                <Block className="flex-1 flex flex-col gap-1 items-center justify-center bg-f-gray-4 ">
                                    <LinkIco />
                                </Block>
                                <Block className="flex-1  flex flex-col gap-1 items-center justify-center bg-f-gray-4">
                                    <DeleteIco />
                                </Block>
                            </div>
                        </div>
                    </div>
                </View>
            )}
        </div>
    );
}
