// src/users.js
import { ensureAuthenticated } from './utils/authGuard.js';
import { renderNavbar } from './ui/navbar.js';
import { initUsersUI } from './ui/usersUI.js';

async function init() {
  const usuario = await ensureAuthenticated();
  if (!usuario) return;

  if (usuario.rol !== 'SUPERADMIN') {
    window.location.href = '/401.html';
    return;
  }

  renderNavbar(usuario);
  initUsersUI();

  document.body.classList.remove('auth-checking');
}

init();