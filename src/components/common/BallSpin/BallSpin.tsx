import { roundNumber, shotToPercent } from "@/helpers/numbersHelpers";
import Block from "../Block/Block";
import { DevBlock } from "@/helpers/testHelpers";
import { IShot } from "@/mongo/models/shotsModel";

export const BallSpin = ({ stats }: { stats: IShot["stats"] }) => {
    const { spin } = stats;
    const a = roundNumber(shotToPercent(spin?.a || 0));
    const b = roundNumber(shotToPercent(spin?.b || 0));
    const x = Math.round((spin?.a || 0) * 100);
    const y = Math.round((spin?.b || 0) * 100);
    return (
        <Block className="relative bg-f-gray-4 p-[17.5px] flex justify-center ">
            <DevBlock>
                <div className="absolute left-2 top-2 text-f-default text-[10px]">
                    <div>
                        a:({a}) {spin?.a}
                    </div>
                    <div>
                        b:({b}) {spin?.b}
                    </div>
                    <div>x:{x}</div>
                    <div>y:{y}</div>
                </div>
            </DevBlock>
            <div className="reletive  aspect-square p-1 overflow-hidden">
                <div className="w-full h-full rounded-full bg-white relative ">
                    <div
                        className="absolute flex justify-center items-center -translate-x-1/2 -traslate-y-1/2"
                        style={{ left: `${a}%`, bottom: `${b}%` }}
                    >
                        <div className="w-100 absolute border-b-2 border-dashed border-f-text-light" />
                        <div className="h-100 absolute border-l-2 border-dashed border-f-text-light" />
                        <div className="w-3.75 h-3.75 absolute bg-f-red-main rounded-full" />
                    </div>
                    <div
                        className={`absolute ${x >= 0 ? "translate-y-0" : "translate-y-full"}`}
                        style={{ [x <= 0 ? "left" : "right"]: `0%`, bottom: `${b}%` }}
                    >
                        {x}°
                    </div>
                    <div
                        className={`absolute ${y >= 0 ? "translate-x-[50%]" : "-translate-x-[150%]"}`}
                        style={{ left: `${a}%`, [y <= 0 ? "bottom" : "top"]: `0%` }}
                    >
                        {y}°
                    </div>
                </div>
            </div>
        </Block>
    );
};
