import { Model, Schema, model, models, type HydratedDocument } from "mongoose";

// ========== TYPES ==========

export interface IPoint2D {
    x: number;
    y: number;
}

export interface IPoint3D {
    x: number;
    y: number;
    z: number;
}

export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IPointsCloudItem {
    point: IPoint3D;
    frame: number;
    conf: number;
    class_id: number;
    rect: IRect;

    class: number;
    ball_cluster_id: number | null;
    breakReason: string | null;
    outlier: boolean;
    smooth: { x: number; y: number } | null;
    isKink: boolean;
}

export interface IPlayerEmbedding {
    embedding: number[];
    conf: number;
}

export interface ICameraPayload {
    oob: number;
    area: number;
}

export interface IResultBall {
    class: number;
    frame: number;
    pocket: number;
    pocketName: string;
    reason: string;
    shotType: string;
    compl: number | null;
    cutAng: number | null;
    diffCandidateIdx: number;
    diffCandidatesCount: number;
}

export interface IResult {
    miss?: boolean;
    made?: boolean;
    balls?: IResultBall[];
}

export interface IHypoBall {
    R: number;
    m: number;
    u_s: number;
    u_r: number;
    u_sp_proportionality: number;
    g: number;
    e_b: number;
    e_c: number;
    x: number;
    y: number;
}

export interface IHypoSpin {
    a: number;
    b: number;
    t: number;
}

export interface IHypoS {
    a: number;
    b: number;
    V0: number;
    phi: number;
    theta: number;
    M: number;
}

export interface IHypo {
    score: number;
    score_trace: [number, number][];
    begin: { x: number; y: number };
    beginFrame: number;
    dist: number;
    V0: number;
    phi: number;
    balls: Record<string, IHypoBall>;
    s: IHypoS;
    obj: string;
    col: number;
}

export interface IStats {
    pocketComplexity?: number;
    cueTargetAngle?: number;
    speed?: number | null;
    cueTargetDist?: number;
    targetBallPath?: number;
    spin?: IHypoSpin;
    long?: boolean;
    complex?: boolean;
    strong?: boolean;
}

export interface IShot {
    _id: string;

    begin: number;
    end: number;
    frames: number;

    playerId: string;
    playerEmb: IPlayerEmbedding;

    video: string;
    auto: boolean;

    camera: number;
    cameraPoints: IPoint2D[];
    cameraPayload: ICameraPayload;

    conf: number;
    result: IResult;

    made: number;
    miss: number;

    hypo?: IHypo;

    type: string;
    game: number;
    videoType: string;

    pointsCloud: IPointsCloudItem[];

    _updatedAt: Date;

    status: string;
    stats: IStats;

    r: number;
    p: number | null;
    rname: string;
    v: boolean;
}

export type ShotDocument = HydratedDocument<IShot>;

// ========== SCHEMAS ==========

const Point2DSchema = new Schema({ x: Number, y: Number }, { _id: false });

const Point3DSchema = new Schema({ x: Number, y: Number, z: Number }, { _id: false });

const RectSchema = new Schema(
    { x: Number, y: Number, width: Number, height: Number },
    { _id: false },
);

const PointsCloudItemSchema = new Schema(
    {
        point: Point3DSchema,
        frame: Number,
        conf: Number,
        class_id: Number,
        rect: RectSchema,

        class: Number,
        ball_cluster_id: Number,
        breakReason: String,
        outlier: Boolean,
        smooth: { x: Number, y: Number },
        isKink: Boolean,
    },
    { _id: false },
);

const PlayerEmbeddingSchema = new Schema(
    {
        embedding: [Number],
        conf: Number,
    },
    { _id: false },
);

const CameraPayloadSchema = new Schema(
    {
        oob: Number,
        area: Number,
    },
    { _id: false },
);

const ResultBallSchema = new Schema(
    {
        class: Number,
        frame: Number,
        pocket: Number,
        pocketName: String,
        reason: String,
        shotType: String,
        compl: Number,
        cutAng: Number,
        diffCandidateIdx: Number,
        diffCandidatesCount: Number,
    },
    { _id: false },
);

const ResultSchema = new Schema(
    {
        miss: Boolean,
        made: Boolean,
        balls: [ResultBallSchema],
    },
    { _id: false },
);

const HypoBallSchema = new Schema(
    {
        R: Number,
        m: Number,
        u_s: Number,
        u_r: Number,
        u_sp_proportionality: Number,
        g: Number,
        e_b: Number,
        e_c: Number,
        x: Number,
        y: Number,
    },
    { _id: false },
);

const HypoSpinSchema = new Schema({ a: Number, b: Number, t: Number }, { _id: false });

const HypoSSchema = new Schema(
    {
        a: Number,
        b: Number,
        V0: Number,
        phi: Number,
        theta: Number,
        M: Number,
    },
    { _id: false },
);

const HypoSchema = new Schema(
    {
        score: Number,
        score_trace: [[Number]],
        begin: { x: Number, y: Number },
        beginFrame: Number,
        dist: Number,
        V0: Number,
        phi: Number,
        balls: { type: Object },
        s: HypoSSchema,
        obj: String,
        col: Number,
    },
    { _id: false },
);

const StatsSchema = new Schema(
    {
        pocketComplexity: Number,
        cueTargetAngle: Number,
        speed: Number,
        cueTargetDist: Number,
        targetBallPath: Number,
        spin: HypoSpinSchema,
        long: Boolean,
        complex: Boolean,
        strong: Boolean,
    },
    { _id: false },
);

// ========== MAIN SCHEMA ==========

const ShotSchema = new Schema<IShot>(
    {
        _id: { type: String, required: true },

        begin: Number,
        end: Number,
        frames: Number,

        playerId: String,
        playerEmb: PlayerEmbeddingSchema,

        video: String,
        auto: Boolean,

        camera: Number,
        cameraPoints: [Point2DSchema],
        cameraPayload: CameraPayloadSchema,

        conf: Number,
        result: ResultSchema,

        made: Number,
        miss: Number,

        hypo: HypoSchema,

        type: String,
        game: Number,
        videoType: String,

        pointsCloud: [PointsCloudItemSchema],

        _updatedAt: Date,

        status: String,
        stats: StatsSchema,

        r: Number,
        p: Number,
        rname: String,
        v: Boolean,
    },
    {
        versionKey: false,
        collection: "shots",
    },
);

// ========== MODEL ==========

export const ShotsModel =
    (models.Shot as Model<IShot>) || model<IShot>("Shot", ShotSchema, "shots");
