import {
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

export default function DashBarVertical({ maxEntrada, maxSalida }: any) {
    console.log(maxEntrada);
    console.log(maxSalida);


    const data = [
        {
            name: "Maxima Ventas/Salidas",
            Cantidad: Math.abs(maxSalida[1]),
            Name: maxSalida[0]
        },
        {
            name: "Maximo Compras/Entradas",
            Cantidad: maxEntrada[1],
            Name: maxEntrada[0]
        }
    ];
    return (
        <ComposedChart
            layout="vertical"
            width={1100}
            height={400}
            data={data}
            margin={{
                top: 50,
                right: 20,
                bottom: 20,
                left: 80
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            <Bar dataKey="Cantidad" barSize={20} fill="#545271" />
            <Line dataKey="Name" stroke="#ff7300" scale="band" />
        </ComposedChart>
    );
}
