// src/ui/usersUI.js
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../api/usersApi.js';

export function initUsersUI() {
  const form = document.getElementById('usuario-form');
  const tbody = document.querySelector('#tabla-usuarios tbody');
  const btnCancel = document.getElementById('btn-cancel-user');
  const formTitle = document.getElementById('user-form-title');

  async function cargarUsuarios() {
    try {
      const usuarios = await obtenerUsuarios();
      tbody.innerHTML = '';

      usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${u.id}</td>
          <td>${u.nombre}</td>
          <td>${u.email}</td>
          <td>${u.rol}</td>
          <td>
            <button class="btn-edit" data-id="${u.id}" data-nombre="${u.nombre}" data-email="${u.email}" data-rol="${u.rol}">Editar</button>
            <button class="btn-danger" data-id="${u.id}">Borrar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }

  function limpiarFormulario() {
    form.reset();
    document.getElementById('usuario-id').value = '';
    formTitle.textContent = 'Agregar Usuario';
    btnCancel.style.display = 'none';
  }

  tbody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btn-edit')) {
      document.getElementById('usuario-id').value = id;
      document.getElementById('u-nombre').value = e.target.dataset.nombre;
      document.getElementById('u-email').value = e.target.dataset.email;
      document.getElementById('u-password').value = '';
      document.getElementById('u-rol').value = e.target.dataset.rol;
      formTitle.textContent = 'Editar Usuario';
      btnCancel.style.display = 'inline-block';
    }

    if (e.target.classList.contains('btn-danger')) {
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        try {
          await eliminarUsuario(id);
          cargarUsuarios();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('usuario-id').value;
    const usuario = {
      nombre: document.getElementById('u-nombre').value,
      email: document.getElementById('u-email').value,
      password: document.getElementById('u-password').value,
      rol: document.getElementById('u-rol').value
    };

    try {
      if (id) {
        // Si no escribió password nueva, no la mandamos para no pisarla
        if (!usuario.password) delete usuario.password;
        await actualizarUsuario(id, usuario);
      } else {
        await crearUsuario(usuario);
      }
      limpiarFormulario();
      cargarUsuarios();
    } catch (error) {
      alert(error.message);
    }
  });

  btnCancel.addEventListener('click', limpiarFormulario);

  cargarUsuarios();
}