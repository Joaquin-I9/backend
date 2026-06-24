// src/api/authApi.js
import { parseResponse } from '../utils/http.js';
import { guardarToken, borrarToken } from '../utils/authGuard.js';

const API_URL = 'http://localhost:3000';

export async function login({ email, password }) {
  const respuesta = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await parseResponse(respuesta);
  guardarToken(data.token);
  window.location.href = '/src/pages/productos.html';
}

export async function register({ nombre, email, password }) {
  const respuesta = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password })
  });

  return await parseResponse(respuesta);
}

export function logout() {
  borrarToken();
  window.location.href = '/index.html';
}