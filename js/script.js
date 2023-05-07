// creamos un array de objetos que contiene la informacion de los productos
let productos = [ 
  {
    id: '1',
    nombre: 'Play Station 4 500gb',
    precio: 112500,
    stock: 8,
    imagen: 'ps4 slim 500gb.jpg',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: true,
    cuotasSinInteres: false
  },

  {
    id: '2',
    nombre: 'Play Station 4 1tb',
    precio: 135000,
    stock: 5,
    imagen: 'ps4 slim 1tb.jpg',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: true
  },

  {
    id: '3',
    nombre: 'Dualshock 4',
    precio: 27000,
    stock: 4,
    imagen: 'dualshock4.jpg',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: true,
    cuotasSinInteres: false
  },

  {
    id: '4',
    nombre: 'Crash Bandicoot N. Sane Trilogy',
    precio: 11250,
    stock: 3,
    imagen: 'crash3.png',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: false
  },

  {
    id: '5',
    nombre: 'Crash Bandicoot 4',
    precio: 18000,
    stock: 2,
    imagen: 'crash4.png',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: false
  },

  {
    id: '6',
    nombre: 'Mafia Trilogy',
    precio: 10350,
    stock: 3,
    imagen: 'mafia.png',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: true
  },

  {
    id: '7',
    nombre: 'Mortal Kombat 11',
    precio: 9000,
    stock: 2,
    imagen: 'MK11.png',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: false
  },

  {
    id: '8',
    nombre: 'Doom Eternal',
    precio: 9000,
    stock: 3,
    imagen: 'doom.png',
    tipo: 'ps4',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: true
  },

  {
    id: '9',
    nombre: 'Play Station 5',
    precio: 315000,
    stock: 5,
    imagen: 'ps5 normal.jpg',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: false
  },

  {
    id: '10',
    nombre: 'Play Station 5 Digital',
    precio: 270000,
    stock: 3,
    imagen: 'ps5 digital.jpg',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: true
  },

  {
    id: '11',
    nombre: 'Dualsense',
    precio: 25000,
    stock: 6,
    imagen: 'dualsense ps5.jpg',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: true,
    cuotasSinInteres: false
  },

  {
    id: '12',
    nombre: 'Play Station VR2',
    precio: 250000,
    stock: 2,
    imagen: 'vr ps5.png',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: true,
    cuotasSinInteres: false
  },

  {
    id: '13',
    nombre: 'Grand Theft Auto V',
    precio: 9000,
    stock: 4,
    imagen: 'gta ps5.png',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: true,
    cuotasSinInteres: false
  },

  {
    id: '14',
    nombre: 'Sonic Frontiers',
    precio: 18000,
    stock: 7,
    imagen: 'sonic ps5.png',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: false
  },

  {
    id: '15',
    nombre: 'Final Fantasy VII',
    precio: 18000,
    stock: 3,
    imagen: 'final fantasy ps5.png',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: false
  },

  {
    id: '16',
    nombre: 'Gran Turismo 7',
    precio: 31500,
    stock: 5,
    imagen: 'gran turismo 7.png',
    tipo: 'ps5',
    cantidad: 0,
    esOferta: false,
    cuotasSinInteres: true
  },
];

function generarProductos(tipo, ordenar)
{
      let productosFiltrados = [];
      if(ordenar == 'asc') {
        productosFiltrados = productos.sort((a,b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0));
      }
      else if(ordenar == 'desc'){
        productosFiltrados = productos.sort((a,b) => (a.precio < b.precio) ? 1 : ((b.precio < a.precio) ? -1 : 0));
      }

      //contenedor donde se van a agregar las cards de los productos
      const contenedorProductos = document.querySelector('.container-productos .row');

      //limpiar div por si hay algun elemento html adentro
      contenedorProductos.innerHTML = '';

      //filtrar producto por tipo de play
      productosFiltrados = productos.filter(producto => producto.tipo === tipo);

      // generar el HTML para cada producto y agregarlo al contenedor
      productosFiltrados.forEach(producto => {
      // generar el HTML para la card del producto
      const cardProducto = `
          <div class="card producto">
          <img src="../img/${producto.imagen}" class="card-img-top producto-zoom" alt="${producto.nombre}">
          <div class="card-body">
              <p class="card-text">${producto.nombre}</p>
              <div class="precios">$ ${producto.precio.toLocaleString()} <br> 12 x $ ${(producto.precio / 12).toLocaleString()}</div>
              ${producto.cuotasSinInteres ? '<div class="cuotas">CUOTAS SIN INTERÉS</div>' : ''}
              <a class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</a>
          </div>
          </div>
      `;
  
      // Agregar el HTML generado al contenedor
      contenedorProductos.innerHTML += cardProducto;
      });
}

function generarProductosOferta()
{
      //contenedor donde se van a agregar las cards de los productos
      const contenedorProductos = document.querySelector('.container.ofertas .row');

      //filtrar producto por tipo de play
      const productosFiltrados = productos.filter(producto => producto.esOferta === true);

      // generar el HTML para cada producto y agregarlo al contenedor
      productosFiltrados.forEach(producto => {
      // generar el HTML para la card del producto
      const figuraOferta = `
      <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
        <figure class="figure">
          <img src="../img/${producto.imagen}" class="w-100 shadow-1-strong figure-img img-fluid rounded mb-4 oferta-zoom" alt="${producto.nombre}">
        </figure>
      </div>
      `;
      // Agregar el HTML generado al contenedor
      contenedorProductos.innerHTML += figuraOferta;
      });
}

