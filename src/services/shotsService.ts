"use server";

import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import { IShot, ShotsModel } from "@/mongo/models/shotsModel";

export const getShotsByVideoId = async (video: string): Promise<IShot[]> => {
    try {
        await connectDB();
        const shotDocs = await ShotsModel.find({ video }).select("-pointsCloud");
        if (!shotDocs.length) return [];
        const res = normalizeDbRes<IShot[]>(shotDocs);
        // console.log("Shots ➡️", res);
        return res;
    } catch (error) {
        return [];
    }
};
