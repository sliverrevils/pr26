import crypto from "crypto";
import { Binary } from "mongodb";

const config = {
    hashBytes: 32,
    saltBytes: 16,
    iterations: 1000,
    digest: "sha512",
};

export function hashPassword(password: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(config.saltBytes, (err, salt) => {
            if (err) return reject(err);

            crypto.pbkdf2(
                password,
                salt,
                config.iterations,
                config.hashBytes,
                config.digest,
                (err, hash) => {
                    if (err) return reject(err);

                    const combined = Buffer.alloc(hash.length + salt.length + 8);

                    combined.writeUInt32BE(salt.length, 0);
                    combined.writeUInt32BE(config.iterations, 4);

                    salt.copy(combined, 8);
                    hash.copy(combined, salt.length + 8);

                    resolve(combined);
                },
            );
        });
    });
}

export function verifyPassword(password: string, combinedRaw: Binary): Promise<boolean> {
    const combined = Buffer.from(combinedRaw.buffer);

    if (combined.length < 8) {
        throw new Error("Invalid password buffer");
    }

    const saltBytes = combined.readUInt32BE(0);
    const iterations = combined.readUInt32BE(4);

    if (combined.length < saltBytes + 8) {
        throw new Error("Corrupted password buffer");
    }

    const hashBytes = combined.length - saltBytes - 8;

    const salt = combined.subarray(8, saltBytes + 8);
    const hash = combined.subarray(saltBytes + 8);

    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, hashBytes, "sha512", (err, verify) => {
            if (err) return reject(err);
            resolve(crypto.timingSafeEqual(verify, hash));
        });
    });
}
