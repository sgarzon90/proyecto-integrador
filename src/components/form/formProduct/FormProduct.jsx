import { useState } from "react";
import useProducts from "../../../hooks/useProducts.js";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./formProduct.scss";
import validationSchema from "./formProduct.validate.js";
import InputField from "../inputField/InputField.jsx";
import InputFile from "../inputFile/InputFile.jsx";
import Button from "../../button/Button";
import Switch from "../switch/Switch.jsx";
import Alert from "../../alert/Alert.jsx";
import { IMAGES_URL, IMAGE_DEFAULT_NAME } from "../../../constanst/api.js";
import { JPG, JPEG, PNG } from "../../../constanst/general.js";

const FormProduct = ({ initialValues }) => {

    const [ openAlert, setOpenAlert ] = useState(false);
    const { createProduct, updateProduct, uploadProductImage } = useProducts();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (!values.files || values.files.length === 0) {
                console.error("No se ha seleccionado ningún archivo.");
                return;
            }

            try {
                const response = await uploadProductImage(values.files[0]);
                values.imageFileName = response?.data?.filename ? response.data.filename : IMAGE_DEFAULT_NAME;

                values.id ? await updateProduct(values.id, values) : await createProduct(values);
                setOpenAlert(true);
            } catch (error) {
                console.error("Error al cargar la imagen:", error);
            }
        },
    });

    return (
        <Box
            component="form"
            className="form-product"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
        >
            <InputField
                label="Nombre"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                errorMessage={formik.touched.name && formik.errors.name}
                inputProps={{ maxLength: 50 }}
            />
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
                label="Marca"
                name="brand"
                value={formik.values.brand || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                value={formik.values.stock || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.stock && Boolean(formik.errors.stock)}
                errorMessage={formik.touched.stock && formik.errors.stock}
                inputProps={{ maxLength: 6 }}
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
                onChange={formik.handleChange}
            />
            <InputFile
                label="Imagen"
                name="files"
                accept={[ JPG, JPEG, PNG ]}
                formik={formik}
                error={formik.touched.files && Boolean(formik.errors.files)}
                errorMessage={formik.errors.files}/>
            <Box
                className="form-product__image"
                component="img"
                src={`${IMAGES_URL}/${formik.values.imageFileName}`}
                alt="Fotografía del producto"
                style={{ display: formik.values.files && formik.values.files.length > 0 ? "block" : "none" }}
            />
            <Button type="submit">Guardar</Button>
            <Button
                component={NavLink}
                to="/"
                type="button"
                color="danger"
            >
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
        imageFileName: PropTypes.string.isRequired,
        brand: PropTypes.string,
        category: PropTypes.string,
        isImported: PropTypes.bool,
        isNational: PropTypes.bool,
        freeShipping: PropTypes.bool,
        isPromotion: PropTypes.bool,
    }),
};
FormProduct.defaultProps = {
    initialValues: {
        name: "",
        description: "",
        stock: 0,
        price: 0,
        brand: "",
        category: "Gorra",
        isImported: false,
        isNational: false,
        freeShipping: false,
        isPromotion: false,
        imageFileName: IMAGE_DEFAULT_NAME,
        files: [],
    },
};
export default FormProduct;