// src/productos.js
import { ensureAuthenticated } from './utils/authGuard.js';
import { renderNavbar } from './ui/navbar.js';
import { initProductosUI, setProductPermissions } from './ui/productosUI.js';

async function init() {
  const usuario = await ensureAuthenticated();
  if (!usuario) return; // ensureAuthenticated ya redirigió a 401

  renderNavbar(usuario);
  setProductPermissions(usuario.rol);
  initProductosUI();

  document.body.classList.remove('auth-checking');
}

init();