import { PropsWithChildren } from "react";

export default function Post({ children, title }: PropsWithChildren & { title: string }) {
    return (
        <section className="flex flex-col items-start gap-5 mb-4 ">
            <h2 className="bg-f-purple text-white text-32 font-extrabold rounded-tr-lg rounded-br-lg px-8">
                {title}
            </h2>
            <div className="flex flex-col gap-4 px-8 text-f-default [&_img]:self-center ">
                {children}
            </div>
        </section>
    );
}
