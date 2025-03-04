document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('http://localhost:3000/api/registros'); // Ruta en backend
        const data = await response.json();
        mostrarRegistros(data);
    } catch (error) {
        console.error("Error al obtener los registros:", error);
    }
});

/* function mostrarRegistros(registros) {
    const tablaCiudadanosInstituciones = document.getElementById('tablaCiudadanosInstituciones');
    const tablaRestaurantesLocales = document.getElementById('tablaRestaurantesLocales');

    tablaCiudadanosInstituciones.innerHTML = '';
    tablaRestaurantesLocales.innerHTML = '';

    registros.forEach(registro => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${registro.tipo}</td>
            <td>${registro.nombre}</td>
            <td>${registro.correo}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarRegistro(${registro.id}, '${registro.tipo}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${registro.id}, '${registro.tipo}')">Eliminar</button>
            </td>
        `;

        if (registro.tipo === "ciudadano" || registro.tipo === "institucion") {
            tablaCiudadanosInstituciones.appendChild(fila);
        } else {
            tablaRestaurantesLocales.appendChild(fila);
        }
    });
} */

async function eliminarRegistro(id, tipo) {
    if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
        try {
            const response = await fetch(`http://localhost:3000/api/${tipo}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Registro eliminado con éxito.");
                location.reload();
            } else {
                alert("Error al eliminar el registro.");
            }
        } catch (error) {
            console.error("Error al eliminar el registro:", error);
        }
    }
}

async function editarRegistro(id, tipo) {
    try {
        const response = await fetch(`http://localhost:3000/api/registros`);
        const registros = await response.json();
        const registro = registros.find(r => r.id == id && r.tipo == tipo);

        console.log("Datos obtenidos:", registro); // Para depuración

        if (!registro) {
            alert("Registro no encontrado.");
            return;
        }

        // Rellenar el formulario con los datos actuales
        document.getElementById('editNombre').value = registro.nombre || "";
        document.getElementById('editCorreo').value = registro.correo || "";
        document.getElementById('editCalle').value = registro.calle || "";
        document.getElementById('editColonia').value = registro.colonia || "";
        document.getElementById('editAlcaldia').value = registro.alcaldia || "";

        // Guardar el ID y tipo en el formulario
        document.getElementById('formEdicion').dataset.id = id;
        document.getElementById('formEdicion').dataset.tipo = tipo;

        // Mostrar el modal
        var modal = new bootstrap.Modal(document.getElementById('modalEdicion'));
        modal.show();
    } catch (error) {
        console.error("Error al obtener el registro:", error);
    }
}

function mostrarRegistros(registros) {
    const tablaCiudadanosInstituciones = document.getElementById('tablaCiudadanosInstituciones');
    const tablaRestaurantesLocales = document.getElementById('tablaRestaurantesLocales');

    // Limpiar tablas antes de insertar datos nuevos
    tablaCiudadanosInstituciones.innerHTML = '';
    tablaRestaurantesLocales.innerHTML = '';

    registros.forEach(registro => {
        console.log("Registro recibido:", registro); // Debug para verificar tipos

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${registro.tipo}</td>
            <td>${registro.nombre}</td>
            <td>${registro.correo || 'N/A'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarRegistro(${registro.id}, '${registro.tipo}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${registro.id}, '${registro.tipo}')">Eliminar</button>
            </td>
        `;

        // Verificar si el tipo es correcto
        if (registro.tipo === "ciudadano" || registro.tipo === "institucion") {
            tablaCiudadanosInstituciones.appendChild(fila);
        } else if (registro.tipo === "restaurante" || registro.tipo === "local") { // 🔹 Asegurar que los tipos coincidan
            tablaRestaurantesLocales.appendChild(fila);
        } else {
            console.warn("Tipo desconocido:", registro.tipo); // Debug en caso de error
        }
    });
}
