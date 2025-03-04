document.getElementById('formRegistroDonante').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Obtener tipo de donante
    const tipoDonante = document.getElementById('tipoDonante').value;

    let datos = {};

    if (tipoDonante === "mercado") {
        // Capturar datos del mercado
        const nombre = document.getElementById('nombreMercado').value.trim();
        const rfc = document.getElementById('rfcMercado').value.trim();
        const numLocales = document.getElementById('numLocales').value.trim();
        const administrador = document.getElementById('adminMercado').value.trim();
        const correoAdmin = document.getElementById('correoAdmin').value.trim();

        // Validación
        if (!nombre || !rfc || !numLocales || !administrador || !correoAdmin) {
            alert("Todos los campos son obligatorios para mercados.");
            return;
        }

        datos = { tipo: "mercado", nombre, rfc, numLocales, administrador, correoAdmin };
    } else if (tipoDonante === "local") {
        // Capturar datos del local de comida
        const nombre = document.getElementById('nombreLocal').value.trim();
        const rfc = document.getElementById('rfcLocal').value.trim();
        const folioActa = document.getElementById('folioActa').value.trim();

        // Validación
        if (!nombre || !rfc || !folioActa) {
            alert("Todos los campos son obligatorios para locales.");
            return;
        }

        datos = { tipo: "local", nombre, rfc, folioActa };
    } else {
        alert("Seleccione un tipo de donante válido.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/donantes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Donante registrado con éxito.");
            window.location.href = '../index.html';
        } else {
            alert(result.message || "Error al registrar el donante.");
        }
    } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un problema al registrar el donante.");
    }
});
