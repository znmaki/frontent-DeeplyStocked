import { apiService, getLoginUser } from "../../../shared";
import { useQuery } from "@tanstack/react-query";

const getMovement = async () => {
    const { id } = getLoginUser()
    const movement: any = await apiService.get(`users/${id}/movements`);
    return movement.body.data;
}

export const useDashGeneral = () => {
    const listProducts = useQuery(
        ['productsDash'],
        getMovement,
        {
            select: (data) => {
                let dataDash = []

                const sumEntrada = data.reduce((total: any, item: { type: { name: string; }; quantity: any; }) => {
                    if (item.type.name === "Entrada") {
                        return total + item.quantity;
                    }
                    return total;
                }, 0);

                const sumSalida = data.reduce((total: any, item: { type: { name: string; }; quantity: any; }) => {
                    if (item.type.name === "Salida") {
                        return total + item.quantity;
                    }
                    return total;
                }, 0);

                const sumEntradaPrice = data.reduce((total: number, item: { type: { name: string; }; quantity: number; unitPrice: string; }) => {
                    if (item.type.name === "Entrada") {
                        return total + (item.quantity * parseFloat(item.unitPrice));
                    }
                    return total;
                }, 0).toFixed(2);

                const sumSalidaPrice = data.reduce((total: number, item: { type: { name: string; }; quantity: number; unitPrice: string; }) => {
                    if (item.type.name === "Salida") {
                        return total + (item.quantity * parseFloat(item.unitPrice));
                    }
                    return total;
                }, 0).toFixed(2);

                const maxEntrada = data
                    .filter((item: { type: { name: string; }; }) => item.type.name === "Entrada")
                    .reduce((max: number, item: { quantity: number; }) => Math.max(max, item.quantity), Number.NEGATIVE_INFINITY);

                const minSalida = data
                    .filter((item: { type: { name: string; }; }) => item.type.name === "Salida")
                    .reduce((min: number, item: { quantity: number; }) => Math.min(min, item.quantity), Number.POSITIVE_INFINITY);

                const sumByProductAndType: any = {};

                data.forEach((item: { product: { name: any; }; type: { name: any; }; quantity: any; }) => {
                    const productName = item.product.name;
                    const typeName = item.type.name;
                    const key = `${productName}-${typeName}`;

                    if (!sumByProductAndType[key]) {
                        sumByProductAndType[key] = 0;
                    }

                    sumByProductAndType[key] += item.quantity;
                });

                const maxPositiveEntry = Object.entries(sumByProductAndType)
                    .filter(([value]: any) => value > 0)
                    .reduce((max: any, entry: any) => (entry[1] > max[1] ? entry : max), ["", Number.NEGATIVE_INFINITY]);

                const minNegativeEntry = Object.entries(sumByProductAndType)
                    .filter(([value]: any) => value < 0)
                    .reduce((min: any, entry: any) => (entry[1] < min[1] ? entry : min), ["", Number.POSITIVE_INFINITY]);

                dataDash = [sumEntrada, sumSalida, sumEntradaPrice, sumSalidaPrice, maxEntrada, minSalida, maxPositiveEntry, minNegativeEntry];

                return dataDash
            },
            refetchOnWindowFocus: false,
        },
    )


    return {
        //Properties
        data: listProducts.data,
        isLoading: listProducts.isLoading
        //Methods

        //Getters

        //Mutations
    }
}