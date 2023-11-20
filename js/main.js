const toast = document.getElementById('toast');

function sumar(cardId) {
    let counterElement = document.getElementById('counter-' + cardId);
    let removeButton = document.querySelector('#product' + cardId + ' .button--remove');

    let counterValue = parseInt(counterElement.textContent);
    counterValue += 1;
    counterElement.textContent = counterValue;

    removeButton.disabled = false;
}


function restar(cardId) {
    let counterElement = document.getElementById('counter-' + cardId);
    let removeButton = document.querySelector('#product' + cardId + ' .button--remove');

    let counterValue = parseInt(counterElement.textContent);
    if (counterValue > 0) {
        counterValue -= 1;
        counterElement.textContent = counterValue;
    }

    if (counterValue === 0) {
        removeButton.disabled = true;
    }
}

function submitForm() {

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const query = document.getElementById('query').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !query) {
        showToast('Por favor, completa todos los campos.');
    } else if (!emailRegex.test(email)) {
        showToast('Por favor, ingresa un correo electrónico válido.');
    } else {
        showToast('Consulta enviada con éxito!');
        toast.classList.add('toast-success');
        document.getElementById('contactForm').reset();
    }

}
 

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('productForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const success = Math.random() < 0.5;

        if (success) {
            showToast('¡Producto guardado con éxito!');
            document.getElementById('productForm').reset();
        } else {
            showToast('Error al guardar el producto');
        }
    });

});

function showToast(message) {

    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
        toast.classList.remove('toast-success');
    }, 3000);
}
