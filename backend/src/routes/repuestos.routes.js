// import {Router} from 'express';
// import {PrismaClient} from '@prisma/client';

// const router = Router();
// const prisma = new PrismaClient();

// router.get('/repuestos', async (req, res, next) => {
//   try {
//     const repuestos = await prisma.repuesto.findMany();
//     res.json(repuestos);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al obtener los repuestos' });
//   }
// });

// router.post('/repuestos', async (req, res, next) => {
//   const { nombre, marca, precio, stock } = req.body;

//   if (!nombre.trim()==="" || !marca || !marca.trim()==="" ) {
//     return res.status(400).json({ error: 'El nombre y la marca son obligatorios' });
//   }


// }


// eport default router;

import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';

const router = Router();
const prisma = new PrismaClient();

// 1. LEER: Obtener todos (GET)
router.get('/repuestos', verificarToken, async (req, res) => {
  try {
    const repuestos = await prisma.repuesto.findMany();
    res.json(repuestos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los repuestos." });
  }
});

// 2. CREAR: Alta de un repuesto (POST)
router.post('/repuestos',verificarToken,verificarRol('ADMIN', 'SUPERADMIN'),async (req, res) => {
  const { nombre, marca, precio, stock } = req.body;

  if (!nombre || nombre.trim() === "" || !marca || marca.trim() === "") {
    return res.status(400).json({ error: "El nombre y la marca son obligatorios." });
  }
  if (precio === undefined || isNaN(precio) || precio < 0) {
    return res.status(400).json({ error: "El precio debe ser un número válido mayor o igual a 0." });
  }

  try {
    const nuevoRepuesto = await prisma.repuesto.create({
      data: {
        nombre,
        marca,
        precio: parseFloat(precio),
        stock: stock ? parseInt(stock) : 0
      }
    });
    res.status(201).json(nuevoRepuesto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el repuesto." });
  }
});

// 3. ACTUALIZAR: Editar un repuesto (PUT)
router.put('/repuestos/:id',verificarToken,verificarRol('ADMIN', 'SUPERADMIN'),async (req, res) => {
  const { id } = req.params;
  const { nombre, marca, precio, stock } = req.body;

  try {
    const repuestoActualizado = await prisma.repuesto.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        marca,
        precio: precio ? parseFloat(precio) : undefined,
        stock: stock !== undefined ? parseInt(stock) : undefined
      }
    });
    res.json(repuestoActualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "No se encontró un repuesto con ese ID." });
    }
    res.status(500).json({ error: "Error al actualizar el repuesto." });
  }
});

// 4. ELIMINAR: Borrar un repuesto (DELETE)
router.delete('/repuestos/:id',verificarToken,verificarRol('ADMIN', 'SUPERADMIN'),async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.repuesto.delete({
      where: { id: parseInt(id) }
    });
    res.json({ mensaje: "Repuesto eliminado correctamente." });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "No se encontró un repuesto con ese ID." });
    }
    res.status(500).json({ error: "Error al eliminar el repuesto." });
  }
});

export default router;
