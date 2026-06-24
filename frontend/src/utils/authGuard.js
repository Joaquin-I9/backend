// src/utils/authGuard.js
const TOKEN_KEY = 'token';

export function guardarToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function obtenerToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function borrarToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getAuthHeaders() {
  const token = obtenerToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// Llama a /auth/me para validar que el token siga siendo válido en el servidor.
// Si falla, borra el token y redirige a 401. Devuelve el usuario si es válido.
export async function ensureAuthenticated() {
  const token = obtenerToken();

  if (!token) {
    window.location.href = '/401.html';
    return null;
  }

  try {
    const respuesta = await fetch('http://localhost:3000/auth/me', {
      headers: getAuthHeaders()
    });

    if (!respuesta.ok) {
      borrarToken();
      window.location.href = '/401.html';
      return null;
    }

    return await respuesta.json(); // { id, nombre, email, rol }
  } catch (error) {
    borrarToken();
    window.location.href = '/401.html';
    return null;
  }
}