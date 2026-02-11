"use client";

import { useRef, useState } from "react";

const VIDEO_SERVER_URL = process.env["VIDEO_SERVER_URL"] || "//video.performstars.com";
const SITE_PANEL_URL = process.env["SITE_PANEL_URL"] || "http://185.251.90.124:3009";

type Props = {
    file: File | null;
    userId: string;
    token: string;
    videoLink: string; // итоговый URL видео (как будет доступно с фронта)
    clientFileName: string; // имя файла, которое видел пользователь
    tableSize?: string; // '9ft' и т.п.
    dateISO: string; // дата в ISO (jiffyDate.format())
};

const CHUNK_SIZE = 5 * 1024 * 1024; // 5 MB

export function VideoUploader({
    file,
    userId,
    token,
    videoLink,
    clientFileName,
    tableSize = "9ft",
    dateISO,
}: Props) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"idle" | "processing" | "paused" | "done" | "error">(
        "idle",
    );
    const [uploadedMB, setUploadedMB] = useState(0);
    const [totalMB, setTotalMB] = useState(0);
    const [message, setMessage] = useState<string | null>(null);

    const controllerRef = useRef<AbortController | null>(null);
    const uploadedBytesRef = useRef(0);
    const currentChunkIndexRef = useRef(0);
    const fileIdRef = useRef<string | null>(null);
    const isPausedRef = useRef(false);

    const resetState = () => {
        controllerRef.current?.abort();
        uploadedBytesRef.current = 0;
        currentChunkIndexRef.current = 0;
        fileIdRef.current = null;
        isPausedRef.current = false;
        setProgress(0);
        setUploadedMB(0);
        setTotalMB(0);
        setStatus("idle");
        setMessage(null);
    };

    const getRandomId = async (): Promise<string> => {
        const res = await fetch(`http://144.124.234.36:3003/api/video/getRandomId`, {
            method: "POST",
        });
        if (!res.ok) throw new Error("Failed to get videoId");
        const json = await res.json();
        if (!json.data || typeof json.data !== "string") {
            throw new Error("Invalid getRandomId response");
        }
        return json.data;
    };

    const uploadAllChunks = async () => {
        if (!file) return;

        setStatus("processing");
        setMessage("Uploading chunks...");

        const ext = file.name.split(".").pop() || "mp4";
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const totalBytes = file.size;
        setTotalMB(totalBytes / (1024 * 1024));

        if (!fileIdRef.current) {
            fileIdRef.current = await getRandomId();
        }
        const fileId = fileIdRef.current;
        console.log("fileId", fileId);
        const videoType = "drill";

        for (let i = currentChunkIndexRef.current; i < totalChunks; i++) {
            if (isPausedRef.current) {
                setStatus("paused");
                setMessage("Upload paused");
                return;
            }

            const start = i * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, totalBytes);
            const chunkBlob = file.slice(start, end);
            const chunkSize = end - start;

            const controller = new AbortController();
            controllerRef.current = controller;

            const headers: Record<string, string> = {
                "uploader-videotype": videoType,
                "uploader-file-id": fileId!,
                "uploader-chunks-total": String(totalChunks),
                "uploader-chunk-number": String(i),
                "uploader-filename": `file_${fileId}_${i}.${ext}`,
            };

            const formData = new FormData();
            formData.append("videoType", videoType);
            formData.append("fileId", fileId!);
            formData.append("file", chunkBlob, `file_${fileId}_${i}.${ext}`);

            const res = await fetch(`https://video.performstars.com/api/video/uploadVideo_new`, {
                method: "POST",
                headers,
                body: formData,
                signal: controller.signal,
            });

            if (!res.ok) {
                if (controller.signal.aborted) {
                    setStatus("paused");
                    setMessage("Upload aborted");
                    return;
                }
                setStatus("error");
                setMessage("Chunk upload failed");
                throw new Error("Chunk upload failed");
            }

            uploadedBytesRef.current += chunkSize;
            currentChunkIndexRef.current = i + 1;

            const uploadedMB = uploadedBytesRef.current / (1024 * 1024);
            const totalMB = totalBytes / (1024 * 1024);
            setUploadedMB(uploadedMB);
            setTotalMB(totalMB);
            setProgress((uploadedBytesRef.current / totalBytes) * 100);
        }

        setMessage("Assembling video...");
        const assembleRes = await fetch(`${VIDEO_SERVER_URL}/api/video/assembleVideo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                _id: fileIdRef.current,
                filename: file.name,
            }),
        });

        if (!assembleRes.ok) {
            setStatus("error");
            setMessage("Assemble video failed");
            throw new Error("Assemble video failed");
        }

        const uploadVideoResult = await assembleRes.json();

        setMessage("Registering in DB...");
        const dataForServer: any = {
            upload: {
                ...uploadVideoResult,
                path: videoLink,
                live: false,
                date: dateISO,
                absoluteLocalFilePath: "", // в браузере пути нет, можно оставить пустым
                clientFileName,
                year: new Date(dateISO).getFullYear(),
                day: (() => {
                    const d = new Date(dateISO);
                    const start = new Date(d.getFullYear(), 0, 0);
                    const diff =
                        d.getTime() -
                        start.getTime() +
                        (start.getTimezoneOffset() - d.getTimezoneOffset()) * 60 * 1000;
                    return Math.floor(diff / (1000 * 60 * 60 * 24));
                })(),
                videoType: "drill",
                gameType: "pool",
                tableSize,
                download: true,
            },
            auth: {
                user_id: userId,
                token,
            },
        };

        const registerRes = await fetch(`${SITE_PANEL_URL}/api/videos/registerDrillPrelim`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataForServer),
        });

        if (!registerRes.ok) {
            setStatus("error");
            setMessage("DB registration failed");
            throw new Error("DB registration failed");
        }

        setStatus("done");
        setMessage("Upload completed and registered");
    };

    const startUpload = async () => {
        if (!file) return;
        resetState();
        try {
            await uploadAllChunks();
        } catch (e) {
            console.error(e);
        }
    };

    const pauseUpload = () => {
        isPausedRef.current = true;
        controllerRef.current?.abort();
        setStatus("paused");
        setMessage("Upload paused");
    };

    const resumeUpload = async () => {
        if (!file) return;
        isPausedRef.current = false;
        try {
            await uploadAllChunks();
        } catch (e) {
            console.error(e);
        }
    };

    const resetUpload = () => {
        resetState();
    };

    return (
        <div className="mt-6 p-4 border rounded-xl bg-white shadow-sm">
            <div className="text-sm text-gray-600 mb-1">
                Status: <b>{status}</b>
            </div>
            {message && <div className="text-xs text-gray-500 mb-2">{message}</div>}

            {totalMB > 0 && (
                <div className="text-sm text-gray-700 mb-2">
                    {uploadedMB.toFixed(2)} MB / {totalMB.toFixed(2)} MB
                </div>
            )}

            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-purple-500 transition-all"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex gap-3">
                {status === "idle" && (
                    <button
                        onClick={startUpload}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg"
                    >
                        Start upload
                    </button>
                )}

                {status === "processing" && (
                    <button
                        onClick={pauseUpload}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                        Pause
                    </button>
                )}

                {status === "paused" && (
                    <button
                        onClick={resumeUpload}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Resume
                    </button>
                )}

                {(status === "paused" || status === "done" || status === "error") && (
                    <button
                        onClick={resetUpload}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
}

//!TO MY ROOT
// "use client";

// import { HTMLAttributes, useRef, useState } from "react";

// type Props = {
//     file: File | null;
//     newName?: string;
//     fullData: boolean;
// };

// type Status = "Idle" | "Processing" | "Paused" | "Uploaded";

// const statusColor: Record<Status, string> = {
//     Idle: "text-f-text-light",
//     Paused: "text-f-text-purple",
//     Processing: "text-f-f-purple",
//     Uploaded: "text-f-green-main",
// };

// export function VideoUploader({ file, newName = "uploaded_video", fullData }: Props) {
//     const [progress, setProgress] = useState(0);
//     const [status, setStatus] = useState<Status>("Idle");

//     const [uploadedMB, setUploadedMB] = useState(0);
//     const [totalMB, setTotalMB] = useState(0);

//     const controllerRef = useRef<AbortController | null>(null);
//     const uploadedBytesRef = useRef(0);

//     const uploadChunk = async () => {
//         if (!file) return;

//         const controller = new AbortController();
//         controllerRef.current = controller;

//         setStatus("Processing");

//         const chunk = file.slice(uploadedBytesRef.current);

//         const ext = file.name.split(".").pop() || "";
//         const finalName = `${newName}.${ext}`;

//         const response = await fetch("/api/upload-video", {
//             method: "POST",
//             body: chunk,
//             headers: {
//                 "X-File-Name": file.name,
//                 "X-New-File-Name": newName,
//                 "X-File-Ext": ext,
//                 "Content-Range": `bytes ${uploadedBytesRef.current}-${file.size - 1}/${file.size}`,
//                 "Content-Type": file.type,
//             },
//             signal: controller.signal,
//         });

//         if (!response.ok) {
//             if (controller.signal.aborted) return;
//             alert("Upload failed");
//             return;
//         }

//         uploadedBytesRef.current = file.size;

//         const uploadedMB = uploadedBytesRef.current / (1024 * 1024);
//         const totalMB = file.size / (1024 * 1024);

//         setUploadedMB(uploadedMB);
//         setTotalMB(totalMB);

//         setProgress(100);
//         setStatus("Uploaded");
//     };

//     const startUpload = () => {
//         if (!file) return;

//         uploadedBytesRef.current = 0;
//         setProgress(0);

//         setUploadedMB(0);
//         setTotalMB(file.size / (1024 * 1024));

//         uploadChunk();
//     };

//     const pauseUpload = () => {
//         controllerRef.current?.abort();
//         setStatus("Paused");
//     };

//     const resumeUpload = () => {
//         uploadChunk();
//     };

//     const resetUpload = () => {
//         controllerRef.current?.abort();
//         uploadedBytesRef.current = 0;
//         setProgress(0);
//         setUploadedMB(0);
//         setTotalMB(0);
//         setStatus("Idle");
//     };

//     return (
//         <div className=" bg-white  w-full  flex flex-col gap-1 items-start">
//             {/* PROGRESS BAR */}
//             <div className="w-full h-1 bg-f-gray-button-disabled rounded-full overflow-hidden">
//                 <div
//                     className="h-full bg-f-green-pressed transition-all"
//                     style={{ width: `${progress}%` }}
//                 />
//             </div>

//             {/* MB COUNTER */}
//             {totalMB > 0 && (
//                 <div className="text-sm text-f-text-light">
//                     {uploadedMB.toFixed(2)} MB of {totalMB.toFixed(2)} MB
//                 </div>
//             )}

//             {/* STATUS */}
//             <div className={`text-sm ${statusColor[status]}`}>{status}</div>

//             {/* BUTTONS */}
//             <div className="flex gap-3 justify-center self-center">
//                 {status === "Idle" && (
//                     <button
//                         onClick={startUpload}
//                         disabled={!fullData}
//                         className="btn-blue-40  bg-purple-600 "
//                     >
//                         Upload
//                     </button>
//                 )}

//                 {status === "Processing" && (
//                     <button
//                         onClick={pauseUpload}
//                         className="btn-blue-40  bg-yellow-500 text-white "
//                     >
//                         Pause
//                     </button>
//                 )}

//                 {status === "Paused" && (
//                     <button onClick={resumeUpload} className="btn-blue-40  bg-blue-600 text-white ">
//                         Resume
//                     </button>
//                 )}

//                 {status === "Paused" && (
//                     <button onClick={resetUpload} className="btn-blue-40  bg-gray-500 text-white ">
//                         Reset
//                     </button>
//                 )}
//                 {status === "Uploaded" && (
//                     <button
//                         onClick={resetUpload}
//                         className="btn-blue-40  bg-f-green-pressed text-white self-center"
//                     >
//                         Complete
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// }
