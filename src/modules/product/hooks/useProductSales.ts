import { formatoFecha } from "..";
import { apiService, getLoginUser } from "../../../shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'
import { useEffect } from 'react';

const getMovement = async () => {
    const { id } = getLoginUser()
    const movement: any = await apiService.get(`users/${id}/movements`);
    return movement.body.data;
}

const getProducts = async () => {
    const { id } = getLoginUser()
    const products = await apiService.get(`/users/${id}/products`);
    return products;
}

export const useProductSales = (handleOpen?: () => void, handleClose?: () => void) => {
    const queryClient = useQueryClient();    
    console.log(handleOpen);
    
    const products: any = useQuery(
        ['products'],
        () => getProducts(),
        {
            select: (data: any) => {
                const idList = data.body.data.map((item: any) => ({
                    id: item.id,
                    name: item.name
                }))
                queryClient.setQueryData(['infoProducts'], idList);
            },
        }
    )
    useEffect(() => {
        console.log(products);
    }, [])

    const { isLoading, data } = useQuery(
        ['productsSold'],
        getMovement,
        {
            select: (data) => {
                // Filtrar los elementos cuyo type.name sea igual a 'Entrada'
                const filteredData = data.filter((item: any) => item.type.name === 'Salida');

                // Mapear y limpiar los objetos filtrados
                return filteredData.map((item: any) => ({
                    id: item.id,
                    name: item.product.name,
                    cantidad_vendida: Math.abs(item.quantity),
                    costo_venta: parseFloat(item.unitPrice),
                    fecha: formatoFecha(item.date)
                }));
            },
        }
    )

    const handleSubmit = async (values: any) => {
        const stockProduct: number | any = queryClient.getQueryData(['stock']);
        const nuevaCopia = {
            "quantity": values.cantidad_vendida,
            "unitPrice": values.costo_venta,
            "date": values.fecha,
        };

        if (nuevaCopia.quantity > stockProduct[0].stock) {

            handleClose?.();
            //COLOCAR ALERTA
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: `Oops...`,
                text: `Solo hay ${stockProduct[0].stock} productos`,
                showConfirmButton: false,
                backdrop: false,
                timer: 2500,
            })
        } else {
            await apiService.post(`/products/${values.nameProduct}/withdraw`, nuevaCopia)

            handleClose?.();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `¡Qué bien!`,
                text: `La Operación se Realizó con Éxito`,
                showConfirmButton: false,
                backdrop: false,
                timer: 2500,
            })
        }

        //await apiService.post(`/products/${values.nameProduct}/withdraw`, nuevaCopia)


        queryClient.invalidateQueries(['productsSold']);
    }

    const handleDelete = async (productId: number) => {
        await apiService.delete(`/movements/${productId}`)
        queryClient.invalidateQueries(['productsSold']);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `¡Qué bien!`,
            text: `La Operación se Realizó con Éxito`,
            showConfirmButton: false,
            backdrop: false,
            timer: 2500,
        })
    }

    return {
        //Properties
        data,
        isLoading,
        //Methods
        handleSubmit,
        handleDelete,
        //Getters

        //Mutations
    }
}