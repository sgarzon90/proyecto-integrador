import { useState, useContext } from "react";
import { Drawer, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";
import Alert from "../alert/Alert.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { IMAGES_URL } from "../../constanst/api.js";

import "./shoppingCartModal.scss";

const ShoppingCartModal = ({ isOpen, onClose }) => {
    const { shoppingCart, removeProductFromCart, cancelShoppingCart } = useContext(ShoppingCartContext);
    const [ openAlert, setOpenAlert ] = useState(false);

    const validationSchema = yup.object({
        firstName: yup
            .string("Ingresa tu nombre")
            .min(2, "El nombre debe tener al menos 2 caracteres")
            .required("El nombre es obligatorio"),
        lastName: yup
            .string("Ingresa tu apellido")
            .min(2, "El apellido debe tener al menos 2 caracteres")
            .required("El apellido es obligatorio"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post("https://puntooriente.onrender.com/api/products/process-cart", {
                    items: shoppingCart,
                    customerInfo: {
                        nombre: values.firstName,
                        apellido: values.lastName,
                    },
                });
                if (response.status === 200) {
                    setOpenAlert(true);
                    cancelShoppingCart();
                    formik.resetForm();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                } else {
                    console.error("Error en la compra:", response.data.message);
                }
            } catch (error) {
                console.error("Error de conexión:", error.message);
            }
        },
    });

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

    const handleCancelPurchase = () => {
        cancelShoppingCart();
        onClose();
        formik.resetForm();
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
                                            src={`${IMAGES_URL}${product.imageFileName}`}
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
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            name="firstName"
                            label="Nombre"
                            variant="outlined"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            style={{ marginBottom: "10px" }}
                            className="form-field"
                        />
                        <TextField
                            name="lastName"
                            label="Apellido"
                            variant="outlined"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            style={{ marginBottom: "10px" }}
                            className="form-field"
                        />

                        <Box className="button-group">

                            <Button
                                variant="contained"
                                className="button__cancel"
                                onClick={handleCancelPurchase}
                                style={{ marginTop: "10px" }}
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                className="button__shop"
                                disabled={isCartEmpty}
                                style={{ marginTop: "10px" }}
                            >
                                Comprar
                            </Button>
                        </Box>
                    </form>
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