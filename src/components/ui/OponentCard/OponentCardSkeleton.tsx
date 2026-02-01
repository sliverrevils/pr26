"use client";

export default function OponentCardSkeletont() {
    return (
        <div className="flex flex-col gap-1.5 max-w-25 relative animate-pulse">
            {/* Winner icon placeholder */}
            <div className="absolute top-0 left-0 h-5 w-5 rounded-md bg-f-gray-3" />

            {/* Avatar */}
            <div className="w-25 h-25 rounded-full bg-f-gray-3" />

            {/* Name */}
            <div className="h-4 w-20 mx-auto rounded-md bg-f-gray-3" />
        </div>
    );
}
