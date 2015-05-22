-- MySQL dump 10.13  Distrib 5.6.24, for Win64 (x86_64)
--
-- Host: localhost    Database: chat
-- ------------------------------------------------------
-- Server version	5.6.24-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` varchar(45) NOT NULL DEFAULT '',
  `message` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `editDelete` tinyint(1) DEFAULT NULL,
  `methodRequest` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TOUSERS` (`author_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES ('103140128389','what\'s up, \nas=dp','2015-05-21 21:21:21',613398070,0,0,'POST'),('154571283693','maybe','2015-05-21 21:27:45',6715943,0,0,'POST'),('241242776090','toto','2015-05-21 21:28:01',52907844,0,0,'POST'),('252934290696','I\'m TOR!','2015-05-21 21:28:37',770591906,0,0,'POST'),('357671526427','I\'m bird!','2015-05-21 21:30:58',718875245,0,0,'POST'),('398392038165','Do you want smth?','2015-05-21 21:27:09',613398070,0,0,'POST'),('432517702174','HI','2015-05-21 21:26:30',121188950,0,0,'POST'),('507026562399','ok','2015-05-21 21:27:51',246824650,0,0,'POST'),('524247437306','HI','2015-05-21 21:21:07',121188950,0,0,'POST'),('585090580204','taxi 7788','2015-05-21 21:28:12',131796443,0,0,'POST'),('802283577158','I thin you are coool :)','2015-05-21 21:27:37',341335754,0,0,'POST'),('84581366952','piu piu piu','2015-05-21 21:28:25',136982836,0,0,'POST'),('987229930811','How, are you?','2015-05-21 21:26:43',945489175,0,0,'POST');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1223223,'Dima'),(6715943,'Poll'),(121188950,'Kolia'),(131796443,'Peter'),(136982836,'Danila'),(246824650,'Darina'),(341335754,'Denis'),(718875245,'Teteref'),(770591906,'Tor'),(945489175,'Bond');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-21 21:32:21
