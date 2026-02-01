import { Model, Schema, model, models } from "mongoose";
export interface IPlayerSearch {
    _id: string;
    name: string;
    alias: string;
    playerId: string;
    generation: string;

    _createdAt: Date;
    _updatedAt: Date;
    date: Date;

    top: boolean;
    fargo: number;
    countryCode: string;

    avatarPath: string;
    avatar200Path: string;
    avatar400Path: string;

    notEnoughShotsToBeFavorite: boolean;

    shapingCompareStats: {
        otherStats: {
            longShotsPercentage: number;
            complexShotsPercentage: number;
            strongShotsPercentage: number;
        };
        cumulativeComplexity: {
            averageComplexity: number;
            cumulativePercentageByComplexity: string;
        };
        complexity: {
            averageComplexity: number;
            percentageByComplexity: string;
        };
        distance: {
            averageDistance: number;
            percentageByDistance: string;
        };
        speed: {
            averageSpeed: number;
            percentageBySpeed: string;
        };
    };

    profileStats: {
        shotsCount: number;
        accuracy: number;
        tactics: number;
    };
}

const PlayerSearchSchema = new Schema<IPlayerSearch>(
    {
        _id: { type: String },

        name: { type: String, required: true },
        alias: { type: String, required: true },
        playerId: { type: String, required: true },
        generation: { type: String, required: true },

        _createdAt: { type: Date, required: true },
        _updatedAt: { type: Date, required: true },
        date: { type: Date, required: true },

        top: { type: Boolean, default: false },
        fargo: { type: Number, required: true },
        countryCode: { type: String, required: true },

        avatarPath: { type: String },
        avatar200Path: { type: String },
        avatar400Path: { type: String },

        notEnoughShotsToBeFavorite: { type: Boolean },

        shapingCompareStats: {
            otherStats: {
                longShotsPercentage: Number,
                complexShotsPercentage: Number,
                strongShotsPercentage: Number,
            },
            cumulativeComplexity: {
                averageComplexity: Number,
                cumulativePercentageByComplexity: String,
            },
            complexity: {
                averageComplexity: Number,
                percentageByComplexity: String,
            },
            distance: {
                averageDistance: Number,
                percentageByDistance: String,
            },
            speed: {
                averageSpeed: Number,
                percentageBySpeed: String,
            },
        },

        profileStats: {
            shotsCount: Number,
            accuracy: Number,
            tactics: Number,
        },
    },
    {
        collection: "playersSearch",
        versionKey: false,
    },
);

export const PlayerSearchModel: Model<IPlayerSearch> =
    (models.PlayerSearch as Model<IPlayerSearch>) ||
    model<IPlayerSearch>("PlayerSearch", PlayerSearchSchema);
