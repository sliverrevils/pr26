"use client";

import Del from "@/assets/svg/delete.svg";
import Block from "@/components/common/Block/Block";

import Choose from "@/components/common/Choose/Choose";
import Date from "@/components/common/Date/Date";
import { DeleteIco } from "@/icons/iconsSvg";
import { PropsWithChildren, useCallback, useRef, useState } from "react";
import { VideoUploader } from "./VideoUploader";
import { VideoDropzone } from "./VideoDropzone";

export const UploadVideo: React.FC = () => {
    const [tableSize, setTableSize] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState<File | null>(null);
    return (
        <div className="w-full flex flex-col gap-4 items-center">
            <div className="flex flex-col items-center">
                <div className="text-[14px] font-medium text-f-text-default">Table size</div>
                <Choose
                    value={tableSize}
                    onChange={(size) => setTableSize(String(size))}
                    classNameWrap="bg-white border-0"
                    options={[
                        { label: "7ft", value: "7ft" },
                        { label: "8ft", value: "8ft" },
                        { label: "9ft", value: "9ft" },
                        { label: "10ft", value: "10ft" },
                    ]}
                />
            </div>
            <Date placeholder="Choose Date" mainDateValue={date} setMainDate={setDate} />
            <VideoDropzone onFileSelect={setFile}>
                <VideoUploader file={file} fullData={!!tableSize && !!file} />
            </VideoDropzone>
        </div>
    );
};
