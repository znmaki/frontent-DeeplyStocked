import { Box, Modal, Typography } from '@mui/material';
import { useModal, useValidation } from '../../../hooks';
import { Buttom, FormProduct, inputFormRecieved } from '../../../shared';
import { ProductRecievedTable } from '../components/ProductTable';
import { useProductEntry } from '../hooks/useProductEntry';
import Loading from '../../../shared/components/Loading';

const NewProductEntry = () => {
  const { open, handleOpen, handleClose, style } = useModal();
  const { validationSchema, initialReceived } = useValidation(inputFormRecieved);
  const { data, handleSubmit, isLoading } = useProductEntry(handleOpen, handleClose)

  return (
    isLoading ? (
      <Loading />
    ) : (
      <div className='h-screen px-10 space-y-10 pt-16'>
        <Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
          Registro de nuevos productos recibidos
        </Typography>
        <Buttom modalOpen={handleOpen}>Ingresar nueva entrada</Buttom>
        <ProductRecievedTable rowData={data} handleOpen={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
        >
          <Box sx={style}>
            <FormProduct
              inputConfigs={inputFormRecieved}
              initialValues={initialReceived}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              titleButom='Entrada'
            />
          </Box>
        </Modal>
      </div>)
  )
}

export default NewProductEntry
