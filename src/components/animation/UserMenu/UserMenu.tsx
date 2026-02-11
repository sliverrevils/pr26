"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileMenu from "../../menus/ProfileMenu/ProfileMenu";
import { IUser } from "@/mongo/models/userModel";
import { Avatar } from "@/components/ui/Avatar/Avatar";

export function UserMenu({
    isOpen,
    onClose,
    user,
}: {
    isOpen: boolean;
    onClose: () => void;
    user: IUser | null;
}) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/30 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                    />

                    <motion.aside
                        className="fixed right-5 top-5  w-72 bg-white z-50 rounded-2xl py-10 shadow-2xl p-4 flex flex-col items-center"
                        initial={{ x: "120%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "120%" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                        <Avatar human={user!} size="big" showName />
                        <div className="text-f-gray-3">{user?.email}</div>
                        <ProfileMenu
                            user={user}
                            onClick={() => {
                                onClose();
                            }}
                        />
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
