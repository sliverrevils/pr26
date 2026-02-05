import { DeleteIco } from "@/icons/iconsSvg";
import { PropsWithChildren, useCallback, useRef, useState } from "react";
import clsx from "clsx";

type Props = PropsWithChildren & {
    onFileSelect: (file: File | null) => void;
};

export function VideoDropzone({ onFileSelect, children }: Props) {
    const [fileName, setFileName] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(
        (files: FileList | null) => {
            if (!files || files.length === 0) return;

            const file = files[0];

            if (!file.type.startsWith("video/")) {
                alert("Only video files are allowed");
                return;
            }

            setFileName(file.name);
            onFileSelect(file);
        },
        [onFileSelect],
    );

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const onClick = () => {
        !fileName && inputRef.current?.click();
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (inputRef.current) {
            inputRef.current.value = ""; // ← ключевой момент
        }
        setFileName(null);
        onFileSelect(null);
    };

    return (
        <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={onClick}
            className={clsx(
                "w-full  border-f-gray-5 rounded-xl p-4 text-center cursor-pointer ",
                !fileName ? "border-2 border-dashed" : "border border-solid ",
            )}
        >
            <input
                ref={inputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
            />

            {fileName ? (
                <div>
                    <div className="flex gap-4 items-center justify-between">
                        <div className="w-full flex flex-col">
                            <div className="text-f-text-default text-base font-medium">
                                {fileName}
                            </div>
                            {children}
                        </div>

                        <DeleteIco onClick={reset} />
                    </div>
                </div>
            ) : (
                <div className="text-gray-500">
                    <b>Drag & drop a video</b> file here or <b>click</b> to select
                </div>
            )}
        </div>
    );
}
