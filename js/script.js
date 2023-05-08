let productos;

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

async function cargarProductosJson(){
    const response = await fetch('./../data/productos.json');
    const data = await response.json();
    productos = data;
}