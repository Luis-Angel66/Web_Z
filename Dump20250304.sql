-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: alimentos
-- ------------------------------------------------------
-- Server version	8.0.39

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
  `id_donante` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `modalidad` varchar(10) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `cantidad` decimal(10,2) DEFAULT NULL,
  `unidad` varchar(20) DEFAULT NULL,
  `fecha_caducidad` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_donante` (`id_donante`),
  CONSTRAINT `alimentos_ibfk_1` FOREIGN KEY (`id_donante`) REFERENCES `donantes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `alimentos_chk_3` CHECK ((`unidad` in (_utf8mb4'kg',_utf8mb4'g',_utf8mb4'l')))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentos`
--

LOCK TABLES `alimentos` WRITE;
/*!40000 ALTER TABLE `alimentos` DISABLE KEYS */;
INSERT INTO `alimentos` VALUES (1,5,'asdsad','enlatados','donado',NULL,NULL,NULL,'2025-03-18','2025-03-04 13:32:42'),(2,8,'asdsada','frutasVerduras','vendido',15.99,45.00,'kg','2025-04-04','2025-03-04 13:34:07'),(3,9,'asdada','infantil','donado',NULL,NULL,NULL,'2025-03-19','2025-03-04 13:34:58');
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
  `id_tipo` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `calle` varchar(255) DEFAULT NULL,
  `colonia` varchar(255) DEFAULT NULL,
  `alcaldia` varchar(80) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estatus` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_UNIQUE` (`correo`),
  KEY `tipo_id_idx` (`id_tipo`),
  CONSTRAINT `tipo_id` FOREIGN KEY (`id_tipo`) REFERENCES `tipo` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beneficiarios`
--

LOCK TABLES `beneficiarios` WRITE;
/*!40000 ALTER TABLE `beneficiarios` DISABLE KEYS */;
INSERT INTO `beneficiarios` VALUES (5,1,'Ciudad de México','1234567','ezurita0526@gmail.com','Ciudad de México','asdasda','Ciudad de México','2025-03-04 06:39:55',1),(10,2,'asdsasda','123456','ezurita0156@gmail.com','asdsada','sdassa','asdas','2025-03-04 07:19:25',1);
/*!40000 ALTER TABLE `beneficiarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudadano`
--

DROP TABLE IF EXISTS `ciudadano`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ciudadano` (
  `id` int NOT NULL AUTO_INCREMENT,
  `beneficiario_id` int NOT NULL,
  `numero_identificacion` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_identificacion_UNIQUE` (`numero_identificacion`),
  KEY `beneficiario_id_idx` (`beneficiario_id`),
  CONSTRAINT `beneficiario_id` FOREIGN KEY (`beneficiario_id`) REFERENCES `beneficiarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudadano`
--

LOCK TABLES `ciudadano` WRITE;
/*!40000 ALTER TABLE `ciudadano` DISABLE KEYS */;
INSERT INTO `ciudadano` VALUES (4,5,'1231435323');
/*!40000 ALTER TABLE `ciudadano` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donantes`
--

DROP TABLE IF EXISTS `donantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tipo` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `rfc` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rfc` (`rfc`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donantes`
--

LOCK TABLES `donantes` WRITE;
/*!40000 ALTER TABLE `donantes` DISABLE KEYS */;
INSERT INTO `donantes` VALUES (5,4,'asdsada','asdasd12313','2025-03-04 08:53:50'),(6,4,'asdasd','asdsad234','2025-03-04 09:08:34'),(8,3,'aaaaaaaa','asdasd1a2321','2025-03-04 12:05:50'),(9,3,'asdasda','asdasd12321aaa','2025-03-04 12:11:36');
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
  `rfc` varchar(45) NOT NULL,
  `folio_acta` varchar(45) NOT NULL,
  `nombre_contacto` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rfc_UNIQUE` (`rfc`),
  UNIQUE KEY `folio_acta_UNIQUE` (`folio_acta`),
  KEY `beneficiario_id_idx` (`beneficiario_id`),
  CONSTRAINT `beneficiario` FOREIGN KEY (`beneficiario_id`) REFERENCES `beneficiarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instituciones`
--

LOCK TABLES `instituciones` WRITE;
/*!40000 ALTER TABLE `instituciones` DISABLE KEYS */;
INSERT INTO `instituciones` VALUES (1,10,'asdasas','13121','asdassa');
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
  `folio_acta` varchar(45) NOT NULL,
  `id_donantes` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locales`
--

LOCK TABLES `locales` WRITE;
/*!40000 ALTER TABLE `locales` DISABLE KEYS */;
INSERT INTO `locales` VALUES (1,'asdas123321',5),(2,'sadasda3',6);
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
  `id_donantes` int NOT NULL,
  `numero_locales` int NOT NULL,
  `administrador` varchar(255) NOT NULL,
  `correo_administrador` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_administrador` (`correo_administrador`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercados`
--

LOCK TABLES `mercados` WRITE;
/*!40000 ALTER TABLE `mercados` DISABLE KEYS */;
INSERT INTO `mercados` VALUES (2,8,3,'sdaa','ezurita05d6@gmail.com','2025-03-04 12:05:50'),(3,9,2,'asdsad','ezurita0e56@gmail.com','2025-03-04 12:11:36');
/*!40000 ALTER TABLE `mercados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
INSERT INTO `tipo` VALUES (1,'ciudadano'),(2,'instalacion'),(3,'mercados'),(4,'locales');
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_beneficiario` int NOT NULL,
  `id_alimento` int NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `id_beneficiario` (`id_beneficiario`),
  KEY `id_alimento` (`id_alimento`),
  CONSTRAINT `transacciones_ibfk_1` FOREIGN KEY (`id_beneficiario`) REFERENCES `beneficiarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transacciones_ibfk_2` FOREIGN KEY (`id_alimento`) REFERENCES `alimentos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-04  7:41:20
