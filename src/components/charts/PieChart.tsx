"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

type PieChartProps = {
    size?: number; // px
    colors?: string[];
    data: { name: string; value: number }[];
};

export function PieChart({
    size = 300,
    colors = [],
    data,
    className = "",
}: PieChartProps & { className?: string }) {
    const ref = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<echarts.EChartsType | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        const chart = echarts.init(ref.current);
        chartRef.current = chart;

        chart.setOption({
            color: colors.length ? colors : undefined,
            tooltip: { trigger: "item" },
            series: [
                {
                    type: "pie",
                    radius: "100%",
                    data,
                    label: { show: false },
                },
            ],
        });

        const resize = () => chart.resize();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            chart.dispose();
        };
    }, [colors, data]);

    return (
        <div
            className={className}
            ref={ref}
            style={{
                width: size,
                height: size,
            }}
        />
    );
}
