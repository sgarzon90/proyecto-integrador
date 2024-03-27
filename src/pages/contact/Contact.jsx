import { useState } from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./contact.scss";

import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";

import InputField from "../../components/form/inputField/InputField.jsx";
import Button from "../../components/button/Button";
import Alert from "../../components/alert/Alert";
import axios from "axios";

const Contact = () => {
    const MESSAGE_REQUIRED = "Este dato es obligatorio";
    const REGEX_TELEPHONE = /^[0-9()+-]*$/;
    const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validationSchema = yup.object({
        fullname: yup
            .string("Ingresa tu nombre y apellido")
            .min(4, "Ingresa un nombre y apellido que tenga más de 4 caracteres(Ejm: Luis)")
            .required(MESSAGE_REQUIRED),
        telephone: yup
            .string("Ingresa tu teléfono")
            .min(6, "Ingresa un teléfono que tenga entre 6 y 13 caracteres (Ejm:5613084)")
            .max(13, "Ingresa un teléfono que tenga entre 6 y 13 caracteres (Ejm:3106994458)")
            .matches(REGEX_TELEPHONE, "Ingresa un teléfono válido")
            .required(MESSAGE_REQUIRED),
        email: yup
            .string("Ingresa tu email")
            .matches(REGEX_EMAIL, "Ingresa un email válido (Ejm:Prueba@gmail.com)")
            .required(MESSAGE_REQUIRED),
        consult: yup
            .string("Ingresa tu consulta")
            .min(15, "Ingresa una consulta que tenga entre 15 y 150 caracteres")
            .max(150, "Ingresa una consulta que tenga entre 15 y 150 caracteres")
            .required(MESSAGE_REQUIRED),
    });

    const [ openAlert, setOpenAlert ] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullname: "",
            telephone: "",
            email: "",
            consult: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                await axios.post("https://puntooriente.onrender.com/api/contact", values); // Envia la consulta al backend
                setOpenAlert(true);
                resetForm();
            } catch (error) {
                console.error("Error al enviar la consulta:", error);
            }
        },

    });

    return (
        <Box className="contact">
            <Box
                component="section"
                className="contact__section">
                <h3>Escribe tu consulta</h3>

                <Box
                    component="form"
                    className="contact__section__form"
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}>
                    <InputField
                        label="Nombre y apellido"
                        name="fullname"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        errorMessage={formik.touched.fullname && formik.errors.fullname}
                        inputProps={{ maxLength: 25 }}>
                    </InputField>

                    <InputField
                        label="Teléfono"
                        name="telephone"
                        value={formik.values.telephone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.telephone && Boolean(formik.errors.telephone)}
                        errorMessage={formik.touched.telephone && formik.errors.telephone}
                        inputProps={{ maxLength: 15 }}>
                    </InputField>

                    <InputField
                        label="E-mail"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        errorMessage={formik.touched.email && formik.errors.email}
                        inputProps={{ maxLength: 50 }}>
                    </InputField>

                    <InputField
                        label="Consulta"
                        name="consult"
                        multiline
                        rows={5}
                        value={formik.values.consult}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.consult && Boolean(formik.errors.consult)}
                        errorMessage={formik.touched.consult && formik.errors.consult}
                        inputProps={{ maxLength: 150 }}>
                    </InputField>

                    <Button type="button">Envíar consulta</Button>
                </Box>

            </Box>

            <Box
                component="section"
                className="contact__section">
                <h3>Datos de contacto</h3>
                <Box className="contact__section__data">
                    <Box>
                        <PlaceIcon/>
                        <span>Plaza Botero,
                        Medellín</span>
                    </Box>
                    <Box>
                        <PhoneIcon/>
                        <span>+57
                        123456789</span>
                    </Box>
                    <Box>
                        <MailIcon/>
                        <span>PuntoOriente@empresa.com</span>
                    </Box>
                </Box>
                <Box className="contact__section__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0856704545045!2d-75.56864147956966!3d6.252442375082657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428fecb4dff77%3A0x2e5a7e51ab929892!2sPlaza%20Botero%20-%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1sen!2sco!4v1699822543322!5m2!1sen!2sco"
                        loading="lazy"
                        title="Ubicación de la Plaza Botero en Medellín, Antioquia">
                    </iframe>
                </Box>
            </Box>
            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                message="Tu consulta se ha enviado correctamente"
            />
        </Box>
    );
};

export default Contact;