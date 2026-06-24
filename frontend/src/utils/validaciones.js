// src/utils/validaciones.js
export function validarFormulario({ nombre, marca, precio, stock }) {
  const errores = [];

  if (!nombre || nombre.trim() === '') errores.push('El nombre es obligatorio.');
  if (!marca || marca.trim() === '') errores.push('La marca es obligatoria.');
  if (precio === '' || isNaN(precio) || precio < 0) errores.push('El precio debe ser un número válido mayor o igual a 0.');
  if (stock === '' || isNaN(stock) || stock < 0) errores.push('El stock debe ser un número válido mayor o igual a 0.');

  return errores;
}

export function validarLogin({ email, password }) {
  const errores = [];
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !regexEmail.test(email)) errores.push('Ingresá un email válido.');
  if (!password || password.trim() === '') errores.push('La contraseña no puede estar vacía.');

  return errores;
}

export function validarRegistro({ nombre, email, password }) {
  const errores = [];
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || nombre.trim() === '') errores.push('El nombre es obligatorio.');
  if (!email || !regexEmail.test(email)) errores.push('Ingresá un email válido.');
  if (!password || password.length < 6) errores.push('La contraseña debe tener al menos 6 caracteres.');

  return errores;
}