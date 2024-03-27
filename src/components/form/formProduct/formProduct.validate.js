import * as yup from "yup";

import {
    MESSAGE_REQUIRED,
    MESSAGE_PRICE_INVALID,
    MESSAGE_STOCK_INVALID,
    REGEX_PRICE,
    REGEX_STOCK,
} from "../../../constanst/regexPattern.js";

const validationSchema = yup.object({
    name: yup
        .string("Ingresa el nombre")
        .min(3, "Ingresa un nombre que tenga mas de 3 carateres")
        .required(MESSAGE_REQUIRED),
    price: yup
        .string("Ingresa el precio")
        .matches(REGEX_PRICE, MESSAGE_PRICE_INVALID)
        .required(MESSAGE_REQUIRED),
    stock: yup
        .string("Ingresa el stock")
        .matches(REGEX_STOCK, MESSAGE_STOCK_INVALID)
        .required(MESSAGE_REQUIRED),
    description: yup
        .string("Ingresa la descripción")
        .min(10, "Ingresa una descripción que tenga entre 10 y 300 caracteres")
        .max(300, "Ingresa una descripción que tenga entre 10 y 300 caracteres")
        .required(MESSAGE_REQUIRED),
    files: yup
        .array()
        .min(1, "Debe seleccionar una imagen")
        .required(MESSAGE_REQUIRED),
});

export default validationSchema;