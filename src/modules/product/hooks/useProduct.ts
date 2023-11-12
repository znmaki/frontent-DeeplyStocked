
import { apiService, getLoginUser } from "../../../shared"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Swal from 'sweetalert2'

interface ProductQuery {
    body: {
        data: Array<{ id: number; }> // Asumiendo que data es un arreglo de objetos con una propiedad 'id'.
    }
}

const getProducts = async () => {
    const { id } = getLoginUser()
    const products = await apiService.get(`/users/${id}/products`);
    return products;
}
export const useProduct = (handleOpen: () => void, handleClose?: () => void) => {
    const queryClient = useQueryClient();

    const { isLoading, data } = useQuery(
        ['products'],
        () => getProducts(),
    )

    const handleSubmit = async (values: unknown) => {
        const productId = queryClient.getQueryData(['productId']);
        if (productId !== undefined) {
            await apiService.put(`/products/${productId}`, values)
            queryClient.invalidateQueries(['products']);
        } else {
            await apiService.post('/products', values)
            queryClient.invalidateQueries(['products']);
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

    const handleDelete = async (productId: unknown) => {
        await apiService.delete(`/products/${productId}`)
        queryClient.invalidateQueries(['products']);

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

        const productsQuery: ProductQuery | undefined = queryClient.getQueryData(['products']);

        if (productsQuery) {
            console.log(productsQuery.body.data.filter((product: { id: number; }) => product.id === productId));

            const filteredProducts = productsQuery.body.data.filter((product: { id: number; }) => product.id === productId);
            console.log(filteredProducts[0]);
            queryClient.setQueryData(['productSelect'], filteredProducts[0])
        }

        handleOpen();
    }

    return {
        //Properties
        isLoading,
        data,
        //Methods
        handleSubmit,
        handleDelete,
        handleEdit
        //Getters

        //Mutations
    }
}
