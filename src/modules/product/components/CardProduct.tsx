import { Typography } from '@mui/material';

const CardProduct = ({ quantity, title }: any) => {
	return (
		<div className='bg-white rounded-md py-8 px-4 shadow-lg'>
			<Typography variant="h4" component='h1' className='!font-bold !text-[3.125rem]'>
				{quantity}
			</Typography>
			<p>{title}</p>
		</div>
	)
}

export default CardProduct