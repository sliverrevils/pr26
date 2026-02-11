"use client";

import { sendMail } from "@/libs/email";

export default function EmailBtn() {
    return (
        <button
            className="btn-blue-50"
            onClick={async () => {
                await sendMail({
                    to: "sliverrevils@yandex.ru",
                    subject: "Test",
                    html: "<b>PerformStars</b>",
                });
            }}
        >
            EMAIL TEST
        </button>
    );
}
