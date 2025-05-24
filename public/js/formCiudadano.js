const formCiudadano = document.getElementById("formCiudadano", () => {
  if (formCiudadano) {
    formCiudadano.addEventListener("submit", async function (e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const correo = document.getElementById("correo").value.trim();
      const calle = document.getElementById("calle").value.trim();
      const colonia = document.getElementById("colonia").value.trim();
      const alcaldia = document.getElementById("alcaldia").value.trim();
      const numINE = document.getElementById("ine").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();

      if (
        !nombre ||
        !correo ||
        !calle ||
        !colonia ||
        !alcaldia ||
        !numINE ||
        !contrasena
      ) {
        alert("Todos los campos son obligatorios para ciudadanos.");
        return;
      }

      const datos = {
        nombre,
        correo,
        calle,
        colonia,
        alcaldia,
        numINE,
        contrasena,
      };

      console.log("Enviando datos al servidor:", datos);

      try {
        const response = await fetch("http://localhost:3000/ciudadano", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        });

        const result = await response.json();
        console.log("Respuesta del servidor:", result);

        if (response.ok) {
          alert("Ciudadano registrado con éxito");
          window.location.href = "../index.html";
        } else {
          alert(result.message || "Error al registrar el ciudadano");
        }
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        alert("Hubo un problema al registrar el ciudadano.");
      }
    });
  }
});
