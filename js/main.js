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
        document.getElementById('contactForm').reset();
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';

    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}