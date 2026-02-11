"use server";

import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import { IVideo, VideoModel } from "@/mongo/models/videosModel";

export const getVideoById = async ({ _id }: { _id: string }): Promise<IVideo | null> => {
    try {
        await connectDB();
        const videoDoc = await VideoModel.findOne({ _id });

        const res = normalizeDbRes<IVideo | null>(videoDoc);
        console.log("Video➡️", res);
        return res;
    } catch (error) {
        return null;
    }
};
