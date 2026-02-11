"use client";

import Input from "@/components/common/Input/Input";
import { useState, useEffect } from "react";

export default function ResetPasswordConfirmPage() {
    const [token, setToken] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setToken(params.get("token"));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!token) {
            setStatus("error");
            setMessage("Invalid token");
            return;
        }

        setStatus("loading");

        const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            setStatus("error");
            setMessage(data.error || "Something went wrong");
            return;
        }

        setStatus("success");
        setMessage("Password successfully changed");
    }

    return (
        <div className="w-full  flex flex-col gap-4 ">
            <h1 className="text-2xl font-semibold text-f-text-default mb-4">Set New Password</h1>

            {!token && <p className="text-red-600">Invalid or missing token</p>}

            {token && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <Input
                        title="New password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        hideBtn
                    />

                    <button
                        type="submit"
                        disabled={status === "loading" || password.length < 6}
                        className="btn-blue-50 self-center"
                    >
                        {status === "loading" ? "Saving..." : "Save password"}
                    </button>
                </form>
            )}

            {status !== "idle" && (
                <p
                    className={`mt-4 text-center ${
                        status === "success" ? "text-f-green-pressed" : "text-f-red-main"
                    }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
}
