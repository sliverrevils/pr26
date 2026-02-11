"use client";

import Choose from "@/components/common/Choose/Choose";
import Date from "@/components/common/Date/Date";

import { useState } from "react";
import { VideoUploader } from "./VideoUploader";
import { VideoDropzone } from "./VideoDropzone";
import { IUser } from "@/mongo/models/userModel";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";

export function UploadVideo() {
    const [tableSize, setTableSize] = useState("");
    const [date, setDate] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const { data, status } = useSession();
    if (status === "loading") return <p>Загрузка...</p>;
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
                <VideoUploader
                    file={file}
                    userId={data?.user.id!}
                    token={"bs0pm9a724ua"}
                    clientFileName={file?.name!}
                    dateISO={dayjs().toISOString()}
                    tableSize={tableSize}
                    videoLink="/test"
                />
            </VideoDropzone>
        </div>
    );
}
