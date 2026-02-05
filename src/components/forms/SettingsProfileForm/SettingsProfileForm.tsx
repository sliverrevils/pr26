"use client";

import Choose from "@/components/common/Choose/Choose";
import Input from "@/components/common/Input/Input";
import Toggle from "@/components/common/Toggle/Toggle";
import { IUser } from "@/mongo/models/userModel";
import { updateUser } from "@/services/userService";
import { ChangeEvent, useState } from "react";

export default function SettingsProfileForm({ user }: { user: IUser }) {
    const [fields, setFields] = useState({
        cueWeight: user?.cueWeight ?? "",
        cueTipSize: user?.cueTipSize ?? "",
        tableSize: user?.tableSize ?? "",
        shareWorkoutStats: user?.shareWorkoutStats ?? false,
        cueBrand: user?.cueBrand ?? "",
        shotsAmountForCalculating: user?.shotsAmountForCalculating ?? 0,
        lengthUnit: user?.lengthUnit ?? "m",
    });

    // const changeFieldValue = <T>(field: keyof typeof fields, value: ) => {
    //     setFields((state) => ({ ...state, [field]: value }));
    // };

    const changeFieldValue = async <T,>(field: keyof typeof fields, value: T) => {
        setFields((state) => ({ ...state, [field]: value }));
        await updateUser({ newData: { [field]: value } });
    };

    const changeInputField = async (
        field: keyof typeof fields,
        e: ChangeEvent<HTMLInputElement>,
    ) => {
        setFields((state) => ({ ...state, [field]: e.target.value }));
    };

    const blurInputField = async (field: keyof typeof fields, e: ChangeEvent<HTMLInputElement>) => {
        await updateUser({ newData: { [field]: e.target.value } });
    };

    return (
        <>
            <form className="flex flex-col gap-y-5 text-f-default">
                <h2 className="text-center text-xl font-semibold">SETTINGS</h2>

                <div className="grid grid-cols-2 gap-x-5 gap-y-6">
                    <Choose
                        value={fields.cueWeight}
                        onChange={changeFieldValue.bind(null, "cueWeight")}
                        title="Cue weighting, oz"
                        chooseText="Weighting"
                        options={[
                            { label: "<10", value: "<10" },
                            { label: "10-15", value: "10-15" },
                            { label: ">15", value: ">15" },
                        ]}
                    />
                    <Input
                        value={fields.cueBrand}
                        onChange={changeInputField.bind(null, "cueBrand")}
                        title="Сue brand"
                        placeholder="Your cue brand"
                        onBlur={blurInputField.bind(null, "cueBrand")}
                    />
                    <Choose
                        value={fields.cueTipSize}
                        onChange={changeFieldValue.bind(null, "cueTipSize")}
                        title="Cue tip diametr"
                        chooseText="Cue tip"
                        options={[
                            { label: "<10", value: "<10" },
                            { label: "10-14", value: "10-14" },
                            { label: ">14", value: ">14" },
                        ]}
                    />
                    <Choose
                        value={fields.shotsAmountForCalculating}
                        onChange={changeFieldValue.bind(null, "shotsAmountForCalculating")}
                        title="Training intensity per week, in hours"
                        chooseText="Intensity"
                        options={[
                            { label: "3h, low", value: 150 },
                            { label: "5h, mid", value: 300 },
                            { label: "10h, high", value: 600 },
                        ]}
                    />
                    <Choose
                        value={fields.tableSize}
                        onChange={changeFieldValue.bind(null, "tableSize")}
                        title="Table size"
                        chooseText="Table size"
                        options={[
                            { label: "7ft", value: "7ft" },
                            { label: "8ft", value: "8ft" },
                            { label: "9ft", value: "9ft" },
                            { label: "10ft", value: "10ft" },
                        ]}
                    />
                    <Choose
                        value={fields.lengthUnit}
                        onChange={changeFieldValue.bind(null, "lengthUnit")}
                        title="Lenght unit"
                        chooseText="Lenght unit"
                        options={[
                            { label: "meters", value: "m" },
                            { label: "feet", value: "ft" },
                        ]}
                    />
                    <Toggle
                        value={fields.shareWorkoutStats}
                        onChange={changeFieldValue.bind(null, "shareWorkoutStats")}
                        title="Set workouts privacy policy"
                        toggleText="Share workouts stats"
                    />
                    {/* //TODO Favorite player SELECT по players */}
                </div>
            </form>
            {process.env.NODE_ENV === "development" && (
                <pre className="text-f-gray-3">{JSON.stringify(fields, null, 2)}</pre>
            )}
        </>
    );
}
