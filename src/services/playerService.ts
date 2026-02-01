"use server";

import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import { IPlayer, PlayerModel } from "@/mongo/models/playerModel";

export const findTopPlayers = async (): Promise<IPlayer[]> => {
    try {
        await connectDB();
        const players = (await PlayerModel.find({ top: true })).sort(
            (a, b) => Number(b.fargo || 0) - Number(a.fargo || 0),
        );
        return normalizeDbRes<IPlayer[]>(players);
    } catch (error) {
        return [];
    }
};

export const findPlayerByAlias = async (alias: string) => {
    try {
        await connectDB();
        const player = await PlayerModel.findOne({ alias });
        return normalizeDbRes<IPlayer | null>(player);
    } catch (error) {
        return null;
    }
};
