import View from "@/components/common/View/View";
import { CheckGreenIco, CloseRedIco, HistoryIco } from "@/icons/iconsSvg";
import dayjs from "dayjs";

const SUBSCRIBE = [
    {
        period: "1 month",
        price: 15,
        perMonth: 15,
        priority: false,
    },
    {
        period: "1 year",
        price: 150,
        perMonth: 7.5,
        priority: true,
    },
    {
        period: "3 month",
        price: 40,
        perMonth: 9,
        priority: false,
    },
];

export default function PerformStarsProPage() {
    return (
        <View main>
            <h2 className="text-center text-xl font-semibold text-f-default">SUBSCRIBE</h2>
            <div className="flex justify-center gap-4">{SUBSCRIBE.map(SubscribeItem)}</div>
            <div className="text-center text-[14px] text-f-text-light">
                *To continue after completing Level 1, a Pro subscription is required.
            </div>
            <TransactionHistory />
        </View>
    );
}

const SubscribeItem = (
    { perMonth, period, price, priority }: (typeof SUBSCRIBE)[0],
    idx: number,
) => (
    <div
        key={idx + "_subItem"}
        className={`h-48.25 p-4 flex flex-col items-center rounded-2xl border 
                     ${priority ? "bg-f-green-transparent2 border-f-green-main" : "border-f-gray-5"}
                    `}
    >
        <div className="flex-1 flex flex-col items-center justify-between">
            <div className="text-base text-f-text-default">{period}</div>
            <div
                className={`text-2xl font-bold ${priority ? "text-f-purple" : "text-f-green-main"}`}
            >
                {price}$
            </div>
        </div>
        <div className="text-[14px] text-f-text-light">({perMonth}$ / month)</div>
        <div className="flex-1 flex items-end">
            <div className={`${priority ? "btn-blue-40" : "btn-white-40"}`}>Get Pro</div>
        </div>
    </div>
);

const TRANSACTION = [
    [dayjs().format("DD.MM.YYYY"), 15, "1 month", "ide"],
    [dayjs().format("DD.MM.YYYY"), 150, "1 year", "confirm"],
    [dayjs().format("DD.MM.YYYY"), 10, "1 month", "confirm"],
    [dayjs().format("DD.MM.YYYY"), 40, "3 month", "confirm"],
    [dayjs().format("DD.MM.YYYY"), 10, "1 month", "cancel"],
];

const statusIco = (status: string) => {
    switch (status) {
        case "ide":
            return <HistoryIco className="inline-block" />;
        case "confirm":
            return <CheckGreenIco className="inline-block" />;
        case "cancel":
            return <CloseRedIco className="inline-block" />;
    }
};

const TransactionHistory = () => (
    <div className="flex flex-col gap-4">
        <h2 className="text-center text-[20px] font-bold text-f-default">TRANSACTION HISTORY</h2>
        <table className="w-full">
            <thead className="font-bold text-f-text-default leading-10">
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Term</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {TRANSACTION.map((tran, idx) => (
                    <tr key={idx + "_tranRow"} className={!!!(idx % 2) ? "bg-f-gray-5" : ""}>
                        {tran.map((el, index) => (
                            <td
                                key={idx + "col" + index}
                                className="text-center align-middle font-semibold text-f-text-default leading-10 "
                            >
                                {index === 3 ? statusIco(el as string) : el}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
