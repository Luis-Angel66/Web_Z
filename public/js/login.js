document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
      e.preventDefault();
      const correo = document.getElementById("correo").value.trim();
      const contrasena = document.getElementById("contrasena").value.trim();
      const rol = document.getElementById("rol").value;

      if (!correo || !contrasena || !rol) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      alert(`Simulación de login como ${rol}`);
      // Simulación de redirección según rol
      if (rol === "beneficiario") {
        window.location.href = "../pages/productos.html";
      } else if (rol === "donante") {
        window.location.href = "../pages/registro-alimentos.html";
      } else if (rol === "admin") {
        window.location.href = "../pages/gestion.html";
      }
    });
  }
});
