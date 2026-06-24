// src/ui/registerUI.js
import { register } from '../api/authApi.js';
import { validarRegistro } from '../utils/validaciones.js';

export function initRegisterUI() {
  const form = document.getElementById('register-form');
  const errorMsg = document.getElementById('register-error');
  const successMsg = document.getElementById('register-success');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    successMsg.textContent = '';

    const datos = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    const errores = validarRegistro(datos);
    if (errores.length > 0) {
      errorMsg.textContent = errores.join(' ');
      return;
    }

    try {
      await register(datos);
      successMsg.textContent = 'Cuenta creada con éxito. Redirigiendo al login...';
      setTimeout(() => {
        window.location.href = '/index.html';
      }, 1500);
    } catch (error) {
      errorMsg.textContent = error.message;
    }
  });
}