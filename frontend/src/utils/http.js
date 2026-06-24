// src/utils/http.js
export async function parseResponse(respuesta) {
  let data = null;
  try {
    data = await respuesta.json();
  } catch {
    data = null;
  }

  if (!respuesta.ok) {
    const mensaje = data?.error || 'Ocurrió un error inesperado.';
    throw new Error(mensaje);
  }

  return data;
}