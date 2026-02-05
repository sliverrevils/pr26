"use client";

import { HTMLAttributes, useRef, useState } from "react";

type Props = {
    file: File | null;
    newName?: string;
    fullData: boolean;
};

type Status = "Idle" | "Processing" | "Paused" | "Uploaded";

const statusColor: Record<Status, string> = {
    Idle: "text-f-text-light",
    Paused: "text-f-text-purple",
    Processing: "text-f-f-purple",
    Uploaded: "text-f-green-main",
};

export function VideoUploader({ file, newName = "uploaded_video", fullData }: Props) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<Status>("Idle");

    const [uploadedMB, setUploadedMB] = useState(0);
    const [totalMB, setTotalMB] = useState(0);

    const controllerRef = useRef<AbortController | null>(null);
    const uploadedBytesRef = useRef(0);

    const uploadChunk = async () => {
        if (!file) return;

        const controller = new AbortController();
        controllerRef.current = controller;

        setStatus("Processing");

        const chunk = file.slice(uploadedBytesRef.current);

        const ext = file.name.split(".").pop() || "";
        const finalName = `${newName}.${ext}`;

        const response = await fetch("/api/upload-video", {
            method: "POST",
            body: chunk,
            headers: {
                "X-File-Name": file.name,
                "X-New-File-Name": newName,
                "X-File-Ext": ext,
                "Content-Range": `bytes ${uploadedBytesRef.current}-${file.size - 1}/${file.size}`,
                "Content-Type": file.type,
            },
            signal: controller.signal,
        });

        if (!response.ok) {
            if (controller.signal.aborted) return;
            alert("Upload failed");
            return;
        }

        uploadedBytesRef.current = file.size;

        const uploadedMB = uploadedBytesRef.current / (1024 * 1024);
        const totalMB = file.size / (1024 * 1024);

        setUploadedMB(uploadedMB);
        setTotalMB(totalMB);

        setProgress(100);
        setStatus("Uploaded");
    };

    const startUpload = () => {
        if (!file) return;

        uploadedBytesRef.current = 0;
        setProgress(0);

        setUploadedMB(0);
        setTotalMB(file.size / (1024 * 1024));

        uploadChunk();
    };

    const pauseUpload = () => {
        controllerRef.current?.abort();
        setStatus("Paused");
    };

    const resumeUpload = () => {
        uploadChunk();
    };

    const resetUpload = () => {
        controllerRef.current?.abort();
        uploadedBytesRef.current = 0;
        setProgress(0);
        setUploadedMB(0);
        setTotalMB(0);
        setStatus("Idle");
    };

    return (
        <div className=" bg-white  w-full  flex flex-col gap-1 items-start">
            {/* PROGRESS BAR */}
            <div className="w-full h-1 bg-f-gray-button-disabled rounded-full overflow-hidden">
                <div
                    className="h-full bg-f-green-pressed transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* MB COUNTER */}
            {totalMB > 0 && (
                <div className="text-sm text-f-text-light">
                    {uploadedMB.toFixed(2)} MB of {totalMB.toFixed(2)} MB
                </div>
            )}

            {/* STATUS */}
            <div className={`text-sm ${statusColor[status]}`}>{status}</div>

            {/* BUTTONS */}
            <div className="flex gap-3 justify-center self-center">
                {status === "Idle" && (
                    <button
                        onClick={startUpload}
                        disabled={!fullData}
                        className="btn-blue-40  bg-purple-600 "
                    >
                        Upload
                    </button>
                )}

                {status === "Processing" && (
                    <button
                        onClick={pauseUpload}
                        className="btn-blue-40  bg-yellow-500 text-white "
                    >
                        Pause
                    </button>
                )}

                {status === "Paused" && (
                    <button onClick={resumeUpload} className="btn-blue-40  bg-blue-600 text-white ">
                        Resume
                    </button>
                )}

                {status === "Paused" && (
                    <button onClick={resetUpload} className="btn-blue-40  bg-gray-500 text-white ">
                        Reset
                    </button>
                )}
                {status === "Uploaded" && (
                    <button
                        onClick={resetUpload}
                        className="btn-blue-40  bg-f-green-pressed text-white self-center"
                    >
                        Complete
                    </button>
                )}
            </div>
        </div>
    );
}
