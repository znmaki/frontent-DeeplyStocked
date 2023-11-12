import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/logoHeader.svg'
import { getLoginUser, removeAccessToken, removeLoginUser, removeRefreshToken } from '../../../shared';
import { Tooltip } from '@mui/material';

const Header = () => {
	const { pathname } = useLocation();
	const { firstName, lastName } = getLoginUser();

	const navigate = useNavigate();

	const handleLogout = () => {
		removeAccessToken()
		removeRefreshToken()
		removeLoginUser()
		navigate('/login')
	}

	return (
		<>
			{pathname === '/login' || pathname === '/create-account' ? null : (
				<div className='flex fixed w-full z-10 border-b border-[#ECECEC]'>
					<div className="bg-[#3F3D56] basis-[20%] py-2 flex justify-center">
						<img src={Logo} alt="Logo" />
					</div>
					<div className='bg-white grow py-2 flex items-center justify-around'>
						{/* <p className='rotate-scale-up '>pipipi</p> */}
						<button type='button' onClick={handleLogout} className='text-[#FF954A] font-bold'>Cerrar Sesión</button>
						<Tooltip
							title={firstName + ' ' + lastName}
							placement="bottom-start"
							componentsProps={{
								tooltip: {
									style: { backgroundColor: '#FFFFFF', color: '#FF954A', fontSize: '1rem' },
								},
							}}
						>
							<p className='bg-[#3F3D56] text-white py-3 px-[1.1rem] rounded-full cursor-pointer'>{firstName.charAt(0).toUpperCase()}</p>
						</Tooltip>
					</div>
				</div>
			)}
		</>
	)
}

export default Header