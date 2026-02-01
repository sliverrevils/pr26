"use client";

import { PATHES } from "@/config/pathes";
import { signOut } from "next-auth/react";

function LogOutBtn() {
    return (
        <button
            className="bg-white rounded-full h-10 px-7.5 cursor-pointer"
            onClick={() => signOut({ redirectTo: PATHES.signIn.path })}
        >
            Log out
        </button>
    );
}

export { LogOutBtn };
