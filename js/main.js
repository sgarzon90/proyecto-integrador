
// Función para sumar al contador de una tarjeta específica
function sumar(cardId) {
    var counterElement = document.getElementById('counter-' + cardId);
    var removeButton = document.querySelector('#product' + cardId + ' .button--remove');

    var counterValue = parseInt(counterElement.textContent);
    counterValue += 1;
    counterElement.textContent = counterValue;

    // Habilitar el botón de quitar
    removeButton.disabled = false;
}


function restar(cardId) {
    var counterElement = document.getElementById('counter-' + cardId);
    var removeButton = document.querySelector('#product' + cardId + ' .button--remove');

    var counterValue = parseInt(counterElement.textContent);
    if (counterValue > 0) {
        counterValue -= 1;
        counterElement.textContent = counterValue;
    }

    // Deshabilitar el botón de quitar si el contador llega a cero
    if (counterValue === 0) {
        removeButton.disabled = true;
    }
}

function submitForm() {
    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const query = document.getElementById('query').value;

    // Expresión regular para validar el correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validar campos y mostrar mensajes de error si es necesario
    if (!name || !email || !query) {
        showToast('Por favor, completa todos los campos.');
    } else if (!emailRegex.test(email)) {
        showToast('Por favor, ingresa un correo electrónico válido.');
    } else {
        // Aquí puedes enviar el formulario a tu servidor o realizar otras acciones
        showToast('Consulta enviada con éxito!');
        // Puedes reiniciar el formulario aquí si es necesario
        document.getElementById('contactForm').reset();
    }
}

function showToast(message) {
    // Mostrar mensaje de toast
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}