// src/ui/navbar.js
import { logout } from '../api/authApi.js';

export function renderNavbar(usuario) {
  const navbarContainer = document.getElementById('navbar');
  if (!navbarContainer) return;

  navbarContainer.innerHTML = `
    <nav class="navbar">
      <span class="navbar-brand">⚙️ Motorepuestos</span>
      <div class="navbar-links">
        <a href="/src/pages/productos.html">Productos</a>
        ${usuario.rol === 'SUPERADMIN' ? '<a href="/src/pages/users.html">Usuarios</a>' : ''}
      </div>
      <div class="navbar-user">
        <span class="navbar-role">${usuario.nombre} (${usuario.rol})</span>
        <button id="btn-logout" class="btn-secondary">Cerrar sesión</button>
      </div>
    </nav>
  `;

  document.getElementById('btn-logout').addEventListener('click', logout);
}