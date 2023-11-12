import { Tooltip, Typography } from '@mui/material';
import { IconHelp } from './Icons';

const Title = ({ title, infoHover, style, styleLine = 'basis-[40%]' }: any) => {
	return (
		<div className='flex items-center pb-4'>
			<Typography variant="h4" component='h1' className={`!font-bold !text-[30px] ${style}`}>
				{title}
			</Typography>
			<Tooltip
				title={infoHover}
				placement="bottom-start"
				componentsProps={{
					tooltip: {
						style: { backgroundColor: '#FFFFFF', color: '#FF954A' },
					},
				}}
			>
				<p className='px-6'><IconHelp/></p>
			</Tooltip>
			<hr className={`border border-[#FF954A] ${styleLine}`} />
		</div>
	)
}

export default Title
