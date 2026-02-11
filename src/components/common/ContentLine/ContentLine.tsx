"use client";
import Image from "next/image";
type Props = {
    imgUrl: string;
    textGray: string;
    textBlue: string;
    about?: string;
};
export default function ContentLine({ imgUrl, textBlue, textGray, about = "" }: Props) {
    return (
        <div className="w-full flex flex-col mb-11.5 mt-2">
            <Image
                src={imgUrl}
                width={69}
                height={58}
                alt={textGray + textBlue}
                className="self-center"
            />

            <div className="flex">
                <div className="flex-1 flex items-center">
                    <div className="h-px bg-f-default w-full" />
                </div>
                <div className="w-96.5  flex gap-2 justify-center">
                    <div className="text-[28.8px] font-extrabold text-[#6C757D]">{textGray}</div>
                    <div className="text-[28.8px] font-extrabold text-f-purple"> {textBlue}</div>
                </div>
                <div className="flex-1 flex items-center">
                    <div className="h-px bg-f-default w-full" />
                </div>
            </div>
            {about && (
                <div className="self-center mt-5 max-w-228 text-[19.2px] text-center font-normal text-f-default">
                    {about}
                </div>
            )}
        </div>
    );
}
