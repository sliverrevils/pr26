import { Flag } from "@/components/common/Flag/Flag";
import { ArrowTopRightGreen, StarForString } from "@/icons/iconsSvg";
import { IUser } from "@/mongo/models/userModel";
import dayjs from "dayjs";
import Image from "next/image";
import { Avatar } from "../Avatar/Avatar";
import { truncateText } from "@/helpers/stringFncs";
import CoachingBackground from "./CoachingBackground";
import CoachingContent from "./CoachingContent";
import clsx from "clsx";

export default function UserInfo({
    user,
    isCoaching = false,
}: {
    user: IUser;
    isCoaching?: boolean;
}) {
    return (
        <div
            className={clsx("flex flex-col rounded-2xl bg-white ", isCoaching ? "gap-0" : " gap-9")}
        >
            <div className="w-full h-40 bg-(image:--gradient-PurpleTopBottom) relative rounded-t-2xl ">
                <Image
                    src={"/png/userBgDefault.Black.png"}
                    width={388}
                    height={160}
                    alt="userBg"
                    className="opacity-20 w-full h-full object-cover absolute rounded-t-2xl "
                />
                {isCoaching ? (
                    <CoachingBackground
                        className="p-4"
                        favoritePlayers={user?.favoritePlayers || []}
                    />
                ) : (
                    <div className="flex items-start gap-4  translate-y-7 w-87 h-full px-4">
                        <Avatar human={user} size="big" />

                        <div className=" flex-1 h-full flex justify-between gap-2 items-center -translate-y-4 text-white">
                            <div className="relative">
                                <div className="font-semibold">
                                    <span>Performance</span>
                                    <StarForString className="absolute -top-2.5 -left-3" />
                                </div>
                                <div className="flex items-center gap-2 text-lg absolute -bottom-4 right-1/2 translate-x-1/2 translate-y-1/2">
                                    <ArrowTopRightGreen />
                                    <div className="text-[38px] font-semibold">754</div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="font-semibold">Place</div>
                                <div className="text-lg absolute -bottom-6 right-1/2 translate-x-1/2">
                                    10
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isCoaching ? (
                <CoachingContent className="p-5" />
            ) : (
                <div className="flex flex-col gap-1 items-center p-5 pt-0 text-f-default">
                    <div className="flex items-center gap-2 text-lg font-bold">
                        {user?.countryCode && (
                            <Flag code={user.countryCode} sizeBig className="rounded-sm" />
                        )}
                        <div className="text-center">{user?.name}</div>
                    </div>
                    {user?.date && (
                        <div className="text-base font-bold">
                            {user.gender}, {dayjs().year() - dayjs(user.date).year()}
                        </div>
                    )}

                    {user?.description && (
                        <div className="font-medium text-center">
                            {truncateText(user.description, 150)}
                        </div>
                    )}
                    {user?.socialLink && (
                        <div className="font-medium text-f-purple text-center">
                            {user.socialLink}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
