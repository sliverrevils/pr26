"use client";
import { PATHES } from "@/config/pathes";
import { WinnerIco } from "@/icons/iconsSvg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Avatar = ({
    human,
    size,
    className,
    showFargo = false,
    showCorona = true,
    showName = false,
    link = false,
    nameStyle = "",
}: {
    human: Partial<{
        name?: string;
        gender?: "Male" | "Female" | "Other";
        top?: boolean;
        avatar?: string;
        avatar200?: string;
        avatar400?: string;
        avatarPath?: string;
        avatar200Path?: string;
        avatar400Path?: string;
        country?: string;
        countryCode?: string;
        fargo?: number;
        alias?: string;
    }>;
    size: "big" | "small" | "oponent" | "favorite";
    className?: string;
    showFargo?: boolean;
    showCorona?: boolean;
    showName?: boolean;
    link?: boolean;
    nameStyle?: string;
}) => {
    const [avaLoadError, setAvaLoadError] = useState(false);
    const Tag = link ? Link : "div";
    return (
        <Tag
            href={PATHES.player.path + human.alias}
            className={`relative flex flex-col gap-1.5  w-fit  cursor-pointer ${className}`}
        >
            <div
                className={` aspect-square relative   rounded-full border-white  bg-f-gray-3 overflow-hidden                            
                            ${
                                !(human.gender === "Other" || !human.gender)
                                    ? human.gender === "Male"
                                        ? "bg-(image:--gradient-PurpleIconLeftRightIcon)"
                                        : "bg-(image:--gradient-PurpleIcon)"
                                    : human.country || human.countryCode
                                      ? "bg-white"
                                      : size === "big"
                                        ? "bg-(image:--gradient-PurpleTopBottom)"
                                        : "bg-transparent"
                            }
                            ${size === "small" ? "w-10 border-2" : ""}
                            ${size === "big" ? "w-40 border-5" : ""}                            
                            ${size === "oponent" ? "w-25 " : ""}                     
                            ${size === "favorite" ? "w-13.5 " : ""}                     
                            
                            `}
            >
                <div className="bg-white">
                    {(human.countryCode || human.country) &&
                        ((!human?.avatar200 &&
                            !human?.avatar200Path &&
                            !human?.avatar400 &&
                            !human?.avatar400Path &&
                            !human?.avatar &&
                            !human?.avatarPath) ||
                            avaLoadError) && (
                            <Image
                                src={`/svg/flags/4x3/${(human?.countryCode || human?.country)?.toLowerCase()}.svg`}
                                width={386}
                                height={332}
                                alt="country"
                                className="object-cover w-full h-full absolute top-0 left-0 right-0 bottom-0 opacity-80"
                                unoptimized
                                onError={(e) => {
                                    e.currentTarget.src = `/svg/flags/4x3/${(human?.countryCode || human?.country)?.toLowerCase()}.svg`;
                                }}
                            />
                        )}
                    <Image
                        src={
                            human?.avatar200 ||
                            human?.avatar200Path ||
                            human?.avatar400 ||
                            human?.avatar400Path ||
                            human?.avatar ||
                            human?.avatarPath ||
                            ((human?.gender || "Male") === "Female"
                                ? "/svg/avaDefaultFemale.svg"
                                : "/svg/avaDefaultMale.svg")
                        }
                        unoptimized
                        onError={(e) => {
                            e.currentTarget.src =
                                (human?.gender || "Male") === "Female"
                                    ? "/svg/avaDefaultFemale.svg"
                                    : "/svg/avaDefaultMale.svg";
                            setAvaLoadError(() => true);
                        }}
                        width={386}
                        height={332}
                        alt="humanAvatar"
                        className={`object-cover w-full h-full absolute top-0 left-0 right-0 bottom-0 
                        ${size === "big" || size === "oponent" ? "filter drop-shadow-[5px_5px_0px_#00000064]" : ""}
                `}
                    />
                </div>
            </div>
            {showName && (
                <div
                    className={`text-center self-center max-w-25 text-f-default text-[16px] font-bold text-wrap
                                ${nameStyle}
                                `}
                >
                    {human.name}
                </div>
            )}
            {showCorona && human.top && !showFargo && (
                <div className="absolute text-f-purple font-bold  rounded-lg px-1 ">
                    <WinnerIco />
                </div>
            )}
            {showFargo && (
                <div className="absolute text-f-purple font-bold bg-f-gray-1 rounded-lg px-1 -left-2 ">
                    {human.fargo}
                </div>
            )}
        </Tag>
    );
};
