-- MySQL dump 10.13  Distrib 5.7.11, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: dev
-- ------------------------------------------------------
-- Server version	5.7.24

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
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_blog_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` json DEFAULT NULL,
  `content` json DEFAULT NULL,
  `love` int(11) NOT NULL DEFAULT '0',
  `comment` text NOT NULL DEFAULT '',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `USERBLOGID_TO_BLOG` (`user_blog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (27,1548648540,11,'\"Flask文档教程\"','\"我有很多东西在一开始也看不懂，反而是在自己写项目和工作中去领悟出来的。单靠看书、看博客肯定不够，一定要边学边练。我给你分几步：\\n\\n\\n1. 了解理论。也就是你要清楚「视图」、「模板」、「模型」、「MVC」、「中间件」、「REST API」这些使用Web框架要用到的东西。我个人当时也是看了很多相关的文章，但还是一知半解。\\n\\n2. 了解一些Linux、网络、数据库的知识。要求就是能在Linux执行一些系统命令，安装包，使用数据库写SQL，知道TCP/IP这些内容。\\n\\n3. 看Flask的官方文档。英语不好也可先找中文的看，但是还是推荐直接看英文的，因为有些翻译的理解和原意还是有误差，容易误导。\\n\\n4. 只写后端。也就是只写Python部分，甚至不涉及模板。先写一个小的应用。比如仿  https://link.zhihu.com/?target=https://github.com/Runscope/httpbin  ，它就是Flask写的，你看着网站可以先简化一些不会的东西。直到你知道了怎么路由，怎么返回JSON格式的内容。\\n\\n\\n5. 学习写模板。可以把你做的应用加上模板，实现更复杂的功能，当然这个时候页面很简陋。\"',2,'51,','2019-01-28 04:09:00'),(28,1548648541,11,'\"CSS自动换行、强制不换行、强制断行、超出显示省略号\"','\"P标签是默认是自动换行的，因此设置好宽度之后，能够较好的实现效果，但是最近的项目中发现，使用ajax加载数据之后，p标签内的内容没有换行，导致布局错乱，于是尝试着使用换行样式，虽然解决了问题，但是并没有发现本质原因，本质在于，我当时获取的数据是一长串的数字，浏览器应该是对数字和英文单词处理方式相近，不会截断。\\n\\n\\n强制不换行 \\np { white-space:nowrap; }\\n\\n自动换行 \\np { word-wrap:break-word; }\\n\\n强制英文单词断行 \\np { word-break:break-all; }\\n\\n*注意：设置强制将英文单词断行，需要将行内元素设置为块级元素。\\n\\n超出显示省略号 \\np{text-overflow:ellipsis;overflow:hidden;}\"',1,'','2019-01-28 04:54:09');
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `comment` json DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (51,12,'\"asdf\"');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `avatar` mediumtext,
  PRIMARY KEY (`id`),
  KEY `USERNAME_TO_USERID` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (11,'weimingliu','stupidone','http://119.23.231.141:8082/mongo_img/vimi.jpg'),(12,'admin','admin',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-28 12:57:03
