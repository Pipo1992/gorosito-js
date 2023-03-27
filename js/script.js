// creamos un array de objetos que contiene la informacion de los productos
const productos = [ 
  {
    id: '1',
    nombre: 'Play Station 4 500gb',
    precio: 112500,
    stock: 8,
    imagen: 'ps4 slim 500gb.jpg'
  },

  {
    id: '2',
    nombre: 'Play Station 4 1tb',
    precio: 13500,
    stock: 5,
    imagen: 'ps4 slim 1tb.jpg'
  },

  {
    id: '3',
    nombre: 'Dualshock 4',
    precio: 27000,
    stock: 4,
    imagen: 'dualshock4.jpg'
  },

  {
    id: '4',
    nombre: 'Crash Bandicoot N. Sane Trilogy',
    precio: 11250,
    stock: 3,
    imagen: 'crash3.png'
  },

  {
    id: '5',
    nombre: 'Crash Bandicoot 4',
    precio: 18000,
    stock: 2,
    imagen: 'crash4.png'
  },

  {
    id: '6',
    nombre: 'Mafia Trilogy',
    precio: 10350,
    stock: 3,
    imagen: 'mafia.png'
  },

  {
    id: '7',
    nombre: 'Mortal Kombat 11',
    precio: 9000,
    stock: 2,
    imagen: 'MK11.png'
  },

  {
    id: '8',
    nombre: 'Doom Eternal',
    precio: 9000,
    stock: 3,
    imagen: 'doom.png'
  },

  {
    id: '9',
    nombre: 'Play Station 5',
    precio: 315000,
    stock: 5,
    imagen: 'ps5 normal.jpg'
  },

  {
    id: '10',
    nombre: 'Play Station 5 Digital',
    precio: 270000,
    stock: 3,
    imagen: 'ps5 digital'
  },

  {
    id: '11',
    nombre: 'Dualsense',
    precio: 25000,
    stock: 6,
    imagen: 'dualsense ps5.jpg'
  },

  {
    id: '12',
    nombre: 'Play Station VR2',
    precio: 250000,
    stock: 2,
    imagen: 'vr ps5.png'
  },

  {
    id: '13',
    nombre: 'Grand Theft Auto V',
    precio: 9000,
    stock: 4,
    imagen: 'gta ps5.png'
  },

  {
    id: '14',
    nombre: 'Sonic Frontiers',
    precio: 18000,
    stock: 7,
    imagen: 'sonic ps5.png'
  },

  {
    id: '15',
    nombre: 'Final Fantasy VII',
    precio: 18000,
    stock: 3,
    imagen: 'final fantasy ps5.png'
  },

  {
    id: '16',
    nombre: 'Gran Turismo 7',
    precio: 31500,
    stock: 5,
    imagen: 'gran turismo 7.png'
  },
];

// inicializamos las variables para el total y la cantidad de productos que se compran
const carrito = {
  total: 0,
  cantidad: 0,
};

// mostrar los productos disponibles y obtener la selección del usuario
function obtenerSeleccion(productos) {
  return prompt(`Selecciona los productos:\n${productos.map(
    ({ id, nombre, precio }) => `\n${id}. ${nombre} $ ${precio}`
  )}\n0. Salir`);
}

// validar la seleccion del usuario
function validarSeleccion(seleccion, productos) {
  const seleccionIndex = parseInt(seleccion);
  if (
    isNaN(seleccionIndex) ||
    seleccionIndex < 0 ||
    seleccionIndex > productos.length
  ) {
    alert('Selección inválida');
    return false;
  }
  return true;
}

// obtener la cantidad de productos que el usuario quiere comprar
function obtenerCantidad(producto) {
  let cantidadQueLleva = 0;
  while (true) {
    const cantidadIngresada = prompt(
      `Cuantos ${producto.nombre} queres llevar?`
    );
    cantidadQueLleva = parseInt(cantidadIngresada);

    if (isNaN(cantidadQueLleva) || cantidadQueLleva < 1) {
      alert('Cantidad inválida');
      continue;
    }

    // validamos si la cantidad ingresada supera el stock del producto
    if (cantidadQueLleva > producto.stock) {
      alert(
        `La cantidad de ${cantidadQueLleva} supera el stock de ${producto.stock}`
      );
      continue;
    }

    // si la cantidad es valida, salimos del ciclo
    break;
  }
  return cantidadQueLleva;
}

// agregar un producto al carrito
function agregarAlCarrito(producto, cantidadQueLleva) {
  alert(`Se agregó al carrito ${producto.nombre}`);
  carrito.total += producto.precio * cantidadQueLleva;
  carrito.cantidad += cantidadQueLleva;
  producto.stock -= cantidadQueLleva;
}

// mostrar el stock restante del producto
function mostrarStockRestante(producto) {
  alert(`El stock restante es de ${producto.stock}`);
}

function comprar() {
  while (true) {
    // mostramos los productos disponibles y obtenemos la seleccion del usuario
    const seleccion = obtenerSeleccion(productos);

    // validamos la seleccion del usuario
    if (!validarSeleccion(seleccion, productos)) {
      continue;
    }

    // salimos del ciclo si el usuario selecciono salir
    const seleccionIndex = parseInt(seleccion);
    if (seleccionIndex === 0) {
      break;
    }

    // obtenemos el producto seleccionado por el usuario
    const productoSeleccionado = productos[seleccionIndex - 1];

    // obtenemos la cantidad que el usuario quiere comprar
    const cantidadQueLleva = obtenerCantidad(productoSeleccionado);

    // agregamos el producto al carrito
    agregarAlCarrito(productoSeleccionado, cantidadQueLleva);

    // mostramos el stock restante del producto
    mostrarStockRestante(productoSeleccionado);
  }

  // mostramos la cantidad y el total de la compra
  alert(`La cantidad es de ${carrito.cantidad} y el total es de $ ${carrito.total}`);
}

comprar();