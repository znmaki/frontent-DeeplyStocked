import { formatoFecha } from "..";
import { apiService, getLoginUser } from "../../../shared";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2'

const getMovement = async () => {
    const { id } = getLoginUser()
    const movement: any = await apiService.get(`users/${id}/movements`);
    return movement.body.data;
}

/* const getProducts = async () => {
    const { id } = getLoginUser()
    const products = await apiService.get(`/users/${id}/products`);
    return products;
} */

export const useProductEntry = (handleOpen: () => void, handleClose?: () => void) => {
    const queryClient = useQueryClient();

    /* const products: any = useQuery(
        ['products'],
        () => getProducts(),
        {
            select: (data: any) => {
                const idList = data.body.data.map((item: any) => ({
                    id: item.id,
                    name: item.name
                }))
                queryClient.setQueryData(['infoProducts'], idList);
            }
        }
    ) */

    const { isLoading, data } = useQuery(
        ['productsReceived'],
        getMovement,
        {
            select: (data) => {
                // Filtrar los elementos cuyo type.name sea igual a 'Entrada'
                const filteredData = data.filter((item: { type: { name: string; }; }) => item.type.name === 'Entrada');

                // Mapear y limpiar los objetos filtrados
                return filteredData.map((item: { date: any; id: any; product: { name: any; }; quantity: any; unitPrice: string; }) => ({
                    id: item.id,
                    name: item.product.name,
                    cantidad_comprada: item.quantity,
                    costo_compra: parseFloat(item.unitPrice),
                    fecha: formatoFecha(item.date)
                }));
            },
        }
    );

    const handleSubmit = async (values: any) => {
        const productId = queryClient.getQueryData(['productId']);

        if (productId !== undefined) {
            console.log('hay producto', values);
            const editProdut = {
                "quantity": values.cantidad_comprada,
                "unitPrice": values.costo_compra,
            };
            /* await apiService.put(`http://localhost:3001/sold_products/${productId}`, values)
            queryClient.invalidateQueries(['productsSold']); */
            console.log(editProdut);
            await apiService.put(`/movements/${productId}`, editProdut)
            queryClient.invalidateQueries(['productsReceived']);
        } else {
            const nuevaCopia = {
                "quantity": values.cantidad_comprada,
                "unitPrice": values.costo_compra,
            };
            console.log(nuevaCopia);
            
            await apiService.post(`/products/${values.nameProduct}/load`, nuevaCopia)
            queryClient.invalidateQueries(['productsReceived']);
        }

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
    };

    const handleDelete = async (productId: number) => {
        await apiService.delete(`/movements/${productId}`)
        queryClient.invalidateQueries(['productsReceived']);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `¡Qué bien!`,
            text: `La Operación se Realizó con Éxito`,
            showConfirmButton: false,
            backdrop: false,
            timer: 2500,
        })
    };

    //lo uso para abrir el modal de edicion con los datos seleccionados (NO HACE LA ACCION DE EDICION, ESO LO HACE handleSubmit)
    const handleEdit = (productId: number) => {
        queryClient.setQueryData(['productId'], productId);

        const productsQuery: [] | undefined = queryClient.getQueryData(['productsReceived']);

        if (productsQuery) {
            const filteredProducts = productsQuery.filter((product: { id: number; }) => product.id === productId);
            console.log(filteredProducts[0]);

            queryClient.setQueryData(['productSelect'], filteredProducts[0]);
        }

        handleOpen()
    };

    return {
        //Properties
        data,
        isLoading,
        //Methods
        handleSubmit,
        handleDelete,
        handleEdit
        //Getters

        //Mutations
    }
}