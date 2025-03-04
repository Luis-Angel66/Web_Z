document.getElementById('formRegistroBeneficiario').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener tipo de beneficiario
    const tipoBeneficiario = document.getElementById('tipoBeneficiario').value;

    let datos = {};

    if (tipoBeneficiario === "ciudadano") {
        // Variables para ciudadano
        const nombre = document.getElementById('nombreCiudadano').value.trim();
        const correo = document.getElementById('correoCiudadano').value.trim();
        const calle = document.getElementById('calleCiudadano').value.trim();
        const colonia = document.getElementById('coloniaCiudadano').value.trim();
        const alcaldia = document.getElementById('alcaldiaCiudadano').value.trim();
        const numINE = document.getElementById('ineCiudadano').value.trim();
        const contrasena = document.getElementById('passwordCiudadano').value.trim();

       
        if (!nombre || !correo || !calle || !colonia || !alcaldia || !numINE || !contrasena) {
            alert("Todos los campos son obligatorios para ciudadanos.");
            return;
        }

        
        datos = { nombre, correo, calle, colonia, alcaldia, numINE, contrasena };
    } else if (tipoBeneficiario === "institucion") {
        // Variables para institución
        const nombre = document.getElementById('nombreInstitucion').value.trim();
        const correo = document.getElementById('correoInstitucion').value.trim();
        const calle = document.getElementById('calleInstitucion').value.trim();
        const colonia = document.getElementById('coloniaInstitucion').value.trim();
        const alcaldia = document.getElementById('alcaldiaInstitucion').value.trim();
        const rfc = document.getElementById('rfcInstitucion').value.trim();
        const folio_acta = document.getElementById('folioInstitucion').value.trim();
        const nombre_contacto = document.getElementById('contactoInstitucion').value.trim();
        const contrasena = document.getElementById('passwordInstitucion') ? document.getElementById('passwordInstitucion').value.trim() : "";

        // Validación
        if (!nombre || !correo || !calle || !colonia || !alcaldia || !rfc || !folio_acta || !nombre_contacto || !contrasena) {
            alert("Todos los campos son obligatorios para instituciones.");
            return;
        }

        // Crear objeto de datos para institución
        datos = { nombre, correo, calle, colonia, alcaldia, rfc, folio_acta, nombre_contacto, contrasena };
    } else {
        alert("Seleccione un tipo de beneficiario válido.");
        return;
    }

    console.log(" Enviando datos al servidor:", datos);

    try {
        const response = await fetch(`http://localhost:3000/api/${tipoBeneficiario}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();
        console.log("Respuesta del servidor:", result);

        if (response.ok) {
            alert(`${tipoBeneficiario.charAt(0).toUpperCase() + tipoBeneficiario.slice(1)} registrado con éxito`);
            window.location.href = '../index.html'; // Redirigir a la página principal
        } else {
            alert(result.message || `Error al registrar el ${tipoBeneficiario}`);
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un problema al registrar el beneficiario.");
    }
});
