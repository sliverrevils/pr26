import {
    CoachingSvg,
    EditSvg,
    ProfileSvg,
    ProSvg,
    SettingsSvg,
    WorkoutsSvg,
} from "@/icons/iconsSvg";
import { ISvg } from "@/types/types";

export type IMenuLocation = "header" | "footer" | "aside" | "base" | "profile";
type IMenuCategoryes = "Service" | "Theory description" | "Documentation" | "none";

interface IPathItem {
    title: string;
    path: string;
    dynamic: boolean;
    menuLocation: IMenuLocation[];
    category: IMenuCategoryes;
    icon?: null | ISvg;
}

type IPathKey =
    | "home"
    | "players"
    | "matches"
    | "match"
    | "about"
    | "possibilities"
    | "cooperation"
    | "signUp"
    | "signIn"
    | "recovery"
    | "profile"
    | "coaching"
    | "workouts"
    | "workout"
    | "editProfile"
    | "settingsProfile"
    | "performStarsPro"
    | "theory"
    | "statistics"
    | "criteria"
    | "privacyPolicy"
    | "terms"
    | "questions"
    | "requirements"
    | "howToRecord"
    | "player"
    | "users";

export const PATHES: Record<IPathKey, IPathItem> = {
    home: {
        title: "Home",
        path: "/",
        dynamic: false,
        menuLocation: ["aside"],
        category: "none",
    },
    signIn: {
        title: "Sign in",
        path: "/sign-in",
        dynamic: false,
        menuLocation: ["base"],
        category: "none",
    },
    signUp: {
        title: "Sign up",
        path: "/sign-up",
        dynamic: false,
        menuLocation: ["base"],
        category: "none",
    },
    profile: {
        title: "Profile",
        path: "/profile",
        dynamic: false,
        menuLocation: ["profile"],
        category: "none",
        icon: ProfileSvg,
    },
    coaching: {
        title: "Coaching",
        path: "/profile/coaching",
        dynamic: false,
        menuLocation: ["profile"],
        category: "none",
        icon: CoachingSvg,
    },
    workouts: {
        title: "Workouts",
        path: "/profile/workouts",
        dynamic: false,
        menuLocation: ["profile"],
        category: "none",
        icon: WorkoutsSvg,
    },
    workout: {
        title: "Workout",
        path: "/workout/",
        dynamic: true,
        menuLocation: ["base"],
        category: "none",
        icon: WorkoutsSvg,
    },
    editProfile: {
        title: "Edit profile",
        path: "/profile/edit",
        dynamic: false,
        menuLocation: ["profile"],
        category: "none",
        icon: EditSvg,
    },
    settingsProfile: {
        title: "Settings",
        path: "/profile/settings",
        dynamic: false,
        menuLocation: ["profile"],
        category: "none",
        icon: SettingsSvg,
    },
    performStarsPro: {
        title: "PerformStars Pro",
        path: "/profile/pro",
        dynamic: false,
        menuLocation: ["profile"],
        category: "none",
        icon: ProSvg,
    },
    recovery: {
        title: "Forgot your password?",
        path: "/reset-password",
        dynamic: false,
        menuLocation: ["base"],
        category: "none",
    },

    players: {
        title: "Players",
        path: "/players",
        dynamic: false,
        menuLocation: ["header", "aside"],
        category: "none",
    },
    player: {
        title: "Player",
        path: "/players/",
        dynamic: true,
        menuLocation: [],
        category: "none",
    },
    users: {
        title: "Users",
        path: "/players/users/",
        dynamic: true,
        menuLocation: ["base"],
        category: "none",
    },
    matches: {
        title: "Matches",
        path: "/matches",
        dynamic: false,
        menuLocation: ["header", "aside"],
        category: "none",
    },
    match: {
        title: "Match",
        path: "/matches/",
        dynamic: true,
        menuLocation: [],
        category: "none",
    },
    about: {
        title: "About",
        path: "/about-us",
        dynamic: false,
        menuLocation: ["header", "aside", "footer"],
        category: "Service",
    },
    possibilities: {
        title: "Possibilities",
        path: "/possibilities",
        dynamic: false,
        menuLocation: ["header", "footer", "aside"],
        category: "Service",
    },
    cooperation: {
        title: "Cooperation",
        path: "/cooperation-program",
        dynamic: false,
        menuLocation: ["header", "footer", "aside"],
        category: "Service",
    },

    criteria: {
        title: "Criteria",
        path: "/criteria",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Theory description",
    },
    statistics: {
        title: "Statistics",
        path: "/statistics",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Theory description",
    },

    privacyPolicy: {
        title: "Privacy Policy",
        path: "/privacy-policy",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Documentation",
    },
    theory: {
        title: "Theory",
        path: "/theory",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Theory description",
    },
    questions: {
        title: "Questions",
        path: "/questions",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Theory description",
    },
    terms: {
        title: "Terms",
        path: "/terms",
        dynamic: false,
        menuLocation: ["base", "footer"],
        category: "Documentation",
    },
    requirements: {
        title: "Video requirements",
        path: "/requirements",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Documentation",
    },
    howToRecord: {
        title: "How to record and submit a video",
        path: "/how-to-record",
        dynamic: false,
        menuLocation: ["footer"],
        category: "Documentation",
    },
};
