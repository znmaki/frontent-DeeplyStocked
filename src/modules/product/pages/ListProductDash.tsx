import { Typography } from '@mui/material';
import jsonData from '../data/data.json'
import CardProduct from '../components/CardProduct';
import Title from '../../../shared/components/Title';
import { TableCatalog } from '../components/ProductTable';
import MonthlyDemandChart from '../components/MonthlyDemandChart';
import { useDashboard } from '../hooks/useDashboard';
import { useParams } from 'react-router-dom';
import Loading from '../../../shared/components/Loading';
import { formatPrice } from '../helper/formatPrice';
import { Fragment } from 'react';

const ProductPanel = () => {
  const { id } = useParams()
  /* const { data, dataList, isLoading }: any = useDashboard(id) */
  const { dataList, isLoadingList, dataCatalog }: any = useDashboard(id)
  if (!isLoadingList) {
    console.log(dataList);
  }
  /* if (!isLoadingList) {
    console.log(dataList);    
  }

  if (!isLoadingCatalog) {
    console.log(dataCatalog);
  } */

  return (
    isLoadingList ? (
      <Loading />
    ) : (

      <Fragment>
        <div className='h-full px-10 space-y-10 overflow-scroll overflow-x-hidden pt-16'>
          <Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
            Estimación de la demanda futura
            <Typography variant="h4" component='p' className='!font-bold !text-[3.125rem] text-[#FF954A]'>
              {dataList !== undefined ? dataList.product.name : 'No existe el nombre'}
            </Typography>
          </Typography>
          <div className='grid grid-cols-2 gap-10'>
            <div>
              <Title title='Información de Inventario' infoHover={jsonData.infoTitle.inventoryData} style='basis-[55%]' />

              <div className='grid grid-cols-2 gap-10'>
                <CardProduct quantity={dataList !== undefined &&
                  dataList !== undefined ?
                  (dataList.analytics.totalPurchases - dataList.analytics.totalSales) :
                  0} title={jsonData.titleCard[0]}
                />
                <CardProduct quantity={dataList !== undefined ?
                  dataList.analytics.totalSales :
                  'No hay datos de ventas'} title={jsonData.titleCard[1]}
                />
                <CardProduct quantity={dataList !== undefined ?
                  formatPrice(dataList.analytics.totalEarnings) :
                  'No hay datos de ganancias'} title={jsonData.titleCard[2]}
                />
                <CardProduct quantity={dataList !== undefined && dataList !== undefined
                  ? formatPrice(dataList.analytics.totalEarnings - dataList.analytics.totalInvested)
                  : 0
                } title={jsonData.titleCard[3]} />
              </div>
              {/* MODIFICAR */}
              <div className='mt-5'>
                <Title title='Optimización del inventario' infoHover={jsonData.infoTitle.inventoryOptimized} style='basis-[61%]' />
                {/* <CardProduct size='12' quantity={dataList !== undefined ?
                  Math.round(dataList.predictions.eoq) :
                  'No hay suficientes transacciones para la operación'} title='Cantidad económica de pedido'
                /> */}
                <CardProduct size='12' quantity={dataList.predictions !== null ?
                  Math.round(dataList.predictions.eoq) :
                  'No hay suficientes transacciones para la operación'} title='Cantidad económica de pedido'
                />
              </div>
            </div>

            <div className='row-span-2'>
              <Title title='Catálogo de Productos' infoHover={jsonData.infoTitle.productCatalog} />
              {dataCatalog.length > 0 ? (
                <TableCatalog rowData={dataCatalog} />
              ) : (
                <p>No existen datos</p>
              )}
            </div>
          </div>

          <div>
            <Title
              title='Predicción de demanda'
              infoHover={jsonData.infoTitle.predictedDemand}
              styleLine='basis-[72.4%]'
            />

            {dataList.predictions !== null ? (
              <MonthlyDemandChart historial={dataList.yearHistory} prediction={dataList.predictions.nextMonthPrediction.stock} />
            ) : (
              <div className='bg-white rounded-md py-8 px-4 shadow-lg'>
                <p className='!font-bold !text-[3.125rem]'>No hay suficientes transacciones para la operación</p>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    )

  )
}

export default ProductPanel