import { useLocation } from "react-router-dom"
import { apiService } from "../../../shared";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/svg-deepstocked (1).svg";

const Authentication = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    useEffect(() => {
        apiService.post(`auth/activate?token=${token}`, {});
    }, [token])

    return (
        <div className="w-[30%] m-auto">
            <img src={Logo} alt="Logo" />
            <h1 className="text-center">Felicidades, usted se registro correctamente !</h1>

            <Link to='/inicio' className="w-full">
                <button className='bg-[#FF954A] text-xl px-4 pt-3 pb-4 rounded-md text-white font-bold w-full mt-4'>Ir al Inicio</button>
            </Link>
        </div>
    )
}

export default Authentication