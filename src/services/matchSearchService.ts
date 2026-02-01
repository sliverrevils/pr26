"use server";
import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import { IMatchesSearch, MatchesSearchModel } from "@/mongo/models/matchSearchModel";

export default async function getLastMathes({ count = 9 }: { count?: number } = {}): Promise<
    IMatchesSearch[]
> {
    try {
        connectDB();
        const matches = await MatchesSearchModel.find({
            score: { $ne: [0, 0] },
            generation: "current",
        })
            .sort({ date: -1 })
            .limit(count);
        const res = normalizeDbRes<IMatchesSearch[]>(matches);
        return res;
    } catch (error) {
        return [];
    }
}

interface SearchParams {
    country?: string;
    game?: string;
    playerSearch?: string;

    player?: string;
}

export async function findFilteredMatches({
    searchParams,
    page,
}: {
    searchParams: SearchParams;
    page: number;
}): Promise<IMatchesSearch[]> {
    const { country, game, playerSearch, player } = searchParams;

    const query: any = {
        score: { $ne: [0, 0] },
        generation: "current",
    };

    if (country) {
        query["event.country"] = country;
    }

    if (game) {
        query.game = game;
    }

    if (playerSearch) {
        query["opponents.name"] = {
            $regex: playerSearch,
            $options: "i",
        };
    }

    if (player) {
        query.players = player;
    }

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    try {
        await connectDB();

        const docs = await MatchesSearchModel.find(query)
            .sort({ _createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const res = normalizeDbRes<IMatchesSearch[]>(docs);
        console.log("➡️", searchParams, res.length);

        return res;
    } catch (error) {
        return [];
    }
}
