import NextAuth, { CredentialsSignin, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/mongo/connect";
import { IUserRole, UserModel } from "@/mongo/models/userModel";
import { verifyPassword } from "@/helpers/passwordHelper";

class NotConfirmedEmailError extends CredentialsSignin {
    code = "email_not_confirmed";
}

export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                await connectDB();

                const user = await UserModel.findOne({ email: credentials.email }).lean();

                if (!user) return null;

                //TODO Проверка подтверждения почты
                //if (!user.emailConfirmed) throw new NotConfirmedEmailError();

                const isValid = await verifyPassword(credentials.password as string, user.password);

                if (!isValid) return null;

                return {
                    id: user._id!.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role || "user",
                } as User;
            },
        }),
    ],
    trustHost: true, //!Дает авторизироваться не только c HTTPS

    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.email = token.email!;
                session.user.name = token.name!;
                session.user.role = token.role as IUserRole;
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
});
