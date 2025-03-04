document.getElementById('formLogin').addEventListener('submit', async function (e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const mensajeError = document.getElementById('mensajeError');

    // Validación
    if (!correo || !contrasena) {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contrasena })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userType', result.userType);
            window.location.href = 'productos.html'; // Redirigir a otra página
        } else {
            mensajeError.textContent = result.message || 'Error al iniciar sesión';
        }
    } catch (error) {
        console.error("Error en el login:", error);
        mensajeError.textContent = "Hubo un problema en el servidor.";
    }
});
