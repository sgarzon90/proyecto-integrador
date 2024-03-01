import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import PropTypes from "prop-types";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = (props) => {
    const { children } = props;
    const { items, setItem } = useLocalStorage({
        shoppingCart: [],
        products: [],
    });

    const addProductCart = (product) => {
        const productQueEstaEnLS = getProductCart(product.id);
        if (productQueEstaEnLS) {

            product.amount = productQueEstaEnLS.amount + 1;
            const index = items.shoppingCart.findIndex((item) => item.id === product.id);
            const updatedCart = [...items.shoppingCart];
            updatedCart[index] = product;
            setItem("shoppingCart", updatedCart);
        } else {

            product.amount = 1;
            setItem("shoppingCart", [ ...items.shoppingCart, product ]);
        }
    };

    const updateShoppingCart = (updatedCart) => {
        setItem("shoppingCart", updatedCart);
    };

    const getProductCart = (id) => {
        return items.shoppingCart.find((item) => item.id === id);
    };

    const removeProduct = (productId) => {
        const updatedCart = items.shoppingCart.map((item) =>
            item.id === productId ? { ...item, amount: item.amount > 1 ? item.amount - 1 : 0 } : item,
        );

        const filteredCart = updatedCart.filter((item) => item.amount > 0);

        updateShoppingCart(filteredCart);
    };

    const removeProductFromCart = (productId) => {

        const updatedCart = items.shoppingCart.filter((item) => item.id !== productId);
        updateShoppingCart(updatedCart);
    };

    const updateProductStock = (productId, newStock) => {
        const updatedProducts = items.products.map((product) => {
            if (product.id === productId) {
                return { ...product, stock: newStock };
            }
            return product;
        });
        setItem("products", updatedProducts);
    };

    const processShoppingCart = () => {

        items.shoppingCart.forEach((item) => {

            const updatedStock = item.stock - item.amount;

            updateProductStock(item.id, updatedStock);

            item.stock = updatedStock >= 0 ? updatedStock : 0;
        });

        updateShoppingCart([]);
    };

    const cancelShoppingCart = () => {
        updateShoppingCart([]);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                shoppingCart: items.shoppingCart,
                getProductCart,
                addProductCart,
                removeProduct,
                removeProductFromCart,
                processShoppingCart,
                cancelShoppingCart,
            }}
        >
            {children}
        </ShoppingCartContext.Provider>
    );
};

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ShoppingCartContext, ShoppingCartProvider };