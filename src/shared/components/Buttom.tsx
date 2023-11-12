import { ReactNode } from 'react';

interface BaseButtonProps {
	children?: ReactNode;
	style?: string;
}

interface ButtonProps extends BaseButtonProps {
	modalOpen?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface ButtonHeaderProps extends BaseButtonProps {
	iconComponent?: any;
	text: string;
}

export const Buttom = ({ children, modalOpen, style }: ButtonProps) => {
	return (
		<button type='submit' onClick={modalOpen} className={`bg-[#FF954A] text-xl px-4 pt-3 pb-4 rounded-md text-white font-bold ${style}`}>
			{children}
		</button>
	)
}

export const ButtomHeader = ({ iconComponent, children, text }: ButtonHeaderProps) => {
	return (
		<div className="w-full flex bg-[#F8F7FA] py-4 px-7 rounded-md">
			<p className="min-w-[56px]">{iconComponent}</p>
			<p>{text}</p>
			{children}
		</div>
	)
}