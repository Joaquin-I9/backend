// src/api/productosApi.js
import { parseResponse } from '../utils/http.js';
import { getAuthHeaders } from '../utils/authGuard.js';

const API_URL = 'http://localhost:3000/repuestos';

export async function obtenerRepuestos() {
  const respuesta = await fetch(API_URL, { headers: getAuthHeaders() });
  return await parseResponse(respuesta);
}

export async function crearRepuesto(repuesto) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(repuesto)
  });
  return await parseResponse(respuesta);
}

export async function actualizarRepuesto(id, repuesto) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(repuesto)
  });
  return await parseResponse(respuesta);
}

export async function eliminarRepuesto(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return await parseResponse(respuesta);
}