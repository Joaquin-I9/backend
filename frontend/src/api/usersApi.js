// src/api/usersApi.js
import { parseResponse } from '../utils/http.js';
import { getAuthHeaders } from '../utils/authGuard.js';

const API_URL = 'http://localhost:3000/usuarios';

export async function obtenerUsuarios() {
  const respuesta = await fetch(API_URL, { headers: getAuthHeaders() });
  return await parseResponse(respuesta);
}

export async function obtenerUsuario(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, { headers: getAuthHeaders() });
  return await parseResponse(respuesta);
}

export async function crearUsuario(usuario) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(usuario)
  });
  return await parseResponse(respuesta);
}

export async function actualizarUsuario(id, usuario) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(usuario)
  });
  return await parseResponse(respuesta);
}

export async function eliminarUsuario(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await parseResponse(respuesta);
}