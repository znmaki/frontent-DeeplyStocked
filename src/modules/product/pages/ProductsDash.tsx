import { Typography } from '@mui/material';
import { useDashGeneral } from '../hooks/useDashGeneral';
import DashPieChart from '../components/DashPieChart';
import Loading from '../../../shared/components/Loading';
import { Fragment } from 'react';
import DashPieChartPrice from '../components/DashPieChartPrice';
//import DashBarVertical from '../components/DashBarVertical';
import CardChart from '../components/CardChart';

const ProductsDashboard = () => {
  //console.log('ProductsDashboard');
  const { isLoading, data } = useDashGeneral();
  //console.log('ENTRASTE');
  
  /* if (!isLoading) {
    console.log(data);
  } */

  return (
    <div className='h-full px-10 space-y-10 overflow-scroll overflow-x-hidden pt-16'>
      {isLoading ? (<Loading />) : (
        <Fragment>
          <Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
            Información General
          </Typography>
          <div className='flex flex-col space-y-10'>
            <div className='flex justify-evenly'>
              <CardChart title={'Total de Productos Comprados'}>
                <DashPieChart quantity={data && data[0]} />
              </CardChart>
              <CardChart title={'Total de Productos Vendidos'}>
                <DashPieChart quantity={Math.abs(data && data[1])} />
              </CardChart>
            </div>
            <div className='flex justify-evenly'>
              <CardChart title={'Total de Dinero en Compras'}>
                <DashPieChartPrice quantity={Math.abs(parseFloat(data && data[2]))} />
              </CardChart>
              <CardChart title={'Total de Dinero en Ventas'}>
                <DashPieChartPrice quantity={Math.abs(data && data[3])} />
              </CardChart>
            </div>
            {/* <div className='flex justify-center'>
              <CardChart title={'Producto más Comprado y Vendido'} editStyle={'mb-10'}>
                <DashBarVertical maxEntrada={data && data[6]} maxSalida={data && data[7]} />
              </CardChart>
            </div> */}
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default ProductsDashboard