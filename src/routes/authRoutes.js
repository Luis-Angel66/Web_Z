import express from "express";
import authControllers from "../controllers/authControllers.js";

const router = express.Router();

router.post("/ciudadano", authControllers.beneficiarioCiudadano);
router.post("/institucion", authControllers.beneficiarioInstitucion);
router.post("/login", authControllers.login);
router.get("/registros", authControllers.obtenerRegistros);

router.delete("/:tipo/:id", authControllers.eliminarRegistro);
router.put("/editar/:tipo/:id", authControllers.editarRegistro);
router.post("/alimentos/registrar", authControllers.registrarAlimento);
router.get("/alimentos/listar", authControllers.obtenerAlimentos);
router.get("/listar", authControllers.obtenerDonantes);
router.get("/listarMercados", authControllers.listarMercados);
router.post("/locales", authControllers.registrarLocal);
router.post("/mercados", authControllers.registrarMercado);
export default router;
