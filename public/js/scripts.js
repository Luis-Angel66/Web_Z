document.addEventListener("DOMContentLoaded", function() {
    console.log("Frontend cargado correctamente.");

    /* -------------------- REGISTRO DE BENEFICIARIOS -------------------- */
    const tipoBeneficiario = document.getElementById("tipoBeneficiario");
    const formCiudadano = document.getElementById("formCiudadano");
    const formInstitucion = document.getElementById("formInstitucion");

    if (tipoBeneficiario) {
        tipoBeneficiario.addEventListener("change", function() {
            if (this.value === "ciudadano") {
                formCiudadano.classList.remove("d-none");
                formInstitucion.classList.add("d-none");
            } else if (this.value === "institucion") {
                formInstitucion.classList.remove("d-none");
                formCiudadano.classList.add("d-none");
            } else {
                formCiudadano.classList.add("d-none");
                formInstitucion.classList.add("d-none");
            }
        });
    }

    const formRegistroBeneficiario = document.getElementById("formRegistroBeneficiario");
    if (formRegistroBeneficiario) {
        formRegistroBeneficiario.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Formulario de beneficiario enviado.");
            alert("Registro de beneficiario enviado correctamente.");
        });
    }

    /* -------------------- REGISTRO DE DONANTES -------------------- */
    const tipoDonante = document.getElementById("tipoDonante");
    const formMercado = document.getElementById("formMercado");
    const formLocal = document.getElementById("formLocal");

    if (tipoDonante) {
        tipoDonante.addEventListener("change", function() {
            if (this.value === "mercado") {
                formMercado.classList.remove("d-none");
                formLocal.classList.add("d-none");
            } else if (this.value === "local") {
                formLocal.classList.remove("d-none");
                formMercado.classList.add("d-none");
            } else {
                formMercado.classList.add("d-none");
                formLocal.classList.add("d-none");
            }
        });
    }

    const formRegistroDonante = document.getElementById("formRegistroDonante");
    if (formRegistroDonante) {
        formRegistroDonante.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Formulario de donante enviado.");
            alert("Registro de donante enviado correctamente.");
        });
    }

    /* -------------------- REGISTRO DE ALIMENTOS -------------------- */
    const donacionVenta = document.getElementById("donacionVenta");
    const opcionesVenta = document.getElementById("opcionesVenta");

    if (donacionVenta) {
        donacionVenta.addEventListener("change", function() {
            if (this.value === "vendido") {
                opcionesVenta.classList.remove("d-none");
            } else {
                opcionesVenta.classList.add("d-none");
            }
        });
    }

    const formRegistroAlimentos = document.getElementById("formRegistroAlimentos");
    if (formRegistroAlimentos) {
        formRegistroAlimentos.addEventListener("submit", function(event) {
            event.preventDefault();
            console.log("Formulario de registro de alimentos enviado.");
            alert("Registro de alimento realizado correctamente.");
        });
    }

    /* -------------------- LISTADO DE PRODUCTOS -------------------- */
    const productosContainer = document.getElementById("productosContainer");
    const productosTabla = document.getElementById("productosTabla");

    if (productosContainer || productosTabla) {
        console.log("Esperando datos del backend para mostrar productos...");
    }

    /* -------------------- GESTIÓN DE REGISTROS (DATOS DESDE EL BACKEND) -------------------- */
    const tablaGestion = document.getElementById("tablaGestion");

    if (tablaGestion) {
        console.log("Esperando datos del backend para mostrar registros...");
    }

    /* -------------------- EDITAR REGISTROS -------------------- */
    const modalEdicion = new bootstrap.Modal(document.getElementById("modalEdicion"));
    let registroEditando = null;

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("btnEditar")) {
            const index = event.target.getAttribute("data-index");
            registroEditando = index;

            document.getElementById("editNombre").value = ""; // Esperando dato real
            document.getElementById("editCorreo").value = ""; // Esperando dato real

            modalEdicion.show();
        }
    });

    document.getElementById("formEdicion").addEventListener("submit", function(event) {
        event.preventDefault();
        if (registroEditando !== null) {
            alert("Registro actualizado (esperando conexión con backend).");
            location.reload();
        }
    });

    /* -------------------- ELIMINAR REGISTROS -------------------- */
    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("btnEliminar")) {
            alert("Registro eliminado (esperando conexión con backend).");
            location.reload();
        }
    });
});
