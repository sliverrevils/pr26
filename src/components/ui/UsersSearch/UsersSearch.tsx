"use client";
import Input from "@/components/common/Input/Input";
import { IUserAfterSearch, searchUsersByName } from "@/services/userService";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Avatar } from "../Avatar/Avatar";
import Link from "next/link";
import { PATHES } from "@/config/pathes";

export default function UsersSearch({ className = "" }: { className?: string }) {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState<IUserAfterSearch[]>([]);
    const [isShowResults, setIsShowResults] = useState(false);

    const [searchDebounced] = useDebounce(search, 300);

    useEffect(() => {
        if (!searchDebounced.trim()) {
            setUsers([]);
            return;
        }
        searchUsersByName(searchDebounced).then(setUsers);
    }, [searchDebounced]);

    return (
        <div className={`relative ${className}`}>
            <Input
                placeholder="Search user"
                className="bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsShowResults(true)}
                onBlur={() => {
                    setTimeout(() => setIsShowResults(false), 150);
                }}
            />

            {!!users.length && isShowResults && (
                <div
                    className="flex flex-col py-2  max-h-100 max-w-full  bg-white absolute  z-20 overflow-y-scroll cursor-pointer border-f-gray-5
                                rounded-tr-xl rounded-tl-xl rounded-bl-2xl rounded-br-2xl  shadow-2xl
                                "
                >
                    {users.map((user) => (
                        <Link
                            href={PATHES.users.path + user._id}
                            key={user._id}
                            className="flex items-center gap-2 p-2 hover:bg-f-purple-transparent"
                        >
                            <Avatar human={user} size="small" />
                            <div className="text-[14px] font-bold text-f-text-default">
                                {user.name}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
