import { IUser } from "@/mongo/models/userModel";
import Image from "next/image";

export const UserAvatar = ({ user, size }: { user: IUser; size: "big" | "small" }) => (
    <div
        className={` aspect-square relative   rounded-full border-white  bg-f-gray-3 overflow-hidden                            
                            ${
                                user.gender !== "Other"
                                    ? user.gender === "Male"
                                        ? "bg-(image:--gradient-PurpleIconLeftRightIcon)"
                                        : "bg-(image:--gradient-PurpleIcon)"
                                    : size === "big"
                                      ? "bg-(image:--gradient-PurpleTopBottom)"
                                      : "bg-transparent"
                            }
                            ${size === "big" ? "w-40 border-5" : "w-10 border-2"}
                            `}
    >
        <div className="bg-white">
            {user.countryCode && !user?.avatar200 && !user?.avatar400 && !user?.avatar && (
                <Image
                    src={`/svg/flags/4x3/${user.countryCode?.toLowerCase()}.svg`}
                    width={386}
                    height={332}
                    alt="country"
                    className="object-cover w-full h-full absolute top-0 left-0 right-0 bottom-0 "
                />
            )}
            <Image
                src={
                    user?.avatar200 ||
                    user?.avatar400 ||
                    user?.avatar ||
                    (user.gender === "Female"
                        ? "/svg/avaDefaultFemale.svg"
                        : "/svg/avaDefaultMale.svg")
                }
                width={386}
                height={332}
                alt="userAvatar"
                className={`object-cover w-full h-full absolute top-0 left-0 right-0 bottom-0 
                ${size === "big" ? "filter drop-shadow-[5px_5px_0px_#00000032]" : ""}
                `}
            />
        </div>
    </div>
);
