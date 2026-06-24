// src/ui/loginUI.js
import { login } from '../api/authApi.js';
import { validarLogin } from '../utils/validaciones.js';

export function initLoginUI() {
  const form = document.getElementById('login-form');
  const errorMsg = document.getElementById('login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';

    const datos = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    const errores = validarLogin(datos);
    if (errores.length > 0) {
      errorMsg.textContent = errores.join(' ');
      return;
    }

    try {
      await login(datos); // ya redirige a /productos adentro de authApi
    } catch (error) {
      errorMsg.textContent = error.message;
    }
  });
}