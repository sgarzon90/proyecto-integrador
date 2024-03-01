import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
    Badge,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ShoppingCartContext } from "../../../contexts/ShoppingCartContext.jsx";
import { ShoppingCartModal } from "../../shoppingCart/ShoppingCartModal.jsx";
import "./navbar.scss";

import links from "../../../links/links";

const Navbar = () => {
    const { shoppingCart } = useContext(ShoppingCartContext);

    const totalProductsInCart = Array.isArray(shoppingCart) ? shoppingCart.reduce((total, product) => total + product.amount, 0) : 0;

    const [ openDrawer, setOpenDrawer ] = useState(false);
    const [ openShoppingCartModal, setOpenShoppingCartModal ] = useState(false);

    const handleOnClickOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleOnClickCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const handleOpenShoppingCartModal = () => {
        setOpenShoppingCartModal(true);
    };

    const handleCloseShoppingCartModal = () => {
        setOpenShoppingCartModal(false);
    };

    return (
        <Box
            component="nav"
            className="navbar">
            <Box className="navbar__drawer-icon">
                <MenuIcon onClick={handleOnClickOpenDrawer}/>
            </Box>

            <Box className="navbar__items">
                {links.map((link, index) => (
                    <Button
                        key={index}
                        component={NavLink}
                        to={link.url}>
                        {link.title}
                    </Button>
                ))}
            </Box>

            <Box className="navbar__shopping-cart">
                <IconButton
                    onClick={handleOpenShoppingCartModal}
                >
                    <Badge
                        badgeContent={totalProductsInCart > 99 ? "99+" : totalProductsInCart}
                        color="primary"
                        max={99}>
                        <ShoppingCartOutlinedIcon className="carrito"/>
                    </Badge>
                </IconButton>
            </Box>

            <Drawer
                open={openDrawer}
                anchor="left"
                onClose={handleOnClickCloseDrawer}>
                <List>
                    {links.map((link, index) => (
                        <ListItem
                            key={index}
                            component={NavLink}
                            to={link.url}>
                            <ListItemButton onClick={handleOnClickCloseDrawer}>
                                <ListItemIcon>{link.icon}</ListItemIcon>
                                <ListItemText>{link.title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <ShoppingCartModal
                isOpen={openShoppingCartModal}
                onClose={handleCloseShoppingCartModal}/>
        </Box>
    );
};

export default Navbar;