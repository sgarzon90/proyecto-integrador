import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = () => {

    const [ products, setProducts ] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://puntooriente.onrender.com/api/products/");
                setProducts(response.data.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const searchProducts = async (text) => {
        try {
            const response = await axios.get(`https://puntooriente.onrender.com/api/products?search=${text}`);
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };

    const createProduct = async (productData) => {
        try {
            const response = await axios.post("https://puntooriente.onrender.com/api/products", productData);
            setProducts([ ...products, response.data.data ]);
        } catch (error) {
            console.error("Error creating product:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);
            }
        }
    };

    const updateProduct = async (productId, productData) => {
        try {
            const response = await axios.put(`https://puntooriente.onrender.com/api/products/${productId}`, productData);
            setProducts(products.map((product) => (product.id === productId ? response.data.data : product)));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`https://puntooriente.onrender.com/api/products/${productId}`);
            setProducts(products.filter((product) => product.id !== productId));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const uploadProductImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://puntooriente.onrender.com/api/products/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error uploading product image:", error);
        }
    };

    return {
        products,
        searchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
    };
};

export default useProducts;