"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AsideMenu from "../../menus/AsideMenu/AsideMenu";

type HeaderMenu = {
    title: string;
    path: string;
    selected: boolean;
};

export function SideMenu({
    isOpen,
    onClose,
    headerMenu,
}: {
    isOpen: boolean;
    onClose: () => void;
    headerMenu: HeaderMenu[];
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
                        className="fixed left-5 top-5  w-72 bg-white z-50 rounded-2xl py-10 shadow-2xl p-4 flex flex-col"
                        initial={{ x: "-120%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-120%" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    >
                        <AsideMenu
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
