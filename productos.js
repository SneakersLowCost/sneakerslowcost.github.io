document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.getElementById('cart-icon');
  const cart = document.getElementById('cart');
  const clearCartBtn = document.getElementById('clear-cart');

  cartIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    cart.classList.toggle('abierto');
  });

  document.addEventListener('click', (e) => {
    if (!cart.contains(e.target) && !cartIcon.contains(e.target)) {
      cart.classList.remove('abierto');
    }
  });

  clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('carrito');
    actualizarContador();
    mostrarCarrito();
  });

  const categoriaBtns = document.querySelectorAll('.categoria-btn');
  const generoBtns = document.querySelectorAll('.genero-btn');
  const productos = document.querySelectorAll('.producto-card');

  let categoriaActual = 'todos';
  let generoActual = 'todos';

  categoriaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoriaActual = btn.dataset.categoria;
      categoriaBtns.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      filtrar();
    });
  });

  generoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      generoActual = btn.dataset.genero;
      generoBtns.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      filtrar();
    });
  });

  function filtrar() {
    productos.forEach(producto => {
      const cat = producto.dataset.categoria;
      const gen = producto.dataset.genero;
      const mostrar =
        (categoriaActual === 'todos' || cat === categoriaActual) &&
        (generoActual === 'todos' || gen === generoActual);
      producto.style.display = mostrar ? 'block' : 'none';
    });
  }

  actualizarContador();
  mostrarCarrito();
});

function agregarAlCarrito(nombre, precio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existe = carrito.find(p => p.nombre === nombre);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
  mostrarCarrito();
}

function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const cantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('cart-count').textContent = cantidad;
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contenedor = document.getElementById('cart-items');
  const total = document.getElementById('cart-total');
  contenedor.innerHTML = '';
  let totalPrecio = 0;

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item-carrito');
    div.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}`;
    contenedor.appendChild(div);
    totalPrecio += item.precio * item.cantidad;
  });

  total.textContent = totalPrecio.toFixed(2);
}
