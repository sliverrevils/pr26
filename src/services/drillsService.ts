"use server";
import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import DrillModel, { IDrill } from "@/mongo/models/drillsModel";

export async function getDrillsByUserId({ userId }: { userId: string }): Promise<IDrill[]> {
    try {
        await connectDB();
        const res = await DrillModel.find({ user: userId }).limit(5);
        const drills = normalizeDbRes<IDrill[]>(res);
        // console.log("Drills ➡️", userId, drills);
        return drills;
    } catch (error) {
        return [];
    }
}

export async function getDrillById({ _id }: { _id: string }): Promise<IDrill | null> {
    try {
        await connectDB();
        const res = await DrillModel.findOne({ _id });
        const drill = normalizeDbRes<IDrill>(res);
        // console.log("Drills ➡️", _id, drill);
        return drill;
    } catch (error) {
        return null;
    }
}
