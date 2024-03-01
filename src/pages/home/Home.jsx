import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { gallery } from "../../data/data.js";
import "./home.scss";

import { IT_IS_OFF } from "../../constanst/general.js";

import ProductSearch from "../../components/productSearch/ProductSearch";
import ProductCard from "../../components/productCard/ProductCard";
import ProductCreateCard from "../../components/productCreateCard/ProductCreateCard.jsx";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";

const Home = () => {
    const [ products, setProducts ] = useState([]);
    const { removeProduct } = useContext(ShoppingCartContext);

    useEffect(() => {
        setProducts(gallery);
    }, []);

    const handleCardDelete = (productId) => {

        removeProduct(productId);
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        // Actualizar el almacenamiento local
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };
    return (
        <Box className="home">
            <Box
                component="section"
                className="home__section">

                <Box className="home__section__search">
                    <h3>Productos</h3>
                    <ProductSearch setProducts={setProducts}/>
                </Box>

                <Box
                    className="home__section__cards">
                    <ProductCreateCard/>
                    {products?.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            description={product.description}
                            onCardDelete={handleCardDelete}
                            itIsOff={IT_IS_OFF}
                            setProducts={setProducts}/>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;