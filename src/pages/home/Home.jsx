import { Box } from "@mui/material";
import "./home.scss";

import { IT_IS_OFF } from "../../constanst/general.js";

import ProductSearch from "../../components/productSearch/ProductSearch";
import ProductCard from "../../components/productCard/ProductCard";
import ProductCreateCard from "../../components/productCreateCard/ProductCreateCard.jsx";

import useProducts from "../../hooks/useProducts";

const Home = () => {
    const { products, searchProducts, deleteProduct } = useProducts();

    const handleCardDelete = async (productId) => {
        try {
            await deleteProduct(productId);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <Box className="home">
            <Box
                component="section"
                className="home__section">
                <Box className="home__section__search">
                    <h3>Productos</h3>
                    <ProductSearch searchProducts={searchProducts}/>
                </Box>

                <Box className="home__section__cards">
                    <ProductCreateCard/>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            description={product.description}
                            onCardDelete={handleCardDelete}
                            itIsOff={IT_IS_OFF}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Home;