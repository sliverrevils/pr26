"use client";

import Input from "@/components/common/Input/Input";
import { useState } from "react";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");

        try {
            const res = await fetch("/api/auth/request-reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                setStatus("error");
                setMessage(data.error || "Something went wrong");
                return;
            }

            setStatus("success");
            setMessage("We sent a reset link to your email");
        } catch (err) {
            setStatus("error");
            setMessage("Network error");
        }
    }

    return (
        <div className="w-full  flex flex-col gap-4 ">
            <h1 className="text-2xl font-semibold text-f-text-default mb-4">Reset Password</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <Input
                    type="email"
                    title="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                />

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-blue-50 self-center"
                >
                    {status === "loading" ? "Sending..." : "Send reset link"}
                </button>
            </form>

            {status !== "idle" && (
                <p
                    className={`mt-4 text-center ${
                        status === "success" ? "text-green-600" : "text-red-600"
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
