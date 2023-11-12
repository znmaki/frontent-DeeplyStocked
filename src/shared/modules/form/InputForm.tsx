import { useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, useField } from 'formik';
import { Fragment } from 'react';

export const InputForm = ({ content, type = 'text', id }: any) => {
	const [field, meta] = useField(id);

	const queryClient = useQueryClient();
	const infoProducts: [] | any = queryClient.getQueryData(['infoProducts']);
	const products: number | any = queryClient.getQueryData(['products']);
	let stockProduct

	/* const handleSelectChange = (event: { target: { value: any; }; }) => {
		const selectedValue = event.target.value;
		queryClient.setQueryData(['idSelect'], selectedValue);
		console.log(selectedValue);
	}; */

	return (
		<div className='flex flex-row items-center justify-between'>
			<label htmlFor={id} className='text-xl basis-[30%]'>{content}</label>
			<div className='basis-[70%]'>
				{type === 'select' ? (
					<Field
						as="select"
						name={id}
						className='w-full text-xl border border-[#707070] bg-white px-2 rounded-md'
						/* onChange={handleSelectChange} */
						onBlur={(event: { target: { value: any; }; }) => {
							const selectedValue = event.target.value;
							// Realiza tu acción personalizada aquí
							queryClient.setQueryData(['idSelect'], selectedValue);

							stockProduct = products.body.data.filter((product: { id: any; }) => product.id == selectedValue);
							queryClient.setQueryData(['stock'], stockProduct);
						}}
					>
						<option disabled value="">Lista de Productos</option>
						{infoProducts && (
							infoProducts.map((product: any) => (
								<option value={product.id} key={product.id}>{product.name}</option>
							))
						)}
					</Field>
				) : (
					<Fragment>
						<Field
							{...field}
							type={type}
							id={id}
							name={id}
							className={`w-full text-xl border border-[#707070] px-2 rounded-md 
					${meta.touched && meta.error ? 'border-2 border-red-500' : ''}`
							}
							style={{ outline: 'none' }}
						/>
						<ErrorMessage
							name={id}
							component="div"
							className='absolute basis-[40%] text-red-500'
						/>
					</Fragment>
				)}
			</div>
		</div>
	)
}

export const InputFormChild = ({ children = null, content, type = 'text', id }: any) => {
	const [field, meta] = useField(id);
	return (
		<div className='flex flex-row items-center justify-between'>
			<label htmlFor={id} className='text-xl basis-[30%] pr-4'>{content}</label>
			<div className='basis-[35%]'>
				<Field
					{...field}
					type={type}
					id={id}
					name={id}
					className={`w-full text-xl border border-[#707070] px-2 rounded-md 
					${meta.touched && meta.error ? 'border-2 border-red-500' : ''}`
					}
					style={{ outline: 'none' }}
				/>
				<ErrorMessage
					name={id}
					component="div"
					className='absolute basis-[40%] text-red-500'
				/>
			</div>
			<div className='basis-[35%] text-right'>
				{children}
			</div>
		</div>
	)
}

export const InputFormLogin = ({ content, type = 'text', id }: any) => {
	const [field, meta] = useField(id);
	return (
		<div className='space-y-4'>
			<label htmlFor={id} className='text-xl'>{content}</label>
			<div>
				<Field
					{...field}
					type={type}
					id={id}
					name={id}
					className={`w-full text-xl border border-[#707070] px-2 rounded-md 
					${meta.touched && meta.error ? 'border-2 border-red-500' : ''}`
					}
					style={{ outline: 'none' }}
				/>
				<ErrorMessage
					name={id}
					component="div"
					className='absolute basis-[40%] text-red-500'
				/>
			</div>
		</div>
	)
}