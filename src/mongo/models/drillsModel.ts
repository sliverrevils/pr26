import { Schema, model, models, Types, Document, Model } from "mongoose";

/* ---------------------- TS TYPES ---------------------- */

export interface IPoint {
    x: number;
    y: number;
}

export interface ICameraMap {
    image: string;
    frame: number;
    points: IPoint[];
    rails: number[];
    tableArea: number;
    tableConf: number;
    filling: number;
}

export interface IGeoProfile {
    country_name: string | null;
    country_code: string | null;
    city: string | null;
    region?: string | null;
    status?: number | null;
}

export interface IPocketStat {
    count: number;
    acc: number | null;
}

export interface IStats {
    shots: number;
    miss: number;
    made: number;
    complex: number;
    strong: number;
    long: number;
    accuracy: number;
    positioning: number | null;
    performance: number;
    breaks: number;
    duration: number;
    pockets: IPocketStat[];
}

export interface IDrill {
    _id: string;

    path: string;
    fps: number;
    orientation: number;
    duration: number;
    durationMs: number;
    title: string;
    durationStr: string;
    frames: number;
    width: number;
    height: number;
    live: boolean;

    date: Date;

    clientFileName: string;
    table: boolean;
    manualTable: boolean;
    year: number;
    day: number;

    videoType: string;
    tableSize: string;
    gameType: string;

    camerasMap: ICameraMap[];

    user: string;
    ipv4: string;

    geoFromProfile: IGeoProfile;
    geoByIp: IGeoProfile;

    slave: number;
    shots: number;
    good: number;
    bad: number;

    description: string;

    _createdAt: Date;
    _updatedAt: Date;
    _deletedAt?: Date | null;

    download: boolean;
    status: string;

    hash: string[];

    process: number;

    points: IPoint[];

    isProcessed: boolean;
    balls: string;
    cache: boolean;

    userIdBeforeDeleted?: string | null;
    err: boolean;

    stats?: IStats | null;
}

/** Тип документа для Mongoose */
export type DrillDocument = IDrill & Document;

/* ---------------------- SCHEMAS ---------------------- */

const PointSchema = new Schema<IPoint>(
    {
        x: Number,
        y: Number,
    },
    { _id: false },
);

const CameraMapSchema = new Schema<ICameraMap>(
    {
        image: String,
        frame: Number,
        points: [PointSchema],
        rails: [Number],
        tableArea: Number,
        tableConf: Number,
        filling: Number,
    },
    { _id: false },
);

const GeoProfileSchema = new Schema<IGeoProfile>(
    {
        country_name: { type: String, default: null },
        country_code: { type: String, default: null },
        city: { type: String, default: null },
        region: { type: String, default: null },
        status: { type: Number, default: null },
    },
    { _id: false },
);

const PocketStatSchema = new Schema<IPocketStat>(
    {
        count: Number,
        acc: { type: Number, default: null },
    },
    { _id: false },
);

const StatsSchema = new Schema<IStats>(
    {
        shots: Number,
        miss: Number,
        made: Number,
        complex: Number,
        strong: Number,
        long: Number,
        accuracy: Number,
        positioning: { type: Number, default: null },
        performance: Number,
        breaks: Number,
        duration: Number,
        pockets: [PocketStatSchema],
    },
    { _id: false },
);

/* ---------------------- MAIN DRILL SCHEMA ---------------------- */

const DrillSchema = new Schema<DrillDocument>(
    {
        _id: String,
        path: String,
        fps: Number,
        orientation: Number,
        duration: Number,
        durationMs: Number,
        title: String,
        durationStr: String,
        frames: Number,
        width: Number,
        height: Number,
        live: Boolean,

        date: Date,

        clientFileName: String,
        table: Boolean,
        manualTable: Boolean,
        year: Number,
        day: Number,

        videoType: String,
        tableSize: String,
        gameType: String,

        camerasMap: [CameraMapSchema],

        user: String,
        ipv4: String,

        geoFromProfile: GeoProfileSchema,
        geoByIp: GeoProfileSchema,

        slave: Number,
        shots: Number,
        good: Number,
        bad: Number,

        description: { type: String, default: "" },

        _createdAt: Date,
        _updatedAt: Date,
        _deletedAt: { type: Date, default: null },

        download: Boolean,
        status: String,

        hash: [String],

        process: Number,

        points: [PointSchema],

        isProcessed: Boolean,
        balls: String,
        cache: Boolean,

        userIdBeforeDeleted: { type: String, default: null },
        err: Boolean,

        stats: { type: StatsSchema, default: null },
    },
    {
        collection: "drills",
    },
);

/* ---------------------- MODEL ---------------------- */

export const DrillModel: Model<DrillDocument> =
    (models.Drill as Model<DrillDocument>) || model<DrillDocument>("Drill", DrillSchema);

export default DrillModel;
