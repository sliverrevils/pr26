"use client";

import Date from "@/components/common/Date/Date";
import Select from "@/components/common/Select/Select";

export default function WorkoutsFilter() {
    return (
        <div className="flex gap-4 *:flex-1">
            <Date placeholder="Choose Date" />
            <Select options={[{ label: "Workouts", value: "workouts" }]} searchFiled={false} />
        </div>
    );
}
