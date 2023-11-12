import { apiService, getLoginUser } from "../../../shared";
import { useQuery } from "@tanstack/react-query";

/* const getMovement = async () => {
    const { id } = getLoginUser()
    const movement:any = await apiService.get(`users/${id}/movements`);
    return movement.body.data;
} */

const getMovement2 = async (id: any) => {
    const movement: any = await apiService.get(`products/${id}`);
    return movement.body;
}

//SI NO SE USA BORRAR ESTA FUNCION
/* const getProduct = async (productId: any) => {
    const products = await apiService.get(`http://localhost:3001/product_general/${productId}`);
    return [products];
} */


const getCatalog = async () => {
    const { id } = getLoginUser()
    const products = await apiService.get(`http://localhost:4000/users/${id}/products`);
    return products;
}

/* const getProducts = async () => {
    const products = await apiService.get(`http://localhost:3001/product_general`);
    return products;
} */

/* const getRecivedProducts = async () => {
    const products = await apiService.get('http://localhost:3001/received_products');
    return products;
}

const getSoldProducts = async () => {
    const products = await apiService.get('http://localhost:3001/sold_products');
    return products;
} */

//export const useDashboard = (productId: any) => {
export const useDashboard = (productId: any) => {

    /* const productSelect = useQuery(
        ['productInfo', productId],
        () => getProduct(productId),
    ) */

    const productSelect = useQuery(
        ['listCatalog'],
        getCatalog,
        {
            select: (data: any) => {
                const catalogList = data.body.data.map((item: { id: any; name: any; }) => ({
                    id: item.id,
                    name: item.name
                }))
                return catalogList
            },
            refetchOnWindowFocus: false, // default: true
        }
    )

    //PRUEBA
    /* const listProducts = useQuery(
        ['productInfo', productId],
        getMovement,
        {
            select: (data) => {
                //ARR QUE TENDRA LOS VALORESd
                let resultFinale = []
                //FILTRO POR ID
                const dataListForId = data.filter(item => item.product.id === parseInt(productId));

                //ESTO DEBE TENER UNA CONDICION, PARA QUE SI UN PRODUCTO NO TIENE MOVIMIENTOS, NO DEBE HACER LO DE ADELANTE
                //DEBO CONDICIONAR SI EXISTE SOLO VENTAS O COMPRAS
                if (dataListForId.length > 0) {
                    //SEPARO ENTRADA Y SALIDA
                    const entradas = dataListForId.filter(item => item.type.name === "Entrada");
                    const salidas = dataListForId.filter(item => item.type.name === "Salida");
                    //OBTENGO CALCULOS
                    if (entradas.length > 0 && salidas.length > 0) {

                        const resultEntry = entradas.reduce((accumulator, currentItem) => {
                            if (!accumulator.product) {
                                accumulator.product = currentItem.product;
                                accumulator.quantityEntry = 0; // Inicializar la propiedad quantity
                            }
                            accumulator.quantityEntry += currentItem.quantity;
                            accumulator.earningsEntry = (accumulator.earningsEntry || 0) + (currentItem.quantity * parseFloat(currentItem.unitPrice));
                            return accumulator;
                        }, {});
                        const resultSold = salidas.reduce((accumulator, currentItem) => {
                            if (!accumulator.product) {
                                accumulator.product = currentItem.product;
                                accumulator.quantitySold = 0; // Inicializar la propiedad quantity
                            }
                            accumulator.quantitySold += currentItem.quantity;
                            accumulator.earningsSold = (accumulator.earningsSold || 0) + (currentItem.quantity * parseFloat(currentItem.unitPrice));
                            return accumulator;
                        }, {});
                        //MANDO LO QUE QUIERO AL ARR
                        resultFinale = [...resultFinale, resultEntry, resultSold]
                        //REDUSCO LOS OBJETOS DUPLICADOS DE PRODUCTNAME Y ID
                        const resultadoFinal = Object.values(resultFinale.reduce((acc, { product, ...rest }) => {
                            const productId = product.id;

                            if (!acc[productId]) {
                                acc[productId] = { ...product, ...rest };
                            } else {
                                Object.keys(rest).forEach(key => {
                                    acc[productId][key] = (acc[productId][key] || 0) + rest[key];
                                });
                            }

                            return acc;
                        }, {}));
                        return resultadoFinal
                    }
                    else {
                        return []
                    }
                }
                else {
                    return []
                }
            }
        }
    ) */

    const listProducts = useQuery(
        ['productInfo', productId],
        () => getMovement2(productId),
        {
            refetchOnWindowFocus: false,
        }
    )

    /* const productRecived = useQuery(
        ['productsRecived'],
        () => getRecivedProducts(),
    )

    const productSold = useQuery(
        ['productsSold'],
        () => getSoldProducts(),
    ) */



    return {
        //Properties
        /* data: productSelect.data,
        isLoading: productSelect.isLoading, */
        dataCatalog: productSelect.data,
        isLoadingCatalog: productSelect.isLoading,
        dataList: listProducts.data,
        isLoadingList: listProducts.isLoading
        //Methods

        //Getters

        //Mutations
    }
}