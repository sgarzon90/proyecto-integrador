import PropTypes from "prop-types";
import { Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";
import { useContext, useState } from "react";
import Alert from "../alert/Alert.jsx";

import "./shoppingCartModal.scss";

const ShoppingCartModal = ({ isOpen, onClose }) => {
    const { shoppingCart, removeProductFromCart, processShoppingCart, cancelShoppingCart } = useContext(ShoppingCartContext);
    const [ openAlert, setOpenAlert ] = useState(false);

    const calculateTotalPrice = (product) => {
        return product.price * product.amount;
    };

    const calculateTotalPurchase = () => {
        let total = 0;
        shoppingCart.forEach((product) => {
            total += calculateTotalPrice(product);
        });
        return total;
    };

    const isCartEmpty = shoppingCart.length === 0;

    const handleProcessPurchase = () => {
        processShoppingCart();
        setOpenAlert(true);
    };

    const handleCancelPurchase = () => {
        cancelShoppingCart();
        onClose();
    };

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={onClose}
        >
            <div className="cart-header">
                <img
                    src="/images/layout/lg2.png"
                    alt="Logo"/>
                <h2>Resumen de Compra</h2>
                <IconButton
                    className="close-icon"
                    onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <Box
                sx={{ width: "100%" }}
                className="cart-table">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Imagen</TableCell>
                                <TableCell>Nombre Producto</TableCell>
                                <TableCell>Cantidad</TableCell>
                                <TableCell>Precio</TableCell>
                                <TableCell>Importe</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shoppingCart.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            style={{ width: "50px" }}/>
                                    </TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.amount}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>${calculateTotalPrice(product)}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => removeProductFromCart(product.id)}>
                                            <DeleteIcon/>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", alignItems: "center", mt: 1 }}>
                    <strong>TOTAL: ${calculateTotalPurchase()}</strong>
                    <Box className="button-group">
                        <Button
                            variant="contained"
                            className="button__shop"
                            onClick={handleProcessPurchase}
                            disabled={isCartEmpty}
                            style={{ marginTop: "10px", color: isCartEmpty ? "white" : "white" }}
                        >
                    Comprar
                        </Button>
                        <Button
                            variant="contained"
                            className="button__cancel"
                            onClick={handleCancelPurchase}
                            style={{ marginTop: "10px" }}
                        >
                    Cancelar
                        </Button>
                    </Box>
                </Box>
                <Alert
                    openAlert={openAlert}
                    setOpenAlert={setOpenAlert}
                    message="Compra realizada con éxito"
                />
            </Box>
        </Drawer>
    );
};

ShoppingCartModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export { ShoppingCartModal };