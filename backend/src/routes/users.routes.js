import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';

const router = Router();
const prisma = new PrismaClient();

// Campos seguros a devolver (nunca el password)
const selectSeguro = {
  id: true,
  nombre: true,
  email: true,
  rol: true,
  createdAt: true
};

// 1. LEER TODOS: GET /usuarios (solo SUPERADMIN)
router.get('/usuarios', verificarToken, verificarRol('SUPERADMIN'), async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({ select: selectSeguro });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
});

// 2. LEER UNO: GET /usuarios/:id (solo SUPERADMIN)
router.get('/usuarios/:id', verificarToken, verificarRol('SUPERADMIN'), async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      select: selectSeguro
    });

    if (!usuario) {
      return res.status(404).json({ error: 'No se encontró un usuario con ese ID.' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
});

// 3. CREAR: POST /usuarios (solo SUPERADMIN, puede asignar rol directamente)
router.post('/usuarios', verificarToken, verificarRol('SUPERADMIN'), async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || nombre.trim() === '' || !email || email.trim() === '' || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios.' });
  }

  const rolesValidos = ['USER', 'ADMIN', 'SUPERADMIN'];
  if (rol && !rolesValidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido.' });
  }

  try {
    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: 'Ese email ya está registrado.' });
    }

    const passwordHasheado = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        password: passwordHasheado,
        rol: rol || 'USER'
      },
      select: selectSeguro
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario.' });
  }
});

// 4. ACTUALIZAR: PUT /usuarios/:id (solo SUPERADMIN)
router.put('/usuarios/:id', verificarToken, verificarRol('SUPERADMIN'), async (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, rol } = req.body;

  const rolesValidos = ['USER', 'ADMIN', 'SUPERADMIN'];
  if (rol && !rolesValidos.includes(rol)) {
    return res.status(400).json({ error: 'Rol inválido.' });
  }

  try {
    const data = {
      nombre: nombre || undefined,
      email: email || undefined,
      rol: rol || undefined
    };

    // Solo si mandan password nueva, la hasheamos; si no, no la tocamos
    if (password && password.trim() !== '') {
      data.password = await bcrypt.hash(password, 10);
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data,
      select: selectSeguro
    });

    res.json(usuarioActualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'No se encontró un usuario con ese ID.' });
    }
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
});

// 5. ELIMINAR: DELETE /usuarios/:id (solo SUPERADMIN)
router.delete('/usuarios/:id', verificarToken, verificarRol('SUPERADMIN'), async (req, res) => {
  const { id } = req.params;

  // Evitar que un SUPERADMIN se borre a sí mismo y se quede sin acceso
  if (req.usuario.id === parseInt(id)) {
    return res.status(400).json({ error: 'No podés eliminar tu propio usuario.' });
  }

  try {
    await prisma.usuario.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Usuario eliminado correctamente.' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'No se encontró un usuario con ese ID.' });
    }
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
});

export default router;