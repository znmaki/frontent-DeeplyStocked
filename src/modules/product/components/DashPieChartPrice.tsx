import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector, Tooltip } from "recharts";
import { formatPrice } from "../helper/formatPrice";

const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={13} textAnchor="middle" fill={fill} className="text-2xl font-bold">
                {formatPrice(payload.value)}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius + 15}
                outerRadius={outerRadius + 15}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 22}
                outerRadius={outerRadius + 26}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
                className="text-[1.1rem] font-bold"
            >{`Soles`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
                className="text-[1rem] font-bold"
            >
                {`Total`}
            </text>
        </g>
    );
};

export default function DashPieChartPrice(quantity: { quantity: number; }) {
    /* console.log(formatPrice(quantity.quantity));
    console.log((quantity.quantity)); */
    
    const data = [
        { name: `Total en Soles (S/.)`, value: quantity.quantity }
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_: any, index: React.SetStateAction<number>) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <PieChart width={400} height={400}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={250}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#545271"
                dataKey="value"
                onMouseEnter={onPieEnter}
            />
            <Tooltip />
        </PieChart>
    );
}
