const API_URL = 'http://localhost:3000/repuestos';

const form = document.getElementById('repuesto-form');
const tbody = document.querySelector('#tabla-repuestos tbody');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');

// 1. OBTENER Y MOSTRAR DATOS (GET)
async function cargarRepuestos() {
    try {
        const respuesta = await fetch(API_URL);
        const repuestos = await respuesta.json();
        
        tbody.innerHTML = ''; // Limpiamos la tabla
        
        repuestos.forEach(rep => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${rep.id}</td>
                <td>${rep.nombre}</td>
                <td>${rep.marca}</td>
                <td>$${rep.precio}</td>
                <td>${rep.stock}</td>
                <td>
                    <button class="btn-edit" onclick="prepararEdicion(${rep.id}, '${rep.nombre}', '${rep.marca}', ${rep.precio}, ${rep.stock})">Editar</button>
                    <button class="btn-danger" onclick="eliminarRepuesto(${rep.id})">Borrar</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar repuestos:', error);
    }
}

// 2. CREAR O ACTUALIZAR (POST / PUT)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    const id = document.getElementById('repuesto-id').value;
    const repuesto = {
        nombre: document.getElementById('nombre').value,
        marca: document.getElementById('marca').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value)
    };

    try {
        if (id) {
            // Si hay un ID, estamos EDITANDO (PUT)
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(repuesto)
            });
        } else {
            // Si no hay ID, estamos CREANDO (POST)
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(repuesto)
            });
        }

        limpiarFormulario();
        cargarRepuestos(); // Recargamos la tabla
    } catch (error) {
        console.error('Error al guardar repuesto:', error);
    }
});

// 3. ELIMINAR (DELETE)
async function eliminarRepuesto(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este repuesto?')) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            cargarRepuestos(); // Recargamos la tabla
        } catch (error) {
            console.error('Error al eliminar repuesto:', error);
        }
    }
}

// 4. PREPARAR EDICIÓN (Cargar datos al formulario)
function prepararEdicion(id, nombre, marca, precio, stock) {
    document.getElementById('repuesto-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('marca').value = marca;
    document.getElementById('precio').value = precio;
    document.getElementById('stock').value = stock;

    formTitle.textContent = 'Editar Repuesto';
    btnCancel.style.display = 'inline-block';
}

// Funciones de utilidad
function limpiarFormulario() {
    form.reset();
    document.getElementById('repuesto-id').value = '';
    formTitle.textContent = 'Agregar Repuesto';
    btnCancel.style.display = 'none';
}

btnCancel.addEventListener('click', limpiarFormulario);

// Cargar la tabla apenas abre la página
cargarRepuestos();