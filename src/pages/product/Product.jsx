import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import "./product.scss";

import FormProduct from "../../components/form/formProduct/FormProduct";
import { useRef } from "react";

const Product = () => {
    const location = useLocation();
    const productRef = useRef(location?.state?.product);

    return (
        <Box className="product">
            <Box
                component="section"
                className="product__section">
                <h3 className="product__section title">Gestionar Productos</h3>
                <FormProduct initialValues={productRef.current}/>
            </Box>
        </Box>
    );
};

export default Product;