"use client";

import Block from "@/components/common/Block/Block";
import Image from "next/image";
import WorkoutsFilter from "./WorkoutsFilter";
import WorkoutsList from "./WorkoutsList";
import { useState } from "react";
import { Modal } from "@/components/common/Modal/Modal";
import AddWorkout from "./AddWorkout/AddWorkout";

export default function Workouts() {
    const [isAddWorkout, setIsAddWorkout] = useState(false);
    return (
        <div className="flex flex-col gap-8">
            <Block className="bg-f-purple-transparent flex items-center gap-3.75">
                <Image src={"/png/new_work.png"} alt="new_work" width={60} height={60} />
                <div className="flex-1 text-lg text-f-text-default font-bold">New workout</div>
                <div
                    className="btn-blue-40"
                    onClick={() => {
                        setIsAddWorkout(() => true);
                    }}
                >
                    Add
                </div>
            </Block>

            <Modal isOpen={isAddWorkout} onClose={() => setIsAddWorkout(() => false)}>
                <AddWorkout />
            </Modal>

            <WorkoutsFilter />
            <WorkoutsList />
        </div>
    );
}
