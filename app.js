var carrito = obtenerCarrito();

function obtenerCarrito() {
  var carritoJSON = localStorage.getItem('carrito');
  if (carritoJSON) {
    return JSON.parse(carritoJSON);
  } else {
    return [];
  }
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

/*funcion para agregar elemento al carrito */
function agregarAlCarrito(nombre, precio, imagen) {


  var productoExistente = carrito.find(function(producto) {
    return producto.nombre === nombre;
  });



  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    var producto = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      cantidad: 1
    };

    carrito.push(producto);
  }

  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function cambiarCantidad(index, incremento) {
  if (carrito[index].cantidad + incremento >= 0) {
    carrito[index].cantidad += incremento;
    guardarCarrito();
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  var cartItems = document.getElementById('cart-items');
  var cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  var total = 0;

  carrito.forEach(function(producto, index) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = 'Imagen de ' + producto.nombre;
    li.appendChild(img);
    li.appendChild(document.createTextNode(producto.precio));

    var quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-container');

    var quantityLabel = document.createElement('span');
    quantityLabel.textContent = 'Cantidad: ';

    var quantity = document.createElement('span');
    quantity.textContent = producto.cantidad;

    var incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.addEventListener('click', function() {
      cambiarCantidad(index, 1);
    });

    var decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.addEventListener('click', function() {
    cambiarCantidad(index, -1);
    });

    quantityContainer.appendChild(quantityLabel);
    quantityContainer.appendChild(decrementButton);
    quantityContainer.appendChild(quantity);
    quantityContainer.appendChild(incrementButton);

    li.appendChild(quantityContainer);

    cartItems.appendChild(li);
    total += producto.precio * producto.cantidad;

    });

      cartTotal.innerHTML = 'Total: $' + total.toFixed();
      }

    actualizarCarrito();

function enviarMensajeWhatsApp() {
  // Obtener los detalles del producto del carrito
  const carrito = obtenerCarrito(); // Supongamos que tienes una función obtenerCarrito() que devuelve el contenido del carrito
  if (carrito.length === 0) {
    // Si el carrito está vacío, no se puede finalizar la compra
    return;
  }

  // Obtener el nombre del primer producto en el carrito (puedes ajustar esto según la estructura de tus datos del carrito)
  const nombreProducto = carrito[0].nombre;
  const precioProducto = carrito[0].precio;

  // Generar el mensaje de WhatsApp
  const mensaje = `¡Hola! Quiero finalizar la compra del producto ${nombreProducto}, quisiera saber cuales son los metodos de pagos que tienen disponibles.`;

  // URL de WhatsApp con el mensaje como parámetro
  const url = `https://wa.me/573245621294?text=${encodeURIComponent(mensaje)}`;

  // Abrir la URL en una nueva pestaña o ventana
  window.open(url, '_blank');
}

// Obtener el modal del chat
var modal = document.getElementById("chatModal");

// Obtener el botón para abrir el modal
var chatIcon = document.getElementById("chatIcon");

// Obtener el botón para cerrar el modal
var closeBtn = document.getElementsByClassName("close")[0];

// Agregar evento de clic al botón del icono del chat para abrir el modal
chatIcon.addEventListener("click", function() {
  modal.style.display = "block";
});

// Agregar evento de clic al botón de cerrar para cerrar el modal
closeBtn.addEventListener("click", function() {
  modal.style.display = "none";
});

// Agregar evento de clic fuera del modal para cerrarlo
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Función para mostrar la respuesta en el chat
function mostrarRespuesta(respuesta) {
  var chatMessages = document.getElementById("chatMessages");
  var message = document.createElement("div");
  message.classList.add("faq-answer");
  message.textContent = respuesta;
  chatMessages.appendChild(message);
}
