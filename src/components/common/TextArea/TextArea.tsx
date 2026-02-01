"use client";

import { TextareaHTMLAttributes, forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type AutoResizeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    title?: string;
    requiredTitle?: boolean;
    minRows?: number;
    maxHeight?: number;
    error?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
    (
        {
            error,
            title,
            requiredTitle,
            minRows = 1,
            maxHeight = 300,
            className,
            onChange,
            ...props
        },
        ref,
    ) => {
        const innerRef = useRef<HTMLTextAreaElement | null>(null);

        useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const el = innerRef.current;
            if (el) {
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
            }

            // ❗ КРИТИЧЕСКИ ВАЖНО
            onChange?.(e);
        };
        useEffect(() => {
            const el = innerRef.current;
            if (el) {
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
            }
        }, []);

        return (
            <div className="flex flex-col gap-1 relative">
                {title && (
                    <div className="flex gap-1 text-base">
                        <span className="text-f-default">{title}</span>
                        {requiredTitle && <span className="text-f-purple">*</span>}
                    </div>
                )}

                <textarea
                    ref={innerRef}
                    rows={minRows}
                    onChange={handleChange}
                    {...props}
                    className={`
                        w-full resize-none overflow-hidden rounded-xl border p-4
                        leading-relaxed text-f-default text-base
                        focus:outline-f-purple
                        ${error ? "border-f-red-main focus:outline-f-red-main" : "border-f-gray-5"}
                        ${className ?? ""}
                    `}
                />

                {error && (
                    <div className="absolute left-0 bottom-0 translate-y-full text-f-red-main text-xs">
                        {error}
                    </div>
                )}
            </div>
        );
    },
);

TextArea.displayName = "TextArea";

export default TextArea;

// "use client";

// import { TextareaHTMLAttributes, useRef } from "react";

// type AutoResizeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
//     value?: string;
//     onChange?: (value: string) => void;
//     title?: string;
//     requiredTitle?: boolean;
//     minRows?: number;
//     maxHeight?: number;
//     error?: string;
// };

// export default function TextArea({
//     error,
//     title,
//     requiredTitle,
//     onChange,
//     placeholder,
//     minRows = 1,
//     maxHeight = 300,
//     ...textAreaProps
// }: AutoResizeTextareaProps) {
//     const textareaRef = useRef<HTMLTextAreaElement | null>(null);

//     const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         const el = textareaRef.current;
//         if (!el) return;

//         el.style.height = "auto"; // сбрасываем
//         el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;

//         onChange && onChange(e.target.value);
//     };

//     return (
//         <div className="flex flex-col gap-1 relative">
//             {title && (
//                 <div className="flex gap-1">
//                     <span className="text-f-default">{title}</span>
//                     {requiredTitle && <span className="text-f-purple">*</span>}
//                 </div>
//             )}
//             <textarea
//                 ref={textareaRef}
//                 rows={minRows}
//                 {...textAreaProps}
//                 onChange={handleChange}
//                 className={`
//                      w-full resize-none overflow-hidden rounded-xl border border-f-gray-5 p-4 leading-relaxed text-f-default text-base focus:outline-f-purple
//                     ${!!error ? "border-f-red-main" : "border-f-gray-5"} ${error && "focus:outline-f-red-main"} ${error && "focus:outline-f-red-main"}
//       `}
//             />
//             {error && (
//                 <div className=" absolute left-0 bottom-0 translate-y-full text-f-red-main text-xs">
//                     {error}
//                 </div>
//             )}
//         </div>
//     );
// }
