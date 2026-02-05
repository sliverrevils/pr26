"use server";

import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import { IPlayerSearch, PlayerSearchModel } from "@/mongo/models/playersSearchModel";

export const findTopPlayers = async (): Promise<IPlayerSearch[]> => {
    try {
        await connectDB();
        const players = await PlayerSearchModel.aggregate([
            { $match: { top: true } },
            {
                $group: {
                    _id: "$name",
                    doc: { $first: "$$ROOT" },
                },
            },
            { $replaceRoot: { newRoot: "$doc" } },
            { $sort: { fargo: -1 } },
        ]);

        return normalizeDbRes<IPlayerSearch[]>(players);
    } catch (error) {
        return [];
    }
};

export const findPlayerByAlias = async (alias: string) => {
    try {
        await connectDB();
        const player = await PlayerSearchModel.findOne({ alias });
        return normalizeDbRes<IPlayerSearch | null>(player);
    } catch (error) {
        return null;
    }
};
