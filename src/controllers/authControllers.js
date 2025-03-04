import { Sequelize } from 'sequelize';
import conn from '../config/database.js'; 

const beneficiarioCiudadano = async (req, res) => {
    const { nombre, contrasena, correo, calle, colonia, alcaldia, numINE } = req.body;
   
    // Validación de los datos
    if (!nombre || !contrasena || !correo || !calle || !colonia || !alcaldia || !numINE) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    try {
        
        const idTipo = 1; // Tipo de beneficiario (1 = Ciudadano)
        const estatus = 1; 

        // Iniciar la transacción
        const t = await conn.transaction();

        try {
           
            const [beneficiario] = await conn.query(
                `INSERT INTO beneficiarios (id_tipo, nombre, contrasena, correo, calle, colonia, alcaldia, estatus) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                {
                    replacements: [idTipo, nombre, contrasena, correo, calle, colonia, alcaldia, estatus],
                    type: Sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

           
            const beneficiario_id = beneficiario; 

         
            await conn.query(
                `INSERT INTO ciudadano (beneficiario_id, numero_identificacion) 
                 VALUES (?, ?)`,
                {
                    replacements: [beneficiario_id, numINE],
                    type: Sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

           
            await t.commit();

            res.status(201).json({ message: 'Ciudadano registrado exitosamente' });
        } catch (error) {
            
            await t.rollback();
            console.error('Error al registrar el ciudadano:', error);
            res.status(500).json({ message: 'Error al registrar al ciudadano' });
        }
    } catch (err) {
        console.error('Error al encriptar la contraseña:', err);
        res.status(500).json({ message: 'Error al registrar al ciudadano' });
    }
};

const beneficiarioInstitucion = async (req, res) => {
    const { nombre, contrasena, correo, calle, colonia, alcaldia, rfc, folio_acta, nombre_contacto } = req.body;

    // Validación de datos
    if (!nombre || !contrasena || !correo || !calle || !colonia || !alcaldia || !rfc || !folio_acta || !nombre_contacto) {
        return res.status(400).json({ message: 'Faltan datos para registrar la institución.' });
    }

    try {
        const idTipo = 2; // Tipo de beneficiario (2 = Institución)
        const estatus = 1; // 1 = Activo

        // Iniciar transacción
        const t = await conn.transaction();

        try {
            
            await conn.query(
                `INSERT INTO beneficiarios (id_tipo, nombre, contrasena, correo, calle, colonia, alcaldia, estatus) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                {
                    replacements: [idTipo, nombre, contrasena, correo, calle, colonia, alcaldia, estatus],
                    type: Sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

            // Obtener el ID recién insertado
            const [beneficiarioId] = await conn.query(`SELECT LAST_INSERT_ID() AS id`, {
                type: Sequelize.QueryTypes.SELECT,
                transaction: t
            });

            const beneficiario_id = beneficiarioId.id;

            // Insertar la institución con el beneficiario_id obtenido
            await conn.query(
                `INSERT INTO instituciones (beneficiario_id, rfc, folio_acta, nombre_contacto) 
                 VALUES (?, ?, ?, ?)`,
                {
                    replacements: [beneficiario_id, rfc, folio_acta, nombre_contacto],
                    type: Sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

            await t.commit();

            res.status(201).json({ message: 'Institución registrada exitosamente' });
        } catch (error) {
            // Revertir la transacción si hay error
            await t.rollback();
            console.error('Error al registrar la institución:', error);
            res.status(500).json({ message: 'Error al registrar la institución' });
        }
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        res.status(500).json({ message: 'Error al registrar la institución' });
    }
};


const login = async (req, res) => {
    const { correo, contrasena } = req.body;

    // Validación de datos
    if (!correo || !contrasena) {
        return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
    }

    try {
        // Buscar el beneficiario por correo
        const [user] = await conn.query(
            `SELECT id, contrasena, id_tipo FROM beneficiarios WHERE correo = ?`,
            {
                replacements: [correo],
                type: Sequelize.QueryTypes.SELECT
            }
        );

        // Si no existe el usuario
        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Comparar contraseñas (sin encriptar, comparación directa)
        if (user.contrasena !== contrasena) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        res.status(200).json({ message: 'Login exitoso', userId: user.id, userType: user.id_tipo });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


const obtenerRegistros = async (req, res) => {
    try {
        const registros = await conn.query(
            `SELECT id, nombre, correo, calle, colonia, alcaldia, 'ciudadano' AS tipo 
             FROM beneficiarios WHERE id_tipo = 1
            UNION ALL
            SELECT id, nombre, correo, calle, colonia, alcaldia, 'institucion' AS tipo 
             FROM beneficiarios WHERE id_tipo = 2
            UNION ALL
            SELECT id, nombre, rfc AS correo, NULL AS calle, NULL AS colonia, NULL AS alcaldia, 'restaurante' AS tipo 
             FROM donantes WHERE id_tipo = 3
            UNION ALL
            SELECT id, nombre, rfc AS correo, NULL AS calle, NULL AS colonia, NULL AS alcaldia, 'local' AS tipo 
             FROM donantes WHERE id_tipo = 4`,
            { type: Sequelize.QueryTypes.SELECT }
        );

        res.json(registros);
    } catch (error) {
        console.error('Error al obtener registros:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


const eliminarRegistro = async (req, res) => {
    const { tipo, id } = req.params;

    let tabla;
    let columnaId; // Columna que se usará en la condición WHERE

    switch (tipo) {
        case 'ciudadano':
            tabla = 'ciudadano';
            columnaId = 'beneficiario_id';
            break;
        case 'institucion':
            tabla = 'instituciones';
            columnaId = 'beneficiario_id';
            break;
        case 'restaurante':
            tabla = 'mercados';
            columnaId = 'id_donantes';
            break;
        case 'local':
            tabla = 'locales';
            columnaId = 'id_donantes';
            break;
        default:
            return res.status(400).json({ message: 'Tipo de registro no válido' });
    }

    try {
        // Eliminar primero de la tabla específica
        await conn.query(`DELETE FROM ${tabla} WHERE ${columnaId} = ?`, {
            replacements: [id],
            type: Sequelize.QueryTypes.DELETE
        });

        
        if (columnaId === 'beneficiario_id') {
            await conn.query(`DELETE FROM beneficiarios WHERE id = ?`, {
                replacements: [id],
                type: Sequelize.QueryTypes.DELETE
            });
        }

        if (columnaId === 'id_donantes') {
            await conn.query(`DELETE FROM donantes WHERE id = ?`, {
                replacements: [id],
                type: Sequelize.QueryTypes.DELETE
            });
        }

        res.status(200).json({ message: `${tipo} eliminado correctamente` });
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        res.status(500).json({ message: 'Error al eliminar el registro' });
    }
};



const editarRegistro = async (req, res) => {
    const { tipo, id } = req.params;
    const { nombre, correo, calle, colonia, alcaldia } = req.body;

    let tabla;
    switch (tipo) {
        case 'ciudadano':
            tabla = 'ciudadano';
            break;
        case 'institucion':
            tabla = 'instituciones';
            break;
        case 'mercados':
            tabla = 'mercados';
            break;
        case 'local':
            tabla = 'locales';
            break;
        default:
            return res.status(400).json({ message: 'Tipo de registro no válido' });
    }

    try {
        await conn.query(
            `UPDATE beneficiarios SET nombre = ?, correo = ?, calle = ?, colonia = ?, alcaldia = ? WHERE id = ?`,
            {
                replacements: [nombre, correo, calle, colonia, alcaldia, id],
                type: Sequelize.QueryTypes.UPDATE
            }
        );

        res.status(200).json({ message: `${tipo} actualizado correctamente` });
    } catch (error) {
        console.error('Error al actualizar registro:', error);
        res.status(500).json({ message: 'Error al actualizar el registro' });
    }
};

const registrarDonante = async (req, res) => {
    const { tipo, nombre, rfc, numLocales, administrador, correoAdmin, folioActa } = req.body;

    if (!nombre || !rfc) {
        return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    try {
        const t = await conn.transaction();

        try {
            let id_tipo;
            if (tipo === "mercado") {
                id_tipo = 3;
            } else if (tipo === "local") {
                id_tipo = 4;
            } else {
                return res.status(400).json({ message: "Tipo de donante no válido." });
            }

            // Insertar en la tabla donantes
            await conn.query(
                `INSERT INTO donantes (id_tipo, nombre, rfc) VALUES (?, ?, ?)`,
                {
                    replacements: [id_tipo, nombre, rfc],
                    type: Sequelize.QueryTypes.INSERT,
                    transaction: t
                }
            );

            // Obtener el ID del donante recién insertado
            const [donanteId] = await conn.query(`SELECT LAST_INSERT_ID() AS id`, {
                type: Sequelize.QueryTypes.SELECT,
                transaction: t
            });

            const donante_id = donanteId.id;

            // Insertar en la tabla correspondiente según el tipo
            if (tipo === "mercado") {
                await conn.query(
                    `INSERT INTO mercados (id_donantes, numero_locales, administrador, correo_administrador) 
                     VALUES (?, ?, ?, ?)`,
                    {
                        replacements: [donante_id, numLocales, administrador, correoAdmin],
                        type: Sequelize.QueryTypes.INSERT,
                        transaction: t
                    }
                );
            } else if (tipo === "local") {
                await conn.query(
                    `INSERT INTO locales (id_donantes, folio_acta) 
                     VALUES (?, ?)`,
                    {
                        replacements: [donante_id, folioActa],
                        type: Sequelize.QueryTypes.INSERT,
                        transaction: t
                    }
                );
            }

            await t.commit();
            res.status(201).json({ message: "Donante registrado exitosamente" });
        } catch (error) {
            await t.rollback();
            console.error("Error al registrar el donante:", error);
            res.status(500).json({ message: "Error al registrar el donante." });
        }
    } catch (err) {
        console.error("Error en la base de datos:", err);
        res.status(500).json({ message: "Error interno del servidor." });
    }
};

const registrarAlimento = async (req, res) => {
    const { nombre, tipo, donacionVenta, precio, cantidad, unidad, fechaCaducidad, idDonante } = req.body;

    // Validación de datos obligatorios
    if (!nombre || !tipo || !donacionVenta || !fechaCaducidad || !idDonante) {
        return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    try {
        // Verificar si el donante existe
        const [donante] = await conn.query(
            `SELECT id FROM donantes WHERE id = ?`,
            { replacements: [idDonante], type: Sequelize.QueryTypes.SELECT }
        );

        if (!donante) {
            return res.status(404).json({ message: "El donante seleccionado no existe" });
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
                        idDonante,
                        nombre,
                        tipo,
                        donacionVenta,
                        donacionVenta === "vendido" ? precio : null,
                        donacionVenta === "vendido" ? cantidad : null,
                        donacionVenta === "vendido" ? unidad : null,
                        fechaCaducidad
                        
                    ],
                    type: Sequelize.QueryTypes.INSERT,
                    transaction: t
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
            `SELECT a.id, a.nombre, a.tipo, a.modalidad, a.precio, a.cantidad, a.unidad, a.fecha_caducidad, d.nombre AS donante 
             FROM alimentos a
             JOIN donantes d ON a.id_donante = d.id`,
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
            `SELECT id, nombre FROM donantes`,
            { type: Sequelize.QueryTypes.SELECT }
        );
        res.json(donantes);
    } catch (error) {
        console.error("Error al obtener donantes:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

export default { beneficiarioCiudadano, beneficiarioInstitucion,login,obtenerRegistros,eliminarRegistro,editarRegistro,registrarDonante, registrarAlimento,obtenerAlimentos,obtenerDonantes };
