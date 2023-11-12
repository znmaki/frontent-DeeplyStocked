import { Box, Modal, Typography } from '@mui/material';
import { useModal, useValidation } from '../../../hooks';
import { Buttom, FormProduct, inputFormSold } from '../../../shared';
import { ProductSoldTable } from '../components/ProductTable';
import { useProductSales } from '../hooks/useProductSales';
import Loading from '../../../shared/components/Loading';

const SaleProductEntry = () => {
  const { open, handleOpen, handleClose, style } = useModal();
  const { validationSchema, initialSold } = useValidation(inputFormSold);
  const { data, handleSubmit, isLoading } = useProductSales(handleOpen, handleClose)

  return (
    isLoading ? (
      <Loading />
    ) : (
      <div className='h-screen px-10 space-y-10 pt-16'>
        <Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
          Registro de productos vendidos
        </Typography>
        <Buttom modalOpen={handleOpen}>Ingresar venta</Buttom>
        <ProductSoldTable rowData={data} handleOpen={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          className="custom-modal-class"
        >
          <Box sx={style}>
            <FormProduct
              inputConfigs={inputFormSold}
              initialValues={initialSold}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              titleButom='Venta'
            />
          </Box>
        </Modal>
      </div>)
  )
}

export default SaleProductEntry