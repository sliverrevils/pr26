import { Model, models } from "mongoose";
import { Schema, model, type HydratedDocument } from "mongoose";

// ========== TYPES ==========

export interface IReport {
    _id: string;
    user: string;
    _createdAt: Date;
    content: string; // HTML
    model: string;
    reportCount?: number;
}

export type ReportDocument = HydratedDocument<IReport>;

// ========== SCHEMA ==========

const ReportSchema = new Schema<IReport>(
    {
        _id: { type: String, required: true },

        user: { type: String, required: true, index: true },

        _createdAt: { type: Date, required: true, default: () => new Date() },

        content: { type: String, required: true },

        model: { type: String, required: true },
        reportCount: { type: Number, required: false },
    },
    {
        versionKey: false,
        collection: "reports",
    },
);

// ========== MODEL ==========

export const ReportModel =
    (models.Report as Model<IReport>) || model<IReport>("Report", ReportSchema, "reports");
