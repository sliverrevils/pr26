export default function ErrorLayout({ error }: { error?: String }) {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-f-red-like ">
            <div className="flex flex-col border-2 border-white p-4 rounded-2xl gap-4 text-f-red-main bg-white">
                <div className="text-5xl">Progect error</div>
                <div>{error}</div>
            </div>
        </div>
    );
}
