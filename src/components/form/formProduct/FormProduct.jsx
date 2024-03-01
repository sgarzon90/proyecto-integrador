import { useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./formProduct.scss";

import validationSchema from "./formProduct.validate.js";
import useProducts from "../../../hooks/useProducts.js";
import InputField from "../inputField/InputField";
import Button from "../../button/Button";
import Switch from "../switch/Switch.jsx";
import Alert from "../../alert/Alert.jsx";

const FormProduct = ({ initialValues }) => {
    const { createProduct, updateProduct, getProductById } = useProducts();
    const [ openAlert, setOpenAlert ] = useState(false);
    const [ imageLoaded, setImageLoaded ] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            try {
                if (values.id && !imageLoaded) {

                    const existingProduct = getProductById(values.id);
                    if (existingProduct) {
                        values.image = existingProduct.image;
                    }
                }

                if (values.id) {
                    await updateProduct(values);
                } else {
                    await createProduct(values);
                }
                setOpenAlert(true);
            } catch (error) {
                console.error("Error creating/updating product:", error);
            }
        },
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const dataUrl = reader.result;
                formik.setFieldValue("image", dataUrl);
                setImageLoaded(true);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            component="form"
            className="form-product"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}>
            <InputField
                label="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                errorMessage={formik.touched.name && formik.errors.name}
                inputProps={{ maxLength: 25 }}
            />
            <InputField
                label="Precio"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                errorMessage={formik.touched.price && formik.errors.price}
                inputProps={{ maxLength: 12 }}
            />
            <InputField
                label="Stock"
                name="stock"
                value={formik.values.stock}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                errorMessage={formik.touched.stock && formik.errors.stock}
                inputProps={{ maxLength: 6 }}
            />

            <InputField
                label="Marca"
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            <FormControl fullWidth>
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                    labelId="category-label"
                    id="category"
                    name="category"
                    value={formik.values.category || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                >
                    <MenuItem value="Gorra">Gorra</MenuItem>
                    <MenuItem value="Bolso">Bolso</MenuItem>
                    <MenuItem value="Productos de Limpieza">Productos de Limpieza</MenuItem>
                </Select>
            </FormControl>

            <InputField
                label="Descripción"
                name="description"
                multiline
                rows={5}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.description && Boolean(formik.errors.description)}
                errorMessage={formik.touched.description && formik.errors.description}
            />

            <Switch
                label="Producto Importado"
                name="isImported"
                value={formik.values.isImported}
                onChange={(event) => formik.setFieldValue("isImported", event.target.checked)}
            />

            <Switch
                label="Producto Nacional"
                name="isNational"
                value={formik.values.isNational}
                onChange={(event) => formik.setFieldValue("isNational", event.target.checked)}
            />
            <Switch
                label="Envío sin Cargo"
                name="freeShipping"
                value={formik.values.freeShipping}
                onChange={(event) => formik.setFieldValue("freeShipping", event.target.checked)}
            />

            <Switch
                label="Está en promoción"
                name="isPromotion"
                value={formik.values.isPromotion}
                onChange={formik.handleChange}/>

            <FormControl fullWidth>

                <InputLabel id="photo-label"></InputLabel>
                <InputField
                    name="image"
                    type="file"
                    onChange={handleImageChange}
                    inputProps={{ accept: "image/*" }}
                />
                {formik.values.image && (
                    <img
                        src={formik.values.image}
                        alt="Fotografía del producto"
                        style={{ width: "100%", marginTop: "10px" }}
                    />
                )}
            </FormControl>

            <Button type="submit">Guardar</Button>

            <Button
                component={NavLink}
                to="/"
                type="button"
                color="danger">
                        Cancelar
            </Button>

            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                message="El producto se ha procesado correctamente"
                redirectUrl="/"
            />
        </Box>
    );
};

FormProduct.propTypes = {
    initialValues: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        isPromotion: PropTypes.bool.isRequired,
        image: PropTypes.string,
    }),
};

FormProduct.defaultProps = {
    initialValues: {
        name: "",
        description: "",
        image: "",
        stock: 0,
        price: 0,
        isPromotion: false,
        brand: "",
        category: "Gorra",
        isImported: false,
        isNational: false,
        freeShipping: false,
    },
};

export default FormProduct;