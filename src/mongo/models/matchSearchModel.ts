import { Model, Schema, model, models } from "mongoose";

export interface IMatchesSearch {
    _id: string;

    _createdAt: Date;
    _updatedAt: Date;

    players: string[];

    game: string; // "9"

    date: Date;

    width: number;
    height: number;
    fps: number;

    champ: string;

    score: [number, number];

    shots: number;

    isWithoutShotsImages: boolean;

    event: {
        _id: string;
        name: string;
        date: Date;
        country: string;
        countryCode: string;
        imagePath: string;
        eventId: string;
        generation: string;
        _createdAt: Date;
        _updatedAt: Date;
    };

    opponents: Array<{
        _id: string;
        name: string;
        alias: string;
        date: Date;
        _createdAt: Date;
        _updatedAt: Date;

        top: boolean;
        fargo: number;

        avatarPath: string;
        avatar200Path: string;
        avatar400Path: string;

        countryCode: string;

        notEnoughShotsToBeFavorite?: boolean; // есть только у первого
        shapingCompareStats: null;

        profileStats: {
            shotsCount: number;
            accuracy: number;
            tactics: number;
        };

        playerId: string;
        generation: string;

        matchStats: {
            shots: number;
            tableTimeInSeconds: number;
            avgCompexity: number;
            avgShotDurationInSeconds: number;
            potting: number;
            innings: number;
            safety: number;
            runOuts: number;
        };
    }>;

    videoId: string;
    generation: "generated" | "current";
}

export type IOponent = IMatchesSearch["opponents"][0];

const ProfileStatsSchema = new Schema(
    {
        shotsCount: { type: Number, required: true },
        accuracy: { type: Number, required: true },
        tactics: { type: Number, required: true },
    },
    { _id: false },
);

const MatchStatsSchema = new Schema(
    {
        shots: { type: Number, required: true },
        tableTimeInSeconds: { type: Number, required: true },
        avgCompexity: { type: Number, required: true },
        avgShotDurationInSeconds: { type: Number, required: true },
        potting: { type: Number, required: true },
        innings: { type: Number, required: true },
        safety: { type: Number, required: true },
        runOuts: { type: Number, required: true },
    },
    { _id: false },
);

const OpponentSchema = new Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        alias: { type: String, required: true },
        date: { type: Date, required: true },
        _createdAt: { type: Date, required: true },
        _updatedAt: { type: Date, required: true },

        top: { type: Boolean, required: true },
        fargo: { type: Number, required: true },

        avatarPath: { type: String, required: true },
        avatar200Path: { type: String, required: true },
        avatar400Path: { type: String, required: true },

        countryCode: { type: String, required: true },

        notEnoughShotsToBeFavorite: { type: Boolean, required: false },
        shapingCompareStats: { type: Schema.Types.Mixed, default: null },

        profileStats: { type: ProfileStatsSchema, required: true },

        playerId: { type: String, required: true },
        generation: { type: String, required: true },

        matchStats: { type: MatchStatsSchema, required: true },
    },
    { _id: false },
);

const EventSchema = new Schema(
    {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        date: { type: Date, required: true },
        country: { type: String, required: true },
        countryCode: { type: String, required: true },
        imagePath: { type: String, required: true },
        eventId: { type: String, required: true },
        generation: { type: String, required: true },
        _createdAt: { type: Date, required: true },
        _updatedAt: { type: Date, required: true },
    },
    { _id: false },
);

export const MatchesSearchSchema = new Schema<IMatchesSearch>({
    _id: { type: String, required: true },

    _createdAt: { type: Date, required: true },
    _updatedAt: { type: Date, required: true },

    players: { type: [String], required: true },

    game: { type: String, required: true },

    date: { type: Date, required: true },

    width: { type: Number, required: true },
    height: { type: Number, required: true },
    fps: { type: Number, required: true },

    champ: { type: String, required: true },

    score: {
        type: [Number],
        required: true,
        validate: {
            validator: (v: number[]) => v.length === 2,
            message: "score must contain exactly 2 numbers",
        },
    },

    shots: { type: Number, required: true },

    isWithoutShotsImages: { type: Boolean, required: true },

    event: { type: EventSchema, required: true },

    opponents: { type: [OpponentSchema], required: true },

    videoId: { type: String, required: true },

    generation: {
        type: String,
        enum: ["generated", "current"],
        required: true,
    },
});

export const MatchesSearchModel: Model<IMatchesSearch> =
    (models.MatchesSearch as Model<IMatchesSearch>) ||
    model<IMatchesSearch>("MatchesSearch", MatchesSearchSchema, "matchesSearch");
