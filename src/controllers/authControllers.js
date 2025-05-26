import { Sequelize } from "sequelize";
import conn from "../config/database.js";
import bcrypt from "bcrypt";
import {
  insertarBeneficiario,
  insertarCiudadano,
  insertarUsuario,
  insertarInstitucion,
  insertarDonante,
  insertarLocal,
  insertarMercado,
} from "./modelos.js"; // Asegúrate de que la ruta sea correcta
const beneficiarioCiudadano = async (req, res) => {
  const {
    nombreCiudadano,
    passwordCiudadano,
    correoCiudadano,
    calleCiudadano,
    coloniaCiudadano,
    alcaldiaCiudadano,
    ineCiudadano,
  } = req.body;

  // Validación de los datos
  if (
    !nombreCiudadano ||
    !passwordCiudadano ||
    !correoCiudadano ||
    !calleCiudadano ||
    !coloniaCiudadano ||
    !alcaldiaCiudadano ||
    !ineCiudadano
  ) {
    return res.status(400).json({ message: "Faltan datos" });
  }
  const tipoUsuario = "beneficiario";
  const tipoBeneficiario = "ciudadano";
  const estatus = 1;
  const t = await conn.transaction();

  try {
    // Encriptar la contraseña
    const passwordEncriptada = await bcrypt.hash(passwordCiudadano, 10);
    const usuario = await insertarUsuario(
      {
        correo: correoCiudadano,
        tipo_usuario: tipoUsuario,
        password: passwordEncriptada,
      },
      t
    );
    const usuario_id = usuario.id;

    const beneficiario = await insertarBeneficiario(
      {
        usuario_id,
        tipoBeneficiario,
      },
      t
    );

    const beneficiario_id = beneficiario.id;
    await insertarCiudadano(
      {
        beneficiario_id,
        nombre: nombreCiudadano,
        calle: calleCiudadano,
        colonia: coloniaCiudadano,
        alcaldia: alcaldiaCiudadano,
        numINE: ineCiudadano,
      },
      t
    );

    await t.commit();

    res.status(201).json({ message: "Ciudadano registrado exitosamente" });
  } catch (error) {
    await t.rollback();
    console.error("Error al registrar el ciudadano:", error);
    res.status(500).json({ message: "Error al registrar al ciudadano" });
  }
};
export const beneficiarioInstitucion = async (req, res) => {
  const {
    nombre,
    contrasena,
    correo,
    calle,
    colonia,
    alcaldia,
    rfc,
    folio_acta,
    nombre_contacto,
  } = req.body;

  // Validación de campos
  if (
    !nombre ||
    !contrasena ||
    !correo ||
    !calle ||
    !colonia ||
    !alcaldia ||
    !rfc ||
    !folio_acta ||
    !nombre_contacto
  ) {
    return res
      .status(400)
      .json({ message: "Faltan datos para registrar la institución." });
  }

  const estatus = 1;
  const tipoUsuario = "beneficiario";
  const tipoBeneficiario = "institucion";

  const t = await conn.transaction();

  try {
    // Encriptar la contraseña
    const contrasenaEncriptada = await bcrypt.hash(contrasena, 10);
    const usuario = await insertarUsuario(
      {
        correo,
        tipo_usuario: tipoUsuario,
        password: contrasenaEncriptada,
      },
      t
    );
    const usuario_id = usuario.id; // Obtener el ID del usuario recién insertado
    // Insertar beneficiario
    const beneficiario = await insertarBeneficiario(
      {
        usuario_id,
        tipoBeneficiario,
      },
      t
    );

    // Insertar institución con el ID del beneficiario
    await insertarInstitucion(
      {
        beneficiario_id: beneficiario.id,
        nombre,
        rfc,
        folio_acta,
        calle,
        colonia,
        alcaldia,
        nombre_contacto,
      },
      t
    );

    await t.commit();
    res.status(201).json({ message: "Institución registrada exitosamente" });
  } catch (error) {
    await t.rollback();
    console.error("Error al registrar la institución:", error);
    res.status(500).json({ message: "Error al registrar la institución" });
  }
};

const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  // Validación de datos
  if (!correo || !contrasena) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son obligatorios" });
  }

  try {
    // Buscar el beneficiario por correo
    const [user] = await conn.query(
      `SELECT id, contrasena, id_tipo FROM beneficiarios WHERE correo = ?`,
      {
        replacements: [correo],
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Si no existe el usuario
    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    // Comparar contraseñas (sin encriptar, comparación directa)
    if (user.contrasena !== contrasena) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrectos" });
    }

    res.status(200).json({
      message: "Login exitoso",
      userId: user.id,
      userType: user.id_tipo,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtenerRegistros = async (req, res) => {
  try {
    const registros = await conn.query(
      `
      SELECT c.id, c.nombre, u.correo, c.calle, c.colonia, c.alcaldia, 'ciudadano' AS tipo
      FROM ciudadanos c
      JOIN beneficiarios b ON c.beneficiario_id = b.id
      JOIN usuarios u ON b.usuario_id = u.id
      WHERE b.tipo = 'ciudadano'

      UNION ALL

      SELECT i.id, i.nombre, u.correo, i.calle, i.colonia, i.alcaldia, 'institucion' AS tipo
      FROM instituciones i
      JOIN beneficiarios b ON i.beneficiario_id = b.id
      JOIN usuarios u ON b.usuario_id = u.id
      WHERE b.tipo = 'institucion'

      UNION ALL

      SELECT m.id, m.nombre, m.rfc AS correo, m.calle, m.colonia, m.alcaldia, 'mercado' AS tipo
      FROM mercados m
      JOIN donantes d ON m.donante_id = d.id
      WHERE d.tipo = 'mercado'

      UNION ALL

      SELECT l.id, l.nombre_negocio AS nombre, l.rfc AS correo, NULL AS calle, NULL AS colonia, NULL AS alcaldia, 'local' AS tipo
      FROM locales l
      JOIN donantes d ON l.donante_id = d.id
      WHERE d.tipo = 'local_externo'
      `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    res.json(registros);
  } catch (error) {
    console.error("Error al obtener registros:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const eliminarRegistro = async (req, res) => {
  const { tipo, id } = req.params;

  let tabla;
  let columnaId; // Columna que se usará en la condición WHERE

  switch (tipo) {
    case "ciudadano":
      tabla = "ciudadano";
      columnaId = "beneficiario_id";
      break;
    case "institucion":
      tabla = "instituciones";
      columnaId = "beneficiario_id";
      break;
    case "restaurante":
      tabla = "mercados";
      columnaId = "id_donantes";
      break;
    case "local":
      tabla = "locales";
      columnaId = "id_donantes";
      break;
    default:
      return res.status(400).json({ message: "Tipo de registro no válido" });
  }

  try {
    // Eliminar primero de la tabla específica
    await conn.query(`DELETE FROM ${tabla} WHERE ${columnaId} = ?`, {
      replacements: [id],
      type: Sequelize.QueryTypes.DELETE,
    });

    if (columnaId === "beneficiario_id") {
      await conn.query(`DELETE FROM beneficiarios WHERE id = ?`, {
        replacements: [id],
        type: Sequelize.QueryTypes.DELETE,
      });
    }

    if (columnaId === "id_donantes") {
      await conn.query(`DELETE FROM donantes WHERE id = ?`, {
        replacements: [id],
        type: Sequelize.QueryTypes.DELETE,
      });
    }

    res.status(200).json({ message: `${tipo} eliminado correctamente` });
  } catch (error) {
    console.error("Error al eliminar registro:", error);
    res.status(500).json({ message: "Error al eliminar el registro" });
  }
};

const editarRegistro = async (req, res) => {
  const { tipo, id } = req.params;
  const { nombre, correo, calle, colonia, alcaldia } = req.body;

  let tabla;
  switch (tipo) {
    case "ciudadano":
      tabla = "ciudadano";
      break;
    case "institucion":
      tabla = "instituciones";
      break;
    case "mercados":
      tabla = "mercados";
      break;
    case "local":
      tabla = "locales";
      break;
    default:
      return res.status(400).json({ message: "Tipo de registro no válido" });
  }

  try {
    await conn.query(
      `UPDATE beneficiarios SET nombre = ?, correo = ?, calle = ?, colonia = ?, alcaldia = ? WHERE id = ?`,
      {
        replacements: [nombre, correo, calle, colonia, alcaldia, id],
        type: Sequelize.QueryTypes.UPDATE,
      }
    );

    res.status(200).json({ message: `${tipo} actualizado correctamente` });
  } catch (error) {
    console.error("Error al actualizar registro:", error);
    res.status(500).json({ message: "Error al actualizar el registro" });
  }
};
const registrarLocal = async (req, res) => {
  const {
    correo,
    contrasena,
    nombre_negocio,
    numero_local,
    giro,
    tipo_local,
    cedula_folio,
    rfc,
    id_mercado,
  } = req.body;

  if (!correo || !contrasena || !nombre_negocio || !rfc || !id_mercado) {
    return res.status(400).json({ message: "Faltan datos obligatorios." });
  }
  const id_mercadoEntero = parseInt(id_mercado, 10);
  if (isNaN(id_mercadoEntero)) {
    return res.status(400).json({ message: "ID de mercado inválido." });
  }
  const localesEntero = numero_local ? parseInt(numero_local, 10) : null;

  const tipoUsuario = "donante";
  const tipoDonante = "local_externo";
  const t = await conn.transaction();

  try {
    const hash = await bcrypt.hash(contrasena, 10);

    const usuario = await insertarUsuario(
      {
        correo,
        tipo_usuario: tipoUsuario,
        password: hash,
      },
      t
    );

    const usuario_id = usuario.id;

    const donante = await insertarDonante(
      {
        usuario_id,
        tipo: tipoDonante,
      },
      t
    );

    const donante_id = donante.id;

    await insertarLocal(
      donante_id,
      nombre_negocio,
      localesEntero,
      giro || null,
      tipo_local || null,
      cedula_folio || null,
      id_mercadoEntero,
      rfc || null,
      t
    );

    await t.commit();
    res.status(201).json({ message: "Donante local registrado exitosamente" });
  } catch (error) {
    await t.rollback();
    console.error("Error al registrar el donante:", error);
    res.status(500).json({ message: "Error al registrar el donante local." });
  }
};
const registrarAlimento = async (req, res) => {
  const {
    nombre,
    tipo,
    donacionVenta,
    precio,
    cantidad,
    unidad,
    fechaCaducidad,
    idDonante,
  } = req.body;

  // Validación de datos obligatorios
  if (!nombre || !tipo || !donacionVenta || !fechaCaducidad || !idDonante) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }
  const idDonanteEntero = parseInt(idDonante, 10);
  try {
    // Verificar si el donante existe
    const [donante] = await conn.query(`SELECT id FROM donantes WHERE id = ?`, {
      replacements: [idDonante],
      type: Sequelize.QueryTypes.SELECT,
    });

    if (!donante) {
      return res
        .status(404)
        .json({ message: "El donante seleccionado no existe" });
    }

    // Iniciar transacción
    const t = await conn.transaction();

    try {
      // Insertar el alimento
      await conn.query(
        `INSERT INTO alimentos (id_donante,nombre, tipo, modalidad, precio, cantidad, unidad, fecha_caducidad) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        {
          replacements: [
            idDonanteEntero,
            nombre,
            tipo,
            donacionVenta,
            donacionVenta === "vendido" ? precio : null,
            donacionVenta === "vendido" ? cantidad : null,
            donacionVenta === "vendido" ? unidad : null,
            fechaCaducidad,
          ],
          type: Sequelize.QueryTypes.INSERT,
          transaction: t,
        }
      );

      await t.commit();
      res.status(201).json({ message: "Alimento registrado exitosamente" });
    } catch (error) {
      await t.rollback();
      console.error("Error al registrar el alimento:", error);
      res.status(500).json({ message: "Error al registrar el alimento" });
    }
  } catch (err) {
    console.error("Error en la base de datos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
const obtenerAlimentos = async (req, res) => {
  try {
    const alimentos = await conn.query(
      `
      SELECT 
        a.id, 
        a.nombre, 
        a.tipo, 
        a.modalidad, 
        a.precio, 
        a.cantidad, 
        a.unidad, 
        a.fecha_caducidad,
        COALESCE(l.nombre_negocio, m.nombre) AS donante
      FROM alimentos a
      JOIN donantes d ON a.id_donante = d.id
      LEFT JOIN locales l ON d.id = l.donante_id AND d.tipo = 'local_externo'
      LEFT JOIN mercados m ON d.id = m.donante_id AND d.tipo = 'mercado'
      `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    res.json(alimentos);
  } catch (error) {
    console.error("Error al obtener alimentos:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const obtenerDonantes = async (req, res) => {
  try {
    const donantes = await conn.query(
      `
      SELECT d.id, m.nombre
      FROM donantes d
      JOIN mercados m ON d.id = m.donante_id
      WHERE d.tipo = 'mercado'
      
      UNION ALL

      SELECT d.id, l.nombre_negocio AS nombre
      FROM donantes d
      JOIN locales l ON d.id = l.donante_id
      WHERE d.tipo = 'local_externo'
      `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    res.json(donantes);
  } catch (error) {
    console.error("Error al obtener donantes:", error);
    res.status(500).json({ message: "Error al obtener donantes" });
  }
};

const registrarMercado = async (req, res) => {
  const {
    correo,
    contrasena,
    nombre,
    calle,
    colonia,
    alcaldia,
    rfc,
    numLocales,
    nombre_administrador,
    correo_administrador,
  } = req.body;
  console.log(req.body);
  // Validación de datos obligatorios
  if (
    !correo ||
    !contrasena ||
    !nombre ||
    !calle ||
    !colonia ||
    !alcaldia ||
    !rfc ||
    numLocales === undefined ||
    !nombre_administrador ||
    !correo_administrador
  ) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const t = await conn.transaction();

  try {
    const hash = await bcrypt.hash(contrasena, 10);
    const tipoUsuario = "donante";
    const tipoDonante = "mercado";
    const usuario = await insertarUsuario(
      {
        correo,
        password: hash,
        tipo_usuario: tipoUsuario,
      },
      t
    );

    const usuario_id = usuario.id;
    const donante = await insertarDonante({ usuario_id, tipo: tipoDonante }, t);
    const donante_id = donante.id;
    await insertarMercado(
      {
        donante_id,
        nombre,
        calle,
        colonia,
        alcaldia,
        rfc,
        numeroLocales: numLocales,
        nombre_admin: nombre_administrador,
        correo_admin: correo_administrador,
      },
      t
    );
    await t.commit();
    res.status(201).json({ message: "Mercado registrado exitosamente" });
  } catch (err) {
    console.error("Error en la base de datos:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const listarMercados = async (req, res) => {
  try {
    const mercados = await conn.query(`SELECT id, nombre FROM mercados`, {
      type: Sequelize.QueryTypes.SELECT,
    });
    res.json(mercados);
  } catch (error) {
    console.error("Error al obtener mercados:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default {
  beneficiarioCiudadano,
  beneficiarioInstitucion,
  login,
  obtenerRegistros,
  eliminarRegistro,
  editarRegistro,
  registrarLocal,
  registrarAlimento,
  obtenerAlimentos,
  obtenerDonantes,
  registrarMercado,
  listarMercados,
};
