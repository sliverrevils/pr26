"use server";

import { auth } from "@/config/auth";
import { normalizeDbRes } from "@/helpers/dbHalpers";
import { connectDB } from "@/mongo/connect";
import { IReport, ReportModel } from "@/mongo/models/reportsModel";

export async function getCurrentUserRaports(): Promise<IReport[]> {
    try {
        const session = await auth();
        if (!session?.user) {
            return [];
        }
        await connectDB();

        const repDocs = await ReportModel.find({
            user: session.user.id,
            content: { $exists: true, $ne: "" },
        })
            .sort({ _createdAt: -1 })
            .lean();
        if (!repDocs.length) return [];
        const res = normalizeDbRes<IReport[]>(repDocs);
        // console.log("REPORTS➡️", res);
        return res;
    } catch (error) {
        return [];
    }
}
