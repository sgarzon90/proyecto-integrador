import useLocalStorage from "./useLocalStorage.js";
import { gallery } from "../data/data.js";

const useProducts = () => {
    const { items, setItem } = useLocalStorage({ products: gallery });

    const normalizeValue = (value = "") => {
        return value.toLowerCase().trim().replace(/[áéíóú]/g, (match) => {
            return {
                "á": "a",
                "é": "e",
                "í": "i",
                "ó": "o",
                "ú": "u",
            }[match];
        });
    };

    const searchProducts = (text) => {
        const preparedText = normalizeValue(text);

        return items.products.filter((product) => {
            const preparedName = normalizeValue(product.name);
            return preparedText.length === 0 || preparedName.includes(preparedText);
        });
    };

    const generateId = () => {
        return items.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    };

    const createSchema = (values) => {
        return {
            id: values.id ?? generateId(),
            name: values.name ?? "",
            description: values.description ?? "",
            image: values.image ?? "/images/home/products/img0001.jpg",
            stock: Number(values.stock) ?? 0,
            price: Number(values.price) ?? 0,
            isPromotion: values.isPromotion ?? false,
        };
    };

    const createProduct = (values) => {
        const newProduct = createSchema(values);
        const newProducts = [ ...items.products, newProduct ];
        setItem("products", newProducts);
    };

    const updateProduct = (values) => {
        const updatedProducts = items.products.map((product) =>
            product.id === values.id ? createSchema(values) : product,
        );
        setItem("products", updatedProducts);
    };

    const removeProduct = (id) => {
        const productsWithoutThisProduct = items.products.filter((product) => product.id !== id);
        setItem("products", productsWithoutThisProduct);
    };

    const getProductById = (id) => {
        return items.products.find((product) => product.id === id);
    };

    return {
        products: items.products,
        searchProducts,
        createProduct,
        updateProduct,
        removeProduct,
        getProductById,

    };
};

export default useProducts;