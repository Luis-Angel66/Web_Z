document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("formRegistroAlimentos");
  const donacionVenta = document.getElementById("donacionVenta");
  const opcionesVenta = document.getElementById("opcionesVenta");
  const selectDonante = document.getElementById("nombreDonante");

  // Función para cargar los donantes en el selector
  async function cargarDonantes() {
    try {
      const response = await fetch("http://localhost:3000/listar");
      const donantes = await response.json();

      selectDonante.innerHTML =
        '<option value="" selected disabled>Seleccione un donante</option>';

      donantes.forEach((donante) => {
        const option = document.createElement("option");
        option.value = donante.id;
        option.textContent = `${donante.nombre}`;
        selectDonante.appendChild(option);
      });
    } catch (error) {
      console.error("Error al obtener donantes:", error);
    }
  }

  // Mostrar u ocultar los campos de venta
  donacionVenta.addEventListener("change", function () {
    if (donacionVenta.value === "vendido") {
      opcionesVenta.classList.remove("d-none");
    } else {
      opcionesVenta.classList.add("d-none");
    }
  });

  // Enviar formulario
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreAlimento").value.trim();
    const tipo = document.getElementById("tipoAlimento").value;
    const donacionVentaValue = document.getElementById("donacionVenta").value;
    const precio =
      donacionVentaValue === "vendido"
        ? parseFloat(document.getElementById("precioAlimento").value)
        : null;
    const cantidad =
      donacionVentaValue === "vendido"
        ? parseInt(document.getElementById("cantidadAlimento").value)
        : null;
    const unidad =
      donacionVentaValue === "vendido"
        ? document.getElementById("unidadAlimento").value
        : null;
    const fechaCaducidad = document.getElementById("fechaCaducidad").value;
    const idDonante = document.getElementById("nombreDonante").value;

    if (
      !nombre ||
      !tipo ||
      !donacionVentaValue ||
      !fechaCaducidad ||
      !idDonante
    ) {
      alert("Todos los campos obligatorios deben estar llenos.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/alimentos/registrar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            tipo,
            donacionVenta: donacionVentaValue,
            precio,
            cantidad,
            unidad,
            fechaCaducidad,
            idDonante,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Alimento registrado exitosamente");
        form.reset();
        opcionesVenta.classList.add("d-none"); // Ocultar campos si estaban visibles
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error al registrar alimento:", error);
      alert("Error en el servidor.");
    }
  });

  // Cargar donantes al cargar la página
  cargarDonantes();
});
