document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Obtener productos desde la API
    const response = await fetch("http://localhost:3000/alimentos/listar");
    const productos = await response.json();

    // Llamar a las funciones para mostrar los productos
    mostrarProductosEnCards(productos);
    mostrarProductosEnTabla(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
});

// Función para mostrar productos en tarjetas
function mostrarProductosEnCards(productos) {
  const container = document.getElementById("productosContainer");
  container.innerHTML = ""; // Limpiar contenido previo

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";

    card.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text"><strong>Tipo:</strong> ${
                      producto.tipo
                    }</p>
                    <p class="card-text"><strong>Modalidad:</strong> ${
                      producto.modalidad
                    }</p>
                    <p class="card-text"><strong>Donante:</strong> ${
                      producto.donante
                    }</p>
                    ${
                      producto.modalidad === "vendido"
                        ? `<p class="card-text"><strong>Precio:</strong> $${producto.precio}</p>`
                        : ""
                    }
                    <button class="btn btn-primary" onclick="solicitarProducto(${
                      producto.id
                    })">Solicitar</button>
                </div>
            </div>
        `;

    container.appendChild(card);
  });
}

// Función para mostrar productos en la tabla
function mostrarProductosEnTabla(productos) {
  const tabla = document.getElementById("productosTabla");
  tabla.innerHTML = ""; // Limpiar contenido previo

  productos.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.tipo}</td>
            <td>${producto.modalidad}</td>
            <td>${
              producto.modalidad === "vendido" ? `$${producto.precio}` : "N/A"
            }</td>
            <td>${producto.donante}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="solicitarProducto(${
                  producto.id
                })">Solicitar</button>
            </td>
        `;
    tabla.appendChild(fila);
  });
}

// Función de ejemplo para solicitar un producto
function solicitarProducto(id) {
  alert(`Has solicitado el producto con ID: ${id}`);
}
