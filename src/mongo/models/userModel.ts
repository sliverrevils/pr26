import { Model, Schema, model, models } from "mongoose";
import { Binary } from "mongodb";
import { nanoid } from "nanoid";
import { IPlayerSearch } from "./playersSearchModel";

export type IUserRole = "user" | "admin" | "super";

export type IUser = {
    _id?: string;

    email: string;
    password: Binary; //! mongoose return Binary
    role?: IUserRole;

    name: string;
    alias?: string;

    balance?: number;

    avatar?: string;
    avatar200?: string;
    avatar400?: string;

    emailConfirmed?: boolean;
    isNewsSubscription?: boolean;

    newsSubscriptionToken?: string;
    emailConfirmationToken?: string;

    // loginTokens?: string[];

    socialLink?: string;

    date?: Date; // вероятно дата рождения / регистрации профиля

    countryCode?: string;
    city?: string;

    gender?: "Male" | "Female" | "Other";

    description?: string;

    cueWeight?: string;
    cueTipSize?: string;
    cueBrand?: string;

    tableSize?: string;

    shotsAmountForCalculating?: number;

    fargoRate?: number; //Сайт рейтинг (рейтинг сайта)

    lengthUnit?: string;

    favoritePlayer?: string;
    favoritePlayers?: IPlayerSearch[];

    shareWorkoutStats?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
};

const UserSchema = new Schema<IUser>(
    {
        _id: { type: String, default: () => nanoid(10) },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: Buffer,
            required: true,
            // select: false, // 🔥 обязательно
        },
        role: {
            type: String,
            enum: ["user", "admin", "super"],
            default: "user",
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        alias: {
            type: String,
            trim: true,
        },
        balance: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        avatar: {
            type: String,
            default: "",
        },
        avatar200: {
            type: String,
            default: "",
        },
        avatar400: {
            type: String,
            default: "",
        },
        emailConfirmed: {
            type: Boolean,
            required: true,
            default: false,
        },
        isNewsSubscription: {
            type: Boolean,
            required: true,
            default: true,
        },
        newsSubscriptionToken: {
            type: String,
            index: true,
        },
        emailConfirmationToken: {
            type: String,
            index: true,
            default: () => crypto.randomUUID(), //TODO Сделать подтверждение по email
        },
        // loginTokens: {
        //     type: [String],
        //     default: [],
        // },
        socialLink: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
        },
        countryCode: {
            type: String,
            uppercase: true,
            length: 2,
        },
        city: {
            type: String,
            trim: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: "Other",
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        cueWeight: {
            type: String,
        },
        cueTipSize: {
            type: String,
        },
        cueBrand: {
            type: String,
        },
        tableSize: {
            type: String,
        },
        shotsAmountForCalculating: {
            type: Number,
            min: 0,
        },
        fargoRate: {
            type: Number,
            min: 0,
        },
        lengthUnit: {
            type: String,
            enum: ["ft", "m"],
            default: "m",
        },
        favoritePlayer: {
            type: String,
        },
        favoritePlayers: [
            {
                type: String,
                ref: "PlayerSearch",
            },
        ],
        shareWorkoutStats: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const UserModel: Model<IUser> =
    (models.User as Model<IUser>) || model<IUser>("User", UserSchema);
