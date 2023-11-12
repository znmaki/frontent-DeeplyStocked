import { useState } from "react";
import { Collapse, List, ListItem, ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ButtomHeader } from "..";
import { IconContract, IconHome, IconPanel, IconProduct, IconStretch } from "./Icons";
import { useQueryClient } from "@tanstack/react-query";
import { useNavbar } from "../hooks/useNavbar";

const Navbar: any = () => {
    const { data, isLoadingIds } = useNavbar();
    const [open, setOpen] = useState(true);
    const [idProduct, setIdProduct] = useState();
    const queryClient = useQueryClient();
    const productId: number | undefined | any = queryClient.getQueryData(['listCatalog']);

    console.log(idProduct);

    const handleClick = () => {
        setOpen(!open);
    };

    /* if (!isLoadingIds) {
        console.log(data[0].id);
    } */

    const handleGetProduct = () => {
        setIdProduct(productId.body.data[0].id)
    }

    return (
        !isLoadingIds && (
            <div className=" pt-16">
                <List>
                    <ListItem>
                        <Link to='/inicio' className="w-full">
                            <ButtomHeader text='Inicio' iconComponent={<IconHome />}/>
                        </Link>
                    </ListItem>
                    <ListItemButton onClick={handleClick}>
                        <ButtomHeader text='Productos' iconComponent={<IconProduct />}>
                            {open ? <p className="ml-auto mt-1.5"><IconContract /></p> : <p className="ml-auto mt-1.5"><IconStretch /></p>}
                        </ButtomHeader>
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List>
                            <Link to='/registrar-producto' className="w-full">
                                <ListItem>
                                    <ButtomHeader text='Nuevo producto' iconComponent={<IconProduct />}/>
                                </ListItem>
                            </Link>
                            <Link to='/productos-recibidos' className="w-full">
                                <ListItem>
                                    <ButtomHeader text='Nuevo producto recibido' iconComponent={<IconProduct />}/>
                                </ListItem>
                            </Link>
                            <Link to='/productos-vendidos' className="w-full">
                                <ListItem>
                                    <ButtomHeader text='Productos vendidos' iconComponent={<IconProduct />}/>
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                    <ListItemButton>
                        <Link to={`/tablero-productos/${data[0].id}`} className="w-full" onClick={handleGetProduct}>
                            <ButtomHeader text='Panel de Productos' iconComponent={<IconPanel />}/>
                        </Link>
                    </ListItemButton>
                    {/* Agrega más elementos de navegación según sea necesario */}
                </List>
            </div>
        )
    );
};


export default Navbar