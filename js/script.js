// Creamos un array de objetos que contiene la información de los productos
const productos = [
  {
    id: '1',
    nombre: 'Play Station 4',
    precio: 135000,
    stock: 1,
  },
  {
    id: '2',
    nombre: 'Play Station 5',
    precio: 315000,
    stock: 5,
  },
];

// Inicializamos las variables para el total y la cantidad de productos que se compran
let total = 0;
let cantidad = 0;

// Iniciamos un ciclo while que se ejecutará hasta que se ingrese 0
while (true) {
  // Pedimos al usuario que seleccione un producto y mostramos los detalles de los productos disponibles
  const seleccion = prompt(
    `Selecciona los productos:\n${productos.map(
      (p) => `\n${p.id}. ${p.nombre} $ ${p.precio}`
    )}\n0. Salir`
  );

  // Validamos si se ingresó un número válido
  const seleccionIndex = parseInt(seleccion);
  if (
    isNaN(seleccionIndex) ||
    seleccionIndex < 0 ||
    seleccionIndex > productos.length
  ) {
    alert('Selección inválida');
    continue;
  }

  // Si se ingresó 0, salimos del ciclo
  if (seleccionIndex === 0) break;

  // Obtenemos el producto seleccionado por el usuario
  const productoSeleccionado = productos[seleccionIndex - 1];

  // Añadimos el producto seleccionado al carrito y mostramos un mensaje de confirmación
  alert(`Se agregó al carrito ${productoSeleccionado.nombre}`);

  // Inicializamos la variable cantidadQueLleva y validamos si se ingresó una cantidad válida
  let cantidadQueLleva = 0;
  while (true) {
    const cantidadIngresada = prompt(
      `Cuantos ${productoSeleccionado.nombre} queres llevar?`
    );
    cantidadQueLleva = parseInt(cantidadIngresada);

    if (isNaN(cantidadQueLleva) || cantidadQueLleva < 1) {
      alert('Cantidad inválida');
      continue;
    }

    // Validamos si la cantidad ingresada supera el stock del producto
    if (cantidadQueLleva > productoSeleccionado.stock) {
      alert(
        `La cantidad de ${cantidadQueLleva} supera el stock de ${productoSeleccionado.stock}`
      );
      continue;
    }

    // Si la cantidad es válida, salimos del ciclo
    break;
  }

  // Añadimos el costo del producto y la cantidad comprada al total
  total += productoSeleccionado.precio * cantidadQueLleva;
  cantidad += cantidadQueLleva;

  // Actualizamos el stock del producto seleccionado
  productoSeleccionado.stock -= cantidadQueLleva;

  // Mostramos el stock restante del producto seleccionado
  alert(`El stock restante es de ${productoSeleccionado.stock}`);
}

// Mostramos la cantidad de productos comprados y el total a pagar
alert(`La cantidad es de ${cantidad} y el total es de $ ${total}`);
