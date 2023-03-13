const producto1 = {
    id: '1',
    nombre: 'Play Station 4',
    precio: 135000,
    stock: 1
}

const producto2 = {
    id: '2',
    nombre: 'Play Station 5',
    precio: 315000,
    stock: 5
}

let seguir = true;
let total = 0;
let cantidad = 0;

while (seguir !== false) {
    const productos = prompt(`Selecciona los productos 
        1.${producto1.nombre} $ ${producto1.precio}
        2.${producto2.nombre} $ ${producto2.precio}`);

    let productoSeleccionado;

    switch (productos) {
        case '1':
            alert(`Se agrego al carrito ${producto1.nombre}`);
            productoSeleccionado = producto1;
            break;
        case '2':
            alert(`Se agrego al carrito ${producto2.nombre}`);
            productoSeleccionado = producto2;
            break;
        default:
            alert('No existe el producto.')
            break;
    }

    if (productoSeleccionado !== undefined) {
        let cantidadQueLleva = parseInt(prompt(`Cuantos ${productoSeleccionado.nombre} queres llevar?`));
        if (puedeComprar(productoSeleccionado, cantidadQueLleva)) {
            total += productoSeleccionado.precio * cantidadQueLleva;
            cantidad += cantidadQueLleva;
            stockRestante(productoSeleccionado, cantidadQueLleva);
        }
        else {
            alert(`La cantidad de ${cantidadQueLleva} supera el stock de ${productoSeleccionado.stock}`);
        }
    }

    if(prompt('Queres dejar de comprar? Presiona la tecla "N"') == 'N')
        seguir = false;
}

alert(`La cantidad es de ${cantidad} y el total es de $ ${total}`)

function stockRestante(producto, cantidad) {
    let stockRestante = producto.stock - cantidad;
    alert(`El stock restante es de ${stockRestante}`);
}

function puedeComprar(producto, cantidadQueLleva) {
    if (cantidadQueLleva < 1) {
        return false;
    }
    else if (cantidadQueLleva > producto.stock) {
        return false;
    }
    else {
        return true;
    }
}