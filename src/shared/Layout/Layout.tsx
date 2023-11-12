import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from ".."
import { Header } from "../../modules/product"
import { useLogin } from "../../modules/user/hooks/useLogin"

const Layout = () => {
	const { isLogin } = useLogin()
	/* console.log('isLogin in Layout state', isLogin); */

	if (!isLogin) {
		return <Navigate to="/login" replace />;
	}

	return (
		<div className="flex min-h-screen">
			<Header />
			<div className="bg-[#3F3D56] w-[20%]">
				<Navbar />
			</div>
			<div className="bg-[#F8F7FA] w-[80%] h-screen">
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
