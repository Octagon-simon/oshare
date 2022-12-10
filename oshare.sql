-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 10, 2022 at 07:16 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oshare`
--

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) DEFAULT NULL,
  `file_id` varchar(100) NOT NULL,
  `file_name` varchar(100) NOT NULL,
  `in_dir_name` varchar(200) NOT NULL,
  `file_downloads` varchar(6) DEFAULT NULL,
  `file_last_download_date` varchar(20) DEFAULT NULL,
  `file_upload_date` varchar(20) NOT NULL,
  `exp_time` varchar(20) NOT NULL,
  `timezone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `user_id`, `file_id`, `file_name`, `in_dir_name`, `file_downloads`, `file_last_download_date`, `file_upload_date`, `exp_time`, `timezone`) VALUES
(58, NULL, 'mul-ZOgmUp7oz9', 'myFiles-6393f3a9174e7-1731.zip', 'myFiles-6393f3a9174e7-1731.zip', NULL, NULL, '1670640561', '1670726961', 'Africa/Lagos'),
(57, NULL, 'ZI0vEoSrBZ', 'Best of KSHMR.m4a', 'f8b750cd39994f6a018c2bb00a768ded.m4a', NULL, NULL, '1670640541', '1670726941', 'Africa/Lagos'),
(56, NULL, 'R6idHpFryD', 'Ellie Goulding - High For This (Kygo Remix).mp3', 'dab4a18a31587a3ad6654c9c6b84c5d5.mp3', NULL, NULL, '1670640435', '1670726835', 'Africa/Lagos'),
(55, NULL, 'mul-f7Lbl6iQ2K', 'myFiles-6393f2dcc95eb-7967.zip', 'myFiles-6393f2dcc95eb-7967.zip', NULL, NULL, '1670640412', '1670726812', 'Africa/Lagos'),
(59, NULL, 'sOrxtQ6wwK', '01 Track 1.wma', '5813578675317f10ec37fb302b6067d5.wma', NULL, NULL, '1670655660', '1670742060', 'Africa/Lagos'),
(60, NULL, 'M5kKdY3hho', '01 Track 1.wma', '5813578675317f10ec37fb302b6067d5.wma', NULL, NULL, '1670656255', '1670742655', 'Africa/Lagos');

-- --------------------------------------------------------

--
-- Table structure for table `views`
--

DROP TABLE IF EXISTS `views`;
CREATE TABLE IF NOT EXISTS `views` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_id` varchar(100) NOT NULL,
  `ip_address` varchar(10000) NOT NULL,
  `file_views` varchar(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `views`
--

INSERT INTO `views` (`id`, `file_id`, `ip_address`, `file_views`) VALUES
(2, 'JyItIFvU8o', '[\"127.0.0.1\"]', '1'),
(3, 'mhuHo2owJ6', '[\"127.0.0.1\"]', '1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
