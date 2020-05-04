-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 30, 2020 at 02:20 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `home_share_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `AMENITIES`
--

CREATE TABLE `AMENITIES` (
  `A_Type` varchar(25) NOT NULL,
  `A_Desc` varchar(255) NOT NULL,
  `A_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `AMENITIES`
--


-- --------------------------------------------------------

--
-- Table structure for table `GUESTS`
--

CREATE TABLE `GUESTS` (
  `Email_addr` varchar(255) NOT NULL,
  `Phone_num` char(10) NOT NULL,
  `F_name` varchar(15) NOT NULL,
  `L_name` varchar(15) NOT NULL,
  `Password_encrypted` varchar(255) NOT NULL,
  `Gender` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `GUESTS`
--


-- --------------------------------------------------------

--
-- Table structure for table `HOST`
--

CREATE TABLE `HOST` (
  `Email_addr` varchar(255) NOT NULL,
  `Phone_num` char(10) NOT NULL,
  `F_name` varchar(15) NOT NULL,
  `L_name` varchar(15) NOT NULL,
  `Password_encrypted` varchar(255) NOT NULL,
  `Gender` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `HOST`
--


-- --------------------------------------------------------

--
-- Table structure for table `LOCATE_ON`
--

CREATE TABLE `LOCATE_ON` (
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL,
  `R_City` varchar(20) NOT NULL,
  `R_State` varchar(20) NOT NULL,
  `R_Country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `LOCATION`
--

CREATE TABLE `LOCATION` (
  `R_City` varchar(20) NOT NULL,
  `R_State` varchar(20) NOT NULL,
  `R_Country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `LOCATION`
--



-- --------------------------------------------------------

--
-- Table structure for table `OFFERS`
--

CREATE TABLE `OFFERS` (
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL,
  `A_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `PAYMENT`
--

CREATE TABLE `PAYMENT` (
  `P_Num` int(11) NOT NULL,
  `P_Time` datetime NOT NULL,
  `P_Amount` int(31) NOT NULL,
  `G_email_addr` varchar(255) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--

-- --------------------------------------------------------

--
-- Table structure for table `RESERVED_BY`
--

CREATE TABLE `RESERVED_BY` (
  `From_date` date NOT NULL,
  `To_date` date NOT NULL,
  `G_email_addr` varchar(255) NOT NULL,
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `RESERVED_BY`
--



-- --------------------------------------------------------

--
-- Table structure for table `REVIEWS`
--

CREATE TABLE `REVIEWS` (
  `Re_Num` int(11) NOT NULL,
  `Re_Text` varchar(1000) NOT NULL,
  `Re_Time` datetime NOT NULL,
  `G_email_addr` varchar(255) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `REVIEWS`
--



-- --------------------------------------------------------

--
-- Table structure for table `ROOMS`
--

CREATE TABLE `ROOMS` (
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL,
  `R_Price` int(31) NOT NULL,
  `R_Type` varchar(15) NOT NULL,
  `R_MaxGuest` int(10) NOT NULL,
  `R_Addr` varchar(255) NOT NULL,
  `R_Status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ROOMS`
--



--
-- Indexes for dumped tables
--

--
-- Indexes for table `AMENITIES`
--
ALTER TABLE `AMENITIES`
  ADD PRIMARY KEY (`A_Name`);

--
-- Indexes for table `GUESTS`
--
ALTER TABLE `GUESTS`
  ADD PRIMARY KEY (`Email_addr`);

--
-- Indexes for table `HOST`
--
ALTER TABLE `HOST`
  ADD PRIMARY KEY (`Email_addr`);

--
-- Indexes for table `LOCATE_ON`
--
ALTER TABLE `LOCATE_ON`
  ADD PRIMARY KEY (`R_ID`,`H_email_addr`,`R_City`,`R_State`,`R_Country`),
  ADD KEY `Constraint_l_to_r` (`H_email_addr`,`R_ID`),
  ADD KEY `Constraint_l_to_l` (`R_City`,`R_State`,`R_Country`);

--
-- Indexes for table `LOCATION`
--
ALTER TABLE `LOCATION`
  ADD PRIMARY KEY (`R_City`,`R_State`,`R_Country`);

--
-- Indexes for table `OFFERS`
--
ALTER TABLE `OFFERS`
  ADD PRIMARY KEY (`R_ID`,`H_email_addr`,`A_Name`),
  ADD KEY `Constraint_off_r` (`H_email_addr`,`R_ID`),
  ADD KEY `Constraint_off_a` (`A_Name`);

--
-- Indexes for table `PAYMENT`
--
ALTER TABLE `PAYMENT`
  ADD PRIMARY KEY (`P_Num`,`G_email_addr`,`H_email_addr`),
  ADD KEY `Constraint_pa_to_g` (`G_email_addr`),
  ADD KEY `Constraint_pa_to_h` (`H_email_addr`);

--
-- Indexes for table `RESERVED_BY`
--
ALTER TABLE `RESERVED_BY`
  ADD PRIMARY KEY (`G_email_addr`,`R_ID`,`H_email_addr`),
  ADD KEY `Constraint_res_to_r` (`R_ID`,`H_email_addr`);

--
-- Indexes for table `REVIEWS`
--
ALTER TABLE `REVIEWS`
  ADD PRIMARY KEY (`Re_Num`,`G_email_addr`,`H_email_addr`),
  ADD KEY `Constraint_re_to_g` (`G_email_addr`),
  ADD KEY `Constraint_re_to_h` (`H_email_addr`);

--
-- Indexes for table `ROOMS`
--
ALTER TABLE `ROOMS`
  ADD PRIMARY KEY (`R_ID`,`H_email_addr`),
  ADD KEY `Constraint1` (`H_email_addr`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `LOCATE_ON`
--
ALTER TABLE `LOCATE_ON`
  ADD CONSTRAINT `Constraint_l_to_l` FOREIGN KEY (`R_City`,`R_State`,`R_Country`) REFERENCES `LOCATION` (`R_City`, `R_State`, `R_Country`),
  ADD CONSTRAINT `Constraint_l_to_r` FOREIGN KEY (`H_email_addr`,`R_ID`) REFERENCES `ROOMS` (`H_email_addr`, `R_ID`);

--
-- Constraints for table `OFFERS`
--
ALTER TABLE `OFFERS`
  ADD CONSTRAINT `Constraint_off_a` FOREIGN KEY (`A_Name`) REFERENCES `AMENITIES` (`A_Name`),
  ADD CONSTRAINT `Constraint_off_r` FOREIGN KEY (`H_email_addr`,`R_ID`) REFERENCES `ROOMS` (`H_email_addr`, `R_ID`);

--
-- Constraints for table `PAYMENT`
--
ALTER TABLE `PAYMENT`
  ADD CONSTRAINT `Constraint_pa_to_g` FOREIGN KEY (`G_email_addr`) REFERENCES `GUESTS` (`Email_addr`),
  ADD CONSTRAINT `Constraint_pa_to_h` FOREIGN KEY (`H_email_addr`) REFERENCES `HOST` (`Email_addr`);

--
-- Constraints for table `RESERVED_BY`
--
ALTER TABLE `RESERVED_BY`
  ADD CONSTRAINT `Constraint_res_to_g` FOREIGN KEY (`G_email_addr`) REFERENCES `GUESTS` (`Email_addr`),
  ADD CONSTRAINT `Constraint_res_to_r` FOREIGN KEY (`R_ID`,`H_email_addr`) REFERENCES `ROOMS` (`R_ID`, `H_email_addr`);

--
-- Constraints for table `REVIEWS`
--
ALTER TABLE `REVIEWS`
  ADD CONSTRAINT `Constraint_re_to_g` FOREIGN KEY (`G_email_addr`) REFERENCES `GUESTS` (`Email_addr`),
  ADD CONSTRAINT `Constraint_re_to_h` FOREIGN KEY (`H_email_addr`) REFERENCES `HOST` (`Email_addr`);

--
-- Constraints for table `ROOMS`
--
ALTER TABLE `ROOMS`
  ADD CONSTRAINT `Constraint1` FOREIGN KEY (`H_email_addr`) REFERENCES `HOST` (`Email_addr`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
