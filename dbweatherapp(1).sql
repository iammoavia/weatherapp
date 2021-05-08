-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 08, 2021 at 12:07 AM
-- Server version: 8.0.23-0ubuntu0.20.04.1
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbweatherapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbladmins`
--

CREATE TABLE `tbladmins` (
  `id` int NOT NULL,
  `name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Admin',
  `username` varchar(45) NOT NULL,
  `password` varchar(300) NOT NULL,
  `email` varchar(60) NOT NULL,
  `language` char(1) NOT NULL DEFAULT 'E',
  `access` text NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbladmins`
--

INSERT INTO `tbladmins` (`id`, `name`, `username`, `password`, `email`, `language`, `access`, `created_on`) VALUES
(3, 'Admin', 'moavia@123', '$2b$10$efcQJuvDeuvPELGj4jbfo.25By7p7gYj84qIMEdp5UsL7lexCoNjG', 'moavia@gmail.com', 'E', '[\"0\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\"]', '2021-05-03 19:20:29'),
(6, 'Admin', 'somedemo', '$2b$10$3uaNCfHhI.I3ZXtWJCndleC3GY6CvEoXNIh0ZUdyThPtxqO0RcBJ6', 'somedemo@gmail.com', 'E', '[\"E\"]', '2021-05-07 08:50:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbladmins`
--
ALTER TABLE `tbladmins`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbladmins`
--
ALTER TABLE `tbladmins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
