-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: alimentos
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alimentos`
--

DROP TABLE IF EXISTS `alimentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `local_id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `tipo` enum('fruta','verdura','enlatado','infantil','sellado') DEFAULT NULL,
  `modalidad` enum('donación','oferta') DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `unidad` varchar(20) DEFAULT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `local_id` (`local_id`),
  CONSTRAINT `alimentos_ibfk_1` FOREIGN KEY (`local_id`) REFERENCES `locales` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentos`
--

LOCK TABLES `alimentos` WRITE;
/*!40000 ALTER TABLE `alimentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `alimentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beneficiarios`
--

DROP TABLE IF EXISTS `beneficiarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `beneficiarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `tipo` enum('ciudadano','institucion') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `beneficiarios_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficiarios`
--

LOCK TABLES `beneficiarios` WRITE;
/*!40000 ALTER TABLE `beneficiarios` DISABLE KEYS */;
INSERT INTO `beneficiarios` VALUES (2,4,'ciudadano'),(3,5,'ciudadano'),(4,6,'institucion'),(5,8,'institucion');
/*!40000 ALTER TABLE `beneficiarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudadanos`
--

DROP TABLE IF EXISTS `ciudadanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudadanos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `beneficiario_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `alcaldia` varchar(100) DEFAULT NULL,
  `numero_ident` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `beneficiario_id` (`beneficiario_id`),
  CONSTRAINT `ciudadanos_ibfk_1` FOREIGN KEY (`beneficiario_id`) REFERENCES `beneficiarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudadanos`
--

LOCK TABLES `ciudadanos` WRITE;
/*!40000 ALTER TABLE `ciudadanos` DISABLE KEYS */;
INSERT INTO `ciudadanos` VALUES (1,2,'Ana López','Av. Reforma 123','Centro','Cuauhtémoc','INE1234567890'),(2,3,'adasda','jhasdsadsa','asdadsa','asdasdsa','asda23232');
/*!40000 ALTER TABLE `ciudadanos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donantes`
--

DROP TABLE IF EXISTS `donantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `tipo` enum('mercado','local_externo') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `donantes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donantes`
--

LOCK TABLES `donantes` WRITE;
/*!40000 ALTER TABLE `donantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `donantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instituciones`
--

DROP TABLE IF EXISTS `instituciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instituciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `beneficiario_id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `rfc` varchar(50) DEFAULT NULL,
  `folio_acta` varchar(50) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `alcaldia` varchar(100) DEFAULT NULL,
  `nombre_contacto` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `beneficiario_id` (`beneficiario_id`),
  CONSTRAINT `instituciones_ibfk_1` FOREIGN KEY (`beneficiario_id`) REFERENCES `beneficiarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituciones`
--

LOCK TABLES `instituciones` WRITE;
/*!40000 ALTER TABLE `instituciones` DISABLE KEYS */;
INSERT INTO `instituciones` VALUES (1,4,'Fundación Educativa ABC','FEA010203ABC','ACTA-2025-001','Av. Revolución 123','San Ángel','Álvaro Obregón','Laura Martínez'),(2,5,'adasda','vkjhlbvl','nlk','jh','adsa','adasdas','nñknnn');
/*!40000 ALTER TABLE `instituciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locales`
--

DROP TABLE IF EXISTS `locales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donante_id` int NOT NULL,
  `mercado_id` int DEFAULT NULL,
  `numero_local` varchar(20) DEFAULT NULL,
  `nombre_negocio` varchar(100) DEFAULT NULL,
  `giro` varchar(100) DEFAULT NULL,
  `tipo_local` enum('externo','interno') DEFAULT NULL,
  `cedula_folio` varchar(50) DEFAULT NULL,
  `rfc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `donante_id` (`donante_id`),
  KEY `mercado_id` (`mercado_id`),
  CONSTRAINT `locales_ibfk_1` FOREIGN KEY (`donante_id`) REFERENCES `donantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `locales_ibfk_2` FOREIGN KEY (`mercado_id`) REFERENCES `mercados` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locales`
--

LOCK TABLES `locales` WRITE;
/*!40000 ALTER TABLE `locales` DISABLE KEYS */;
/*!40000 ALTER TABLE `locales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mercados`
--

DROP TABLE IF EXISTS `mercados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mercados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `donante_id` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `calle` varchar(100) DEFAULT NULL,
  `colonia` varchar(100) DEFAULT NULL,
  `alcaldia` varchar(100) DEFAULT NULL,
  `rfc` varchar(50) DEFAULT NULL,
  `numero_locales` int DEFAULT NULL,
  `nombre_admin` varchar(100) DEFAULT NULL,
  `correo_admin` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `donante_id` (`donante_id`),
  CONSTRAINT `mercados_ibfk_1` FOREIGN KEY (`donante_id`) REFERENCES `donantes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercados`
--

LOCK TABLES `mercados` WRITE;
/*!40000 ALTER TABLE `mercados` DISABLE KEYS */;
/*!40000 ALTER TABLE `mercados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `alimento_id` int NOT NULL,
  `beneficiario_id` int NOT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `alimento_id` (`alimento_id`),
  KEY `beneficiario_id` (`beneficiario_id`),
  CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`alimento_id`) REFERENCES `alimentos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transacciones_ibfk_2` FOREIGN KEY (`beneficiario_id`) REFERENCES `beneficiarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tipo_usuario` enum('beneficiario','donante','admin') NOT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (4,'ana.lopez@example.com','$2b$10$VrsMoBJc3Q2JL5pmPvUYzeWJY.ScxYPyvkUCy6jhr6yrSYT3DPF72','beneficiario','2025-05-25 02:43:09'),(5,'ezurita056@gmail.com','$2b$10$dliPisiCaA2oj/burXVAb.JsyVcaZm9ZoJaTrGKGBtHtFb1NN3beq','beneficiario','2025-05-25 02:58:01'),(6,'contacto@fundacionabc.org','$2b$10$BR3CD6uyx9//qC9p.TnpK..BVllT4UafbGqV/EyHZ9nwfzRh3fVdS','beneficiario','2025-05-25 05:11:01'),(8,'ezurita0536@gmail.com','$2b$10$FWBPxktR5RkAtzcRDBGFneNPGTQFJJhNJ7tANE7KuHgPWE/ZWD.Vu','beneficiario','2025-05-25 05:26:05');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-25 13:39:03
