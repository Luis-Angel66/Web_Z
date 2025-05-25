
  document.getElementById('formInstitucion').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const rfc = document.getElementById('rfc').value.trim();
    const folio_acta = document.getElementById('folio_acta').value.trim();
    const nombre_contacto = document.getElementById('nombre_contacto').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const calle = document.getElementById('calle').value.trim();
    const colonia = document.getElementById('colonia').value.trim();
    const alcaldia = document.getElementById('alcaldia').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    // Validación simple (opcional si ya usas `required`)
    if (!nombre || !rfc || !folio_acta || !nombre_contacto || !correo || !calle || !colonia || !alcaldia || !contrasena) {
      alert('Por favor, llena todos los campos.');
      return;
    }

    const datos = {
      nombre: nombre,
      rfc: rfc,
      folio_acta: folio_acta,
      nombre_contacto: nombre_contacto,
      correo: correo,
      calle: calle,
      colonia: colonia,
      alcaldia: alcaldia,
      contrasena: contrasena
    };

    try {
      const respuesta = await fetch('http://localhost:3000/institucion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        alert('Institución registrada exitosamente');
        // Redireccionar o limpiar formulario
        window.location.href = '../index.html';
      } else {
        alert('Error: ' + (resultado.message || 'No se pudo registrar'));
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error en la conexión con el servidor.');
    }
  });
