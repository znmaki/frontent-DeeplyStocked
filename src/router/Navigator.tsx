import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginUser, CreateUser, Authentication, SendEmail, ChangePassword } from "../modules/user"
import { ProductDashboard, ProductsDashboard, ReceivedProductRegistration, SoldProductRegistration, RegisterProduct } from "../modules/product"
import { Layout } from "../shared"
//import ListNavi from "../ListNavi"

const Navigator = () => {
	return (
		<BrowserRouter>
			{/* <ListNavi /> */}

			<Routes>
				<Route path='/' element={<Navigate to='/login' replace />} />
				{/* CUALQUIER USUSARIO */}
				<Route path='/login' element={<LoginUser />} />
				<Route path='/create-account' element={<CreateUser />} />
				{/* PAGINA PARA ACTIVAR CUENTA */}
				<Route path='/auth/activate' element={<Authentication />} /> 
				<Route path='/auth/reset-password' element={<ChangePassword />} /> 
				<Route path='/auth/forgot-password' element={<SendEmail />} /> 
				{/* DEBE LOGEARSE */}
				<Route path="/" element={<Layout />}>					
					<Route path="inicio" element={<ProductsDashboard />} />
					<Route path="registrar-producto" element={<RegisterProduct />} />
					<Route path="productos-recibidos" element={<ReceivedProductRegistration />} />
					<Route path="productos-vendidos" element={<SoldProductRegistration />} />
					<Route path="tablero-productos/:id" element={<ProductDashboard />} />
					<Route path="*" element={<ProductsDashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default Navigator
