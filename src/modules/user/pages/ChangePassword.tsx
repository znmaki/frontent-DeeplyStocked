import { useLocation } from "react-router-dom"
import { apiService } from "../../../shared";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/svg-deepstocked (1).svg";
import Swal from 'sweetalert2'

const ChangePassword = () => {
    const [pass, setPass] = useState('');
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');


    const handlePassChange = (e: any) => {
        setPass(e.target.value);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = {
            password: pass,
        };

        try {
            apiService.post(`auth/reset-password?token=${token}`, data);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: `¡Qué bien!`,
                text: `La Operación se Realizó con Éxito`,
                showConfirmButton: false,
                backdrop: false,
                timer: 2500,
            })
            setPass('')

        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    return (
        <div className="w-[30%] m-auto">
            <img src={Logo} alt="Logo" />
            <h1 className="text-center bg-[#FF954A] text-2xl px-4 pt-3 pb-4 rounded-sm text-white font-bold w-full">Ingrese su nueva contraseña</h1>
            <div>
                <form onSubmit={handleSubmit} className='space-y-8'>
                    <label className='text-2xl basis-[30%]'>
                        Contraseña:
                    </label>
                    <input
                        type="text"
                        value={pass}
                        onChange={handlePassChange}
                        className='w-full text-xl border border-[#707070] bg-white px-2 rounded-md'
                        required
                    />
                    <button type="submit" className='bg-[#FF954A] text-xl px-4 pt-3 pb-4 rounded-md text-white font-bold w-full'>Enviar</button>
                    <Link to='/inicio' className="w-full">
                        <button className='bg-[#FF954A] text-xl px-4 pt-3 pb-4 rounded-md text-white font-bold w-full mt-4'>Ir al Inicio</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword