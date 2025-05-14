document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        document.getElementById('confirmation-message').classList.remove('hidden');
        document.getElementById('contact-form').reset();
    } else {
        alert('Por favor, completa todos los campos.');
    }
});
