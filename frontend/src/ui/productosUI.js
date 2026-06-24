// src/ui/productosUI.js
import { obtenerRepuestos, crearRepuesto, actualizarRepuesto, eliminarRepuesto } from '../api/productosApi.js';
import { validarFormulario } from '../utils/validaciones.js';

let rolActual = 'USER';

export function setProductPermissions(rol) {
  rolActual = rol;

  const card = document.getElementById('form-card');
  const puedeEditar = rol === 'ADMIN' || rol === 'SUPERADMIN';

  // Oculta el form completo si es USER
  card.style.display = puedeEditar ? 'block' : 'none';
}

export function initProductosUI() {
  const form = document.getElementById('repuesto-form');
  const tbody = document.querySelector('#tabla-repuestos tbody');
  const btnCancel = document.getElementById('btn-cancel');
  const formTitle = document.getElementById('form-title');
  const theadAcciones = document.getElementById('th-acciones');

  async function cargarRepuestos() {
    try {
      const repuestos = await obtenerRepuestos();
      const puedeEditar = rolActual === 'ADMIN' || rolActual === 'SUPERADMIN';

      // Oculta la columna "Acciones" si es USER
      if (theadAcciones) theadAcciones.style.display = puedeEditar ? '' : 'none';

      tbody.innerHTML = '';

      repuestos.forEach(rep => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${rep.id}</td>
          <td>${rep.nombre}</td>
          <td>${rep.marca}</td>
          <td>$${rep.precio}</td>
          <td>${rep.stock}</td>
          <td style="${puedeEditar ? '' : 'display:none'}">
            ${puedeEditar ? `
              <button class="btn-edit" data-id="${rep.id}" data-nombre="${rep.nombre}" data-marca="${rep.marca}" data-precio="${rep.precio}" data-stock="${rep.stock}">Editar</button>
              <button class="btn-danger" data-id="${rep.id}">Borrar</button>
            ` : ''}
          </td>
        `;
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error('Error al cargar repuestos:', error);
    }
  }

  function limpiarFormulario() {
    form.reset();
    document.getElementById('repuesto-id').value = '';
    formTitle.textContent = 'Agregar Repuesto';
    btnCancel.style.display = 'none';
  }

  // Delegación de eventos para editar/borrar (los botones se generan dinámicamente)
  tbody.addEventListener('click', async (e) => {
    const id = e.target.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('btn-edit')) {
      document.getElementById('repuesto-id').value = id;
      document.getElementById('nombre').value = e.target.dataset.nombre;
      document.getElementById('marca').value = e.target.dataset.marca;
      document.getElementById('precio').value = e.target.dataset.precio;
      document.getElementById('stock').value = e.target.dataset.stock;
      formTitle.textContent = 'Editar Repuesto';
      btnCancel.style.display = 'inline-block';
    }

    if (e.target.classList.contains('btn-danger')) {
      if (confirm('¿Estás seguro de que deseas eliminar este repuesto?')) {
        try {
          await eliminarRepuesto(id);
          cargarRepuestos();
        } catch (error) {
          alert(error.message);
        }
      }
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('repuesto-id').value;
    const repuesto = {
      nombre: document.getElementById('nombre').value,
      marca: document.getElementById('marca').value,
      precio: parseFloat(document.getElementById('precio').value),
      stock: parseInt(document.getElementById('stock').value)
    };

    const errores = validarFormulario(repuesto);
    if (errores.length > 0) {
      alert(errores.join(' '));
      return;
    }

    try {
      if (id) {
        await actualizarRepuesto(id, repuesto);
      } else {
        await crearRepuesto(repuesto);
      }
      limpiarFormulario();
      cargarRepuestos();
    } catch (error) {
      alert(error.message);
    }
  });

  btnCancel.addEventListener('click', limpiarFormulario);

  cargarRepuestos();
}