import { Box } from "@mui/material";
import "./about.scss";

const About = () => {
    return (
        <Box className="about">
            <Box
                component="section"
                className="about__section">
                <img
                    src="/images/about/capm&v.jpg"
                    alt="Fotrografía misión-visión"/>
                <h3>Misión</h3>
                <p className="about__paragraph--mision">Nuestra misión en Punto Oriente es ofrecer a nuestros
                clientes la más amplia y
                atractiva variedad de gorras,
                reflejando las últimas tendencias de la moda y la más alta calidad. Nos esforzamos por ser el destino
                preferido de
                aquellos que buscan expresar su estilo único a través de accesorios de moda, centrándonos en la
                innovación, la
                satisfacción del cliente y la integridad en cada paso de nuestro proceso.
                En Punto Oriente, estamos comprometidos con:
                </p>
                <ol>
                    <li>Variedad Excepcional: proporcionar una selección única de gorras que abarque desde estilos clásicos
                    hasta las últimas
                    tendencias de diseño, para satisfacer los gustos diversos de nuestros clientes.
                    </li>
                    <li>Calidad Inigualable: garantizar que cada gorra que vendemos cumple con los más altos estándares de
                    calidad, utilizando
                    materiales duraderos y técnicas de fabricación avanzadas.</li>
                    <li>Experiencia del Cliente: ofrecer un servicio al cliente excepcional, desde el momento de la
                    selección hasta la entrega,
                    asegurándonos de que cada cliente se sienta valorado y satisfecho con su compra.</li>
                    <li>Responsabilidad Social y Ambiental: contribuir positivamente a la comunidad y al medio ambiente,
                    tomando medidas éticas
                    en la producción y participando en iniciativas sociales que promuevan el bienestar general.</li>
                </ol>
            </Box>

            <Box
                component="section"
                className="about__section about__section--vision">
                <h3>Visión</h3>
                <p className="about__paragraph--vision">En Punto Oriente, aspiramos a ser reconocidos como
                el referente líder en la
                industria de la venta de gorras,
                destacando por la innovación, la calidad incomparable y la conexión auténtica con nuestros clientes.
                Visualizamos un
                futuro donde:
                </p>

                <ol>
                    <li>Tendencias Definidas: somos pioneros en la creación de tendencias de gorras, anticipando y
                    liderando la evolución de la
                    moda.</li>
                    <li>Cliente en el Centro: nos destacamos por la lealtad y la satisfacción del cliente, siendo
                    reconocidos como el destino de
                    confianza para la expresión de estilo personal.</li>
                    <li>Responsabilidad Sostenible: demostramos un compromiso continuo con prácticas comerciales
                    sostenibles y responsables,
                    inspirando a otros a seguir nuestro ejemplo.</li>
                    <li>Alcance Global: expandimos nuestra presencia a nivel mundial, llevando la moda en gorras de alta
                    calidad a clientes en
                    todos los rincones del mundo.</li>
                </ol>

            </Box>
            <p>En Punto Oriente, cada gorra cuenta una historia, y nuestra visión es ser
                parte de la narrativa única
                de cada
                cliente, proporcionando productos que no solo complementan su estilo, sino que también reflejan sus
                valores y
                aspiraciones.</p>
        </Box>
    );
};

export default About;