function generarCarrito() {
  let carrito = obtenerCarrito();
  // Obtenemos el elemento del DOM donde queremos agregar la tabla
  const contenedorTabla = document.querySelector('.container-carrito .row');

  // Creamos la tabla y le agregamos los estilos de Bootstrap
  let tabla = '<table class="table table-centered">';

  // Creamos el encabezado de la tabla con los títulos de las columnas
  tabla += '<thead><tr>';
  tabla += '<th>Nombre</th>';
  tabla += '<th>Imagen</th>';
  tabla += '<th>Precio</th>';
  tabla += '<th>Cantidad</th>';
  tabla += '<th>Subtotal</th>';
  tabla += '<th></th>';
  tabla += '</tr></thead>';
  // Creamos el cuerpo de la tabla con los productos agregados al carrito
  let cuerpo = '<tbody>';
  let totalCarrito = 0;
  let cantidadCarrito = 0;

  carrito.productos.forEach(producto => {
    if (producto.cantidad && producto.cantidad > 0) {
      cuerpo += '<tr>';

      cuerpo += `<td>${producto.nombre}</td>`;
      cuerpo += `<td> <img src="../img/${producto.imagen}" style="width:100px" class="card-img-top producto-zoom" alt="${producto.nombre}"></td>`;
      cuerpo += `<td>${producto.precio}</td>`;
      cuerpo += `<td>${producto.cantidad}</td>`;

      const subtotal = producto.cantidad * producto.precio;
      cuerpo += `<td>${subtotal}</td>`;

      cuerpo += '<td>';
      cuerpo += `<button class="btn btn-danger" onclick="quitarAlCarrito('${producto.id}'); generarTabla();">Quitar</button>`;
      cuerpo += '</td>';

      cuerpo += '</tr>';

      totalCarrito += subtotal;
      cantidadCarrito += producto.cantidad;
    }
  });
  cuerpo += '</tbody>';

  tabla += cuerpo;

  // Creamos el pie de página de la tabla con el total y la cantidad de productos en el carrito
  let pieDePagina = '<tfoot><tr>';
  pieDePagina += '<td colspan="2"></td>';
  pieDePagina += `<td id="cantidad">${cantidadCarrito}</td>`;
  pieDePagina += `<td id="total">${totalCarrito}</td>`;
  pieDePagina += '<td></td>';
  pieDePagina += '</tr></tfoot>';

  tabla += pieDePagina;

  tabla += '</table>';

  contenedorTabla.innerHTML = carrito.productos.length > 0 ? tabla : '<b>No se han agregado productos al carrito.</b>';
}

function agregarAlCarrito(idProducto) {
  let carrito = obtenerCarrito();
  //obtener el producto a agregar
  const producto = productos.find(item => item.id == idProducto);
  
  // Verificar si el producto ya está en el carrito
  let productoEnCarrito = carrito.productos.find(item => item.id == idProducto);
  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    productoEnCarrito.cantidad += 1;
  } 
  else {
    producto.cantidad = 1;
    // Si el producto no está en el carrito, agregarlo con la cantidad
    carrito.productos.push({
      ...producto
    });
  }

  // Actualizar el total y la cantidad del carrito
  carrito.cantidad += 1;
  carrito.total += producto.precio;

  // Guardar el carrito en el localStorage
  guardarCarrito(carrito);
  actualizarCantidadCarrito();
  mensajeAgregoAlCarrito();
}

function quitarAlCarrito(idProducto) {
  let carrito = obtenerCarrito();
  // Obtener el producto a eliminar
  const productoBorrar = carrito.productos.find(item => item.id == idProducto);

  if (productoBorrar) {
    // Si el producto está en el carrito, eliminarlo
    carrito.productos = carrito.productos.filter(item => item.id !== idProducto);

    // Actualizar el total y la cantidad del carrito
    carrito.cantidad -= productoBorrar.cantidad;
    carrito.total -= productoBorrar.precio * productoBorrar.cantidad;

    // Guardar el carrito en el localStorage
    guardarCarrito(carrito);
    location.reload();
  }
}

function actualizarCantidadCarrito() {
  const carrito = obtenerCarrito();
  let cantidadCarrito = 0;
  
  carrito.productos.forEach(producto => {
      cantidadCarrito += producto.cantidad;
  });
  
  document.getElementById('cantidad-en-carrito').textContent = cantidadCarrito;
}

function vaciarCarrito() {
  localStorage.removeItem('carrito');
  location.reload();
}

function obtenerCarrito(){
  let carritoGuardado = localStorage.getItem('carrito');
  if(carritoGuardado){
    return JSON.parse(localStorage.getItem('carrito'));
  }
  else{
    return {
      total: 0,
      cantidad: 0,
      productos: []
    };
  }
}

function guardarCarrito(carrito){
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


function mensajeAgregoAlCarrito()
{
  Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se agrego correctamente el producto al carrito.',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      timer: 4000,
      confirmButtonText:
      '<a href="../html/carrito.html" style="text-decoration:none;color:white;">Ir al Carrito</a>',
    confirmButtonAriaLabel: 'Ir al Carrito',
    cancelButtonText:
      'Seguir Comprando',
    cancelButtonAriaLabel: 'Seguir Comprando'
    })
}