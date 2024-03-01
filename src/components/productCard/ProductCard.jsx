import PropTypes from "prop-types";
import { useContext, useState, useEffect } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext.jsx";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton } from "@mui/material";
import { Typography } from "@mui/material";
import "./productCard.scss";

import Button from "../button/Button";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { NavLink } from "react-router-dom";

const ProductCard = ({ product, itIsOff, onCardDelete }) => {
    const { addProductCart, removeProduct, getProductCart, removeProductFromCart } = useContext(ShoppingCartContext);
    const [ quantity, setQuantity ] = useState(0);

    useEffect(() => {
        const productInCart = getProductCart(product.id);
        setQuantity(productInCart ? productInCart.amount : 0);
    }, [ getProductCart, product.id ]);

    const handleAddProduct = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
            addProductCart(product);
        } else {
            console.log("No se puede agregar más productos, stock agotado.");
        }
    };

    const handleRemoveProduct = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            removeProduct(product.id);
        }
    };

    const handleCardDelete = () => {
        onCardDelete(product.id);
        removeProductFromCart(product.id);
    };

    return (
        <Card
            key={product.id}
            className="product-card">
            <Box className="product-card__floats">
                <Box>
                    <IconButton
                        component={NavLink}
                        to={`/product/${product.id}`}
                        state={{ product }}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton onClick={handleCardDelete}><DeleteIcon/></IconButton>
                </Box>
            </Box>
            <CardMedia
                component="img"
                className="product-card__image"
                image={product.image}
                alt={`Fotografía de ${product.name}`}/>
            <CardContent className="product-card__content">
                <h4>{product.name}</h4>
                <p><span>Descripción:</span> {product.description}</p>
                {!product.isPromotion && <p><span>Precio:</span> {`${product.price}`}</p>}
                {product.isPromotion && <p className="promotion__price"><span>Precio promocional:</span> {`${product.price - (product.price / 100 * itIsOff)}`}</p>}
                <p><span>Unidades disponibles:</span> {product.stock}</p>
                {product.stock > 0 ? (
                    <CardActions className="product-card__actions">
                        <Button
                            color="danger"
                            onClick={handleRemoveProduct}><RemoveIcon/></Button>
                        <span>{quantity}</span>
                        <Button
                            onClick={handleAddProduct}
                            disabled={product.stock === 0}><AddIcon/></Button>
                    </CardActions>
                ) : (
                    <Typography
                        variant="body2"
                        color="error"
                        className="OutofStock">
                    SIN STOCK
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        isPromotion: PropTypes.bool.isRequired,
    }),
    itIsOff: PropTypes.number,
    onCardDelete: PropTypes.func.isRequired,
};

ProductCard.defaultProps = {
    itIsOff: 0.0,
};

export default ProductCard;