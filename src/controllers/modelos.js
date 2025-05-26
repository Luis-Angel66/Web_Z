import { Sequelize } from "sequelize";
import conn from "../config/database.js";

export const insertarUsuario = async (
  { correo, password, tipo_usuario },
  t
) => {
  const estatus = 1;
  const [resultado] = await conn.query(
    `INSERT INTO usuarios (correo, contrasena, tipo_usuario, estatus) 
     VALUES (?, ?, ?, ?)`,
    {
      replacements: [correo, password, tipo_usuario, estatus],
      type: Sequelize.QueryTypes.INSERT,
      transaction: t,
    }
  );

  return {
    id: resultado,
    correo,
    password,
    tipo_usuario,
    estatus,
  };
};

export const insertarBeneficiario = async (
  { usuario_id, tipoBeneficiario },
  t
) => {
  const [resultado] = await conn.query(
    `INSERT INTO beneficiarios (usuario_id, tipo) 
     VALUES (?, ?)`,
    {
      replacements: [usuario_id, tipoBeneficiario],
      type: Sequelize.QueryTypes.INSERT,
      transaction: t,
    }
  );

  return {
    id: resultado,
    usuario_id,
    tipoBeneficiario,
  };
};

export const insertarCiudadano = async (
  { beneficiario_id, nombre, calle, colonia, alcaldia, numINE },
  t
) => {
  const [resultado] = await conn.query(
    `INSERT INTO ciudadanos (beneficiario_id,nombre, calle, colonia, alcaldia, numero_ident) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    {
      replacements: [beneficiario_id, nombre, calle, colonia, alcaldia, numINE],
      type: Sequelize.QueryTypes.INSERT,
      transaction: t,
    }
  );

  return {
    id: resultado,
    beneficiario_id,
    nombre,
    calle,
    colonia,
    alcaldia,
    numINE,
  };
};

export const insertarInstitucion = async (
  {
    beneficiario_id,
    nombre,
    rfc,
    folio_acta,
    nombre_contacto,
    calle,
    colonia,
    alcaldia,
  },
  t
) => {
  const [resultado] = await conn.query(
    `INSERT INTO instituciones (beneficiario_id, nombre, rfc, folio_acta, calle, colonia, alcaldia, nombre_contacto) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        beneficiario_id,
        nombre,
        rfc,
        folio_acta,
        calle,
        colonia,
        alcaldia,
        nombre_contacto,
      ],
      type: Sequelize.QueryTypes.INSERT,
      transaction: t,
    }
  );

  return {
    id: resultado,
    beneficiario_id,
    nombre,
    rfc,
    folio_acta,
    nombre_contacto,

    calle,
    colonia,
    alcaldia,
  };
};

export const insertarDonante = async ({ usuario_id, tipo }, transaction) => {
  const [resultado] = await conn.query(
    `INSERT INTO donantes (usuario_id, tipo) VALUES (?, ?)`,
    {
      replacements: [usuario_id, tipo],
      type: Sequelize.QueryTypes.INSERT,
      transaction,
    }
  );
  return {
    id: resultado,
    usuario_id,
    tipo,
  };
};

// Inserta un local
export const insertarLocal = async (
  id_donantes,
  nombre_negocio,
  numero_local,
  giro,
  tipo_local,
  cedula_folio,
  id_mercado,
  rfc,
  transaction
) => {
  await conn.query(
    `INSERT INTO locales 
     (donante_id, mercado_id, numero_local, nombre_negocio, giro, tipo_local, cedula_folio,rfc) 
     VALUES (?, ?, ?, ?, ?, ?, ?,?)`,
    {
      replacements: [
        id_donantes,
        id_mercado,
        numero_local || null,
        nombre_negocio,
        giro || null,
        tipo_local || null,
        cedula_folio || null,
        rfc || null,
      ],
      type: Sequelize.QueryTypes.INSERT,
      transaction,
    }
  );
};

export const insertarMercado = async (
  {
    donante_id,
    nombre,
    calle,
    colonia,
    alcaldia,
    rfc,
    numeroLocales,
    nombre_admin,
    correo_admin,
  },
  transaction
) => {
  const [resultado] = await conn.query(
    `INSERT INTO mercados (donante_id, nombre, calle, colonia, alcaldia, rfc, numero_locales, nombre_admin, correo_admin) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      replacements: [
        donante_id,
        nombre,
        calle,
        colonia,
        alcaldia,
        rfc,
        numeroLocales,
        nombre_admin,
        correo_admin,
      ],
      type: Sequelize.QueryTypes.INSERT,
      transaction,
    }
  );

  return {
    id: resultado,
    nombre,
    calle,
    colonia,
    alcaldia,
  };
};
