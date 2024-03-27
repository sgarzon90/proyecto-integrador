import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import "./productSearch.scss";

import InputField from "../form/inputField/InputField.jsx";
import Button from "../button/Button.jsx";
import SearchIcon from "@mui/icons-material/Search";

const ProductSearch = ({ searchProducts }) => {
    const validationSchema = yup.object({
        text: yup
            .mixed()
            .test("is-number-or-string", "Ingresa 3 o más caracteres o un número", (value) => {
                if (!value) return true;
                if (!isNaN(value)) return true;
                return value.trim().length >= 3;
            }),
    });

    const formik = useFormik({
        initialValues: {
            text: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const productsFound = await searchProducts(values.text);
            console.log(productsFound);
        },
    });

    const handleOnChange = (event) => {
        formik.handleChange(event);

        if (event.target.value.trim().length === 0) {
            searchProducts("");
        }
    };

    return (
        <Box
            component="form"
            className="product-search"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}>

            <InputField
                name="text"
                value={formik.values.text}
                onChange={handleOnChange}
                onBlur={formik.handleBlur}
                error={formik.touched.text && Boolean(formik.errors.text)}
                errorMessage={formik.touched.text && formik.errors.text}
                inputProps={{ maxLength: 10 }}
                placeholder="Buscar..."
            />
            <Button type="submit"><SearchIcon/></Button>
        </Box>
    );
};

ProductSearch.propTypes = {
    searchProducts: PropTypes.func.isRequired,
};

export default ProductSearch;