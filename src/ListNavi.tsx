import { Link } from "react-router-dom"

const ListNavi = () => {
  return (
    <ul className="absolute top-[50%]">
      <li><Link to='/create-account'>Create User</Link></li>
      <li><Link to='/login'>Login</Link></li>
      <li><Link to='/inicio'>Inicio</Link></li>
      <li><Link to='/registro-productos'>Nuevo Producto</Link></li>
      <li><Link to='/registro-ventas'>Nueva Venta</Link></li>
    </ul>
  )
}

export default ListNavi