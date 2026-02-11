import { Schema, model, models, type HydratedDocument, type Model } from "mongoose";

// ========== TYPES ==========

export interface IVideoFormat {
    mimeType: string;
    qualityLabel: string;
    bitrate: number;
    audioBitrate: number;
    itag: number;
    url: string;
    width: number;
    height: number;
    lastModified: string;
    contentLength: string;
    quality: string;
    fps: number;
    projectionType: string;
    averageBitrate: number;
    audioQuality: string;
    approxDurationMs: string;
    audioSampleRate: string;
    audioChannels: number;
    qualityOrdinal: string;
    hasVideo: boolean;
    hasAudio: boolean;
    container: string;
    codecs: string;
    videoCodec: string;
    audioCodec: string;
    isLive: boolean;
    isHLS: boolean;
    isDashMPD: boolean;
}

export interface IPlayerEmbImg {
    _id: string;
    playerClusterSim: number;
}

export interface IPlayerEmbStatsPocket {
    count: number;
    acc: number;
}

export interface IPlayerEmbStats {
    shots: number;
    miss: number;
    made: number;
    complex: number;
    strong: number;
    long: number;
    accuracy: number;
    positioning: number;
    breaks: number;
    performance: number;
    duration: number;
    pockets: IPlayerEmbStatsPocket[];
}

export interface IPlayerEmb {
    playerId: string;
    img: IPlayerEmbImg[];
    stats: IPlayerEmbStats;
}

export interface IVideo {
    _id: string;
    url: string;
    download: boolean;
    user: string;
    private: boolean;
    status: string;
    statusCode: number;
    shots: number;
    good: number;
    bad: number;
    _createdAt: Date;
    mindBegin: Date;
    videoType: string;
    title: string;
    description: string;
    gameType: string;
    tableSize: string;
    cameras: string;
    camerasMap: unknown[];
    email: boolean;
    date: string;
    year: number;
    day: number;
    detailes: string;
    c: number;
    players: string[];
    score: string[];
    game: number;
    viewCount: number;
    duration: number;
    duration_hms: string;
    width: number;
    height: number;
    fps: number;
    itag: number;
    formats: IVideoFormat[];
    _updatedAt: Date;
    path: string;
    champ: string;
    team: string;
    balls: number;
    cache: boolean;
    slave: number;
    frames: number;
    isProcessed: boolean;
    lastTrackFrame: number;
    mid: string;
    process: number;
    playersEmb: IPlayerEmb[];
}

export type VideoDocument = HydratedDocument<IVideo>;

// ========== SUBSCHEMAS ==========

const VideoFormatSchema = new Schema<IVideoFormat>(
    {
        mimeType: String,
        qualityLabel: String,
        bitrate: Number,
        audioBitrate: Number,
        itag: Number,
        url: String,
        width: Number,
        height: Number,
        lastModified: String,
        contentLength: String,
        quality: String,
        fps: Number,
        projectionType: String,
        averageBitrate: Number,
        audioQuality: String,
        approxDurationMs: String,
        audioSampleRate: String,
        audioChannels: Number,
        qualityOrdinal: String,
        hasVideo: Boolean,
        hasAudio: Boolean,
        container: String,
        codecs: String,
        videoCodec: String,
        audioCodec: String,
        isLive: Boolean,
        isHLS: Boolean,
        isDashMPD: Boolean,
    },
    { _id: false },
);

const PlayerEmbImgSchema = new Schema<IPlayerEmbImg>(
    {
        _id: { type: String, required: true },
        playerClusterSim: Number,
    },
    { _id: false },
);

const PlayerEmbStatsPocketSchema = new Schema<IPlayerEmbStatsPocket>(
    {
        count: Number,
        acc: Number,
    },
    { _id: false },
);

const PlayerEmbStatsSchema = new Schema<IPlayerEmbStats>(
    {
        shots: Number,
        miss: Number,
        made: Number,
        complex: Number,
        strong: Number,
        long: Number,
        accuracy: Number,
        positioning: { type: Number, default: null },
        breaks: Number,
        performance: { type: Number, default: null },
        duration: Number,
        pockets: [PlayerEmbStatsPocketSchema],
    },
    { _id: false },
);

const PlayerEmbSchema = new Schema<IPlayerEmb>(
    {
        playerId: String,
        img: [PlayerEmbImgSchema],
        stats: PlayerEmbStatsSchema,
    },
    { _id: false },
);

// ========== MAIN SCHEMA ==========

const VideoSchema = new Schema<IVideo>(
    {
        _id: { type: String, required: true },

        url: { type: String, required: true },
        download: { type: Boolean, default: false },
        user: { type: String, index: true, required: true },
        private: { type: Boolean, default: false },

        status: { type: String, default: "" },
        statusCode: { type: Number, default: 0 },

        shots: { type: Number, default: 0 },
        good: { type: Number, default: 0 },
        bad: { type: Number, default: 0 },

        _createdAt: { type: Date, default: () => new Date() },
        mindBegin: { type: Date, default: () => new Date() },

        videoType: { type: String, default: "" },
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        gameType: { type: String, default: "" },
        tableSize: { type: String, default: "" },
        cameras: { type: String, default: "" },

        camerasMap: {
            type: Schema.Types.Mixed,
            default: [],
        },

        email: { type: Boolean, default: false },
        date: { type: String, default: "" },
        year: { type: Number, default: 0 },
        day: { type: Number, default: 0 },
        detailes: { type: String, default: "" },
        c: { type: Number, default: 0 },

        players: {
            type: [String],
            default: ["", ""],
        },

        score: {
            type: [String],
            default: [],
        },

        game: { type: Number, default: 0 },

        viewCount: { type: Number, default: 0 },
        duration: { type: Number, default: 0 },
        duration_hms: { type: String, default: "" },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
        fps: { type: Number, default: 0 },
        itag: { type: Number, default: 0 },

        formats: {
            type: [VideoFormatSchema],
            default: [],
        },

        _updatedAt: { type: Date, default: () => new Date() },

        path: { type: String, default: "" },
        champ: { type: String, default: "" },
        team: { type: String, default: "" },
        balls: { type: Number, default: 0 },
        cache: { type: Boolean, default: false },
        slave: { type: Number, default: 0 },
        frames: { type: Number, default: 0 },
        isProcessed: { type: Boolean, default: false },
        lastTrackFrame: { type: Number, default: 0 },
        mid: { type: String, default: "" },
        process: { type: Number, default: 0 },

        playersEmb: {
            type: [PlayerEmbSchema],
            default: [],
        },
    },
    {
        versionKey: false,
        collection: "videos",
    },
);

// ========== MODEL ==========

export const VideoModel: Model<IVideo> =
    (models.Video as Model<IVideo>) || model<IVideo>("Video", VideoSchema, "videos");
