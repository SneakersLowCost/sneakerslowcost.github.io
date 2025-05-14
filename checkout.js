document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-compra');
  formulario.addEventListener('submit', e => {
    e.preventDefault();

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosComprados = carrito.map(p => `${p.nombre} x${p.cantidad}`).join(', ');

    localStorage.removeItem('carrito');

    alert(`¡Gracias por tu compra!\nHas adquirido: ${productosComprados}\nTe hemos redirigido a la página principal.`);

    window.location.href = 'index.html';
  });
});
