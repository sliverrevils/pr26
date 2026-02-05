// app/api/upload-video/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
    const range = req.headers.get("content-range");
    const originalName = req.headers.get("x-file-name");
    const newName = req.headers.get("x-new-file-name");
    const ext = req.headers.get("x-file-ext");

    if (!range || !originalName || !ext) {
        return NextResponse.json({ error: "Missing headers" }, { status: 400 });
    }

    const match = range.match(/bytes (\d+)-(\d+)\/(\d+)/);
    if (!match) {
        return NextResponse.json({ error: "Invalid range" }, { status: 400 });
    }

    const start = Number(match[1]);

    const finalName = `${newName}.${ext}`;
    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uploadPath = path.join(uploadDir, finalName);

    const fileStream = fs.createWriteStream(uploadPath, {
        flags: start === 0 ? "w" : "a",
    });

    const reader = req.body?.getReader();
    if (!reader) {
        return NextResponse.json({ error: "No body" }, { status: 400 });
    }

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fileStream.write(Buffer.from(value));
    }

    fileStream.end();

    return NextResponse.json({ ok: true });
}
