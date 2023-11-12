import { Typography, Modal, Box } from "@mui/material"
import { ProductTable } from ".."
import { Buttom, FormProduct, inputFormProduct } from "../../../shared"
import { useModal, useValidation } from "../../../hooks";
import { useProduct } from "../hooks/useProduct";
import Loading from "../../../shared/components/Loading";

const RegisterProduct = () => {
    const { open, handleOpen, handleClose, style } = useModal();
    const { validationSchema, initialProduct } = useValidation(inputFormProduct);
    const { data, handleSubmit, isLoading } = useProduct(handleOpen, handleClose) as any;

    return (
        isLoading ? (
            <Loading />
        ) : (
            <div className='h-screen px-10 space-y-10 pt-16'>
                <Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
                    Registro de productos
                </Typography >
                <Buttom modalOpen={handleOpen}>Ingresar Producto</Buttom>
                <ProductTable rowData={data.body.data} handleOpen={handleOpen} />
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <FormProduct
                            inputConfigs={inputFormProduct}
                            initialValues={initialProduct}
                            onSubmit={handleSubmit}
                            validationSchema={validationSchema}
                            titleButom='Producto'
                        />
                    </Box>
                </Modal>
            </div >
        )
    )
}

export default RegisterProduct
