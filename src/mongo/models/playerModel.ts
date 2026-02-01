import { Model, Schema, model, models } from "mongoose";

export interface IPlayer {
    _id: string;

    name: string;
    name2: string;
    name3: string;
    nikname: string;

    alias: string;
    game: string;
    type: string; // "pool"

    country: string;

    date: Date;

    image: string;

    avatar: string;
    avatar200: string;
    avatar400: string;

    insta: string;

    status: string; // "active"

    hand: "left" | "right";

    top: boolean;
    proc: boolean;
    proceed: boolean;
    isLastUpdateChanged: boolean;

    temp: number;

    raiting: number;
    rate: number;
    rate19: number;
    rate20: number;
    rate21: number;
    rate22: number;

    fargo: string; // ❗ по факту string, хотя должно быть number

    shots: number;
    shots9: number;
    shots19: number;
    shots20: number;
    shots21: number;
    shots22: number;
    shotsAll: number;

    shotstime: number;
    tabletime: number;

    shotsarr: Record<string, number>;
    shotstimearr: Record<string, number>;
    tabletimearr: Record<string, number>;

    rects: number[];

    awards: any[];

    videos: string[];

    _createdAt: Date;
    _updatedAt: Date;
}

const PlayerSchema = new Schema(
    {
        _id: { type: String },

        name: { type: String },
        name2: { type: String },
        name3: { type: String },
        nikname: { type: String },

        alias: { type: String },
        game: { type: String },
        type: { type: String },

        country: { type: String },

        date: { type: Date },

        image: { type: String },

        avatar: { type: String },
        avatar200: { type: String },
        avatar400: { type: String },

        insta: { type: String },

        status: { type: String },

        hand: { type: String, enum: ["left", "right"] },

        top: { type: Boolean },
        proc: { type: Boolean },
        proceed: { type: Boolean },
        isLastUpdateChanged: { type: Boolean },

        temp: { type: Number },

        raiting: { type: Number },
        rate: { type: Number },
        rate19: { type: Number },
        rate20: { type: Number },
        rate21: { type: Number },
        rate22: { type: Number },

        fargo: { type: String }, // ❗ в базе строка

        shots: { type: Number },
        shots9: { type: Number },
        shots19: { type: Number },
        shots20: { type: Number },
        shots21: { type: Number },
        shots22: { type: Number },
        shotsAll: { type: Number },

        shotstime: { type: Number },
        tabletime: { type: Number },

        shotsarr: { type: Schema.Types.Mixed },
        shotstimearr: { type: Schema.Types.Mixed },
        tabletimearr: { type: Schema.Types.Mixed },

        rects: [{ type: Number }],

        awards: [{ type: Schema.Types.Mixed }],

        videos: [{ type: String }],

        _createdAt: { type: Date },
        _updatedAt: { type: Date },
    },
    {
        collection: "players",
        versionKey: false,
    },
);

export const PlayerModel: Model<IPlayer> =
    (models.Player as Model<IPlayer>) || model<IPlayer>("Player", PlayerSchema);
