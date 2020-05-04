-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2020 at 03:33 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

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

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Load_Data` (OUT `LOGINFO` VARCHAR(255))  BEGIN
		DECLARE total_count_payment,  total_count_reviews, total_count_guests, total_count_host,
			total_count_rooms, total_count_reservedby, total_count_amenities, total_count_offers, total_count_locateon, total_count_location INT DEFAULT 0;    		
         DECLARE LOGINFO_INSERT VARCHAR(255) DEFAULT "DATALOAD: ";
         DECLARE LOGINFO_NOINSERT VARCHAR(255) DEFAULT "NO DATALOAD: ";
         SET LOGINFO = "";
        SELECT COUNT(*) INTO total_count_payment FROM payment;
		SELECT COUNT(*) INTO total_count_reviews FROM reviews;
		SELECT COUNT(*) INTO total_count_guests FROM guests;
		SELECT COUNT(*) INTO total_count_host FROM host;
		SELECT COUNT(*) INTO total_count_rooms FROM rooms;
		SELECT COUNT(*) INTO total_count_reservedby FROM reserved_by;
		SELECT COUNT(*) INTO total_count_amenities FROM amenities;
		SELECT COUNT(*) INTO total_count_offers FROM offers;
		SELECT COUNT(*) INTO total_count_locateon FROM locate_on;
		SELECT COUNT(*) INTO total_count_location FROM location;
       
        IF total_count_location = 0 THEN
			INSERT INTO LOCATION VALUES
			('San Jose','CA','USA'),
			('Santa Clara','CA','USA'),
			('San Francisco','CA','USA'),
			('Mountain View','CA','USA'),
			('Sacramento','CA','USA'),
			('Vacaville','CA','USA');		
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'LOCATION ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'LOCATION ');
		END IF;
        
        IF total_count_host = 0 THEN
			INSERT INTO `HOST` (`Email_addr`, `Phone_num`, `F_name`, `L_name`, `Password_encrypted`, `Gender`) VALUES
			('host1@gmail.com', '9876543210', 'Amy', 'Black', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
            ('host2@gmail.com', '9876543212', 'Shawn', 'Booth', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Male'),
            ('host3@gmail.com', '9876543213', 'Kate', 'Larkin', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
            ('host4@gmail.com', '9876543214', 'Dana', 'Schumer', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
            ('host5@gmail.com', '9876543215', 'Phoebe', 'Hind', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female');
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'HOST ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'HOST ');
		END IF;
        
         IF total_count_guests = 0 THEN
			INSERT INTO `GUESTS` (`Email_addr`, `Phone_num`, `F_name`, `L_name`, `Password_encrypted`, `Gender`) VALUES
			('guest1@sample.com', '1234567890', 'John', 'Smith', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Male'),
			('guest2@gmail.com', '1234567892', 'Amy', 'Knight', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
            ('guest3@gmail.com', '8876543212', 'Rick', 'Ponting', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Male'),
            ('guest4@gmail.com', '8876543213', 'Teresa', 'Hills', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
            ('guest5@gmail.com', '6876543214', 'Patrick', 'Jane', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female');            
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'GUESTS ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'GUESTS ');
		END IF;
        
         IF total_count_amenities = 0 THEN
			INSERT INTO `AMENITIES` (`A_Type`, `A_Desc`, `A_Name`) VALUES
				('Facilities', 'There are a lot of spaces outside for parking.', 'Free street parking'),
				('Basic', 'Continuous access in the listing.', 'WIFI'),
                ('Bed and bath', 'Shower in room.', 'Shower'),
                ('Basic', 'Central heating available in the listing.', 'Heating');          
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'AMENITIES ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'AMENITIES ');
		END IF;
        
          IF total_count_rooms = 0 THEN
			INSERT INTO `ROOMS` (`R_ID`, `H_email_addr`, `R_Price`, `R_Type`, `R_MaxGuest`, `R_Addr`, `R_Status`) VALUES
				(1, 'host1@gmail.com', 50, 'Shared room', 1, '1111, 31st', 'available'),         
                (2, 'host1@gmail.com', 80, 'Private room', 2, '2222, 71st', 'available'),
                (1, 'host2@gmail.com', 50, 'Shared room', 2, '444, 1st', 'available'),
                (2, 'host2@gmail.com', 70, 'Private room', 2, '333, 7th', 'available'),
                (3, 'host2@gmail.com', 100, 'Private room', 3, '236, 21st', 'available'),
                (1, 'host3@gmail.com', 70, 'Private room', 2, '523, 1st', 'available'),
                (1, 'host4@gmail.com', 60, 'Private room', 2, '741, 1st', 'available'),
                (2, 'host4@gmail.com', 50, 'Shared room', 1, '563, 15th', 'available'),
                (3, 'host4@gmail.com', 50, 'Shared room', 1, '21, 1st', 'available'),
                (1, 'host5@gmail.com', 120, 'Private room', 3, '89, 5th', 'available');
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'ROOMS ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'ROOMS ');
		END IF;
        
        IF total_count_offers = 0 THEN
			INSERT INTO `OFFERS` (`R_ID`, `H_email_addr`, `A_Name`) VALUES
				(1, 'host1@gmail.com', 'WIFI'),         
                (1, 'host1@gmail.com', 'Shower'),
                (1, 'host1@gmail.com', 'Free street parking'),
                (2, 'host1@gmail.com', 'WIFI'),
                (2, 'host1@gmail.com', 'Heating'),
                (1, 'host2@gmail.com', 'WIFI'),
                (1, 'host2@gmail.com', 'Heating'),
                (2, 'host2@gmail.com', 'WIFI'),
                (2, 'host2@gmail.com', 'Heating'),                
                (3, 'host2@gmail.com', 'WIFI'),
                (3, 'host2@gmail.com', 'Shower'),
                (3, 'host2@gmail.com', 'Heating'),
                (1, 'host3@gmail.com', 'WIFI'),
                (1, 'host3@gmail.com', 'Shower'),
                (1, 'host3@gmail.com', 'Heating'),
                (1, 'host3@gmail.com', 'Free street parking'),
                (1, 'host4@gmail.com', 'WIFI'),
                (1, 'host4@gmail.com', 'Shower'),
                (2, 'host4@gmail.com', 'WIFI'),
                (3, 'host4@gmail.com', 'WIFI'),
                (1, 'host5@gmail.com', 'WIFI'),
                (1, 'host5@gmail.com', 'Shower'),
                (1, 'host5@gmail.com', 'Heating');
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'OFFERS ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'OFFERS ');
		END IF;
        
        IF total_count_locateon = 0 THEN
			INSERT INTO `LOCATE_ON` (`R_ID`, `H_email_addr`, `R_City`, `R_State`, `R_Country`) VALUES
				(1, 'host1@gmail.com', 'San Jose','CA','USA'),
                (2, 'host1@gmail.com', 'San Jose','CA','USA'),
                (1, 'host2@gmail.com', 'Santa Clara','CA','USA'),
                (2, 'host2@gmail.com', 'San Francisco','CA','USA'),
                (3, 'host2@gmail.com', 'Mountain View','CA','USA'),
                (1, 'host3@gmail.com', 'San Jose','CA','USA'),
                (1, 'host4@gmail.com', 'Sacramento','CA','USA'),
                (2, 'host4@gmail.com', 'Vacaville','CA','USA'),
                (3, 'host4@gmail.com', 'Santa Clara','CA','USA'),
                (1, 'host5@gmail.com', 'San Jose','CA','USA');
           SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'LOCATE_ON ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'LOCATE_ON ');
		END IF;
        
        IF total_count_reservedby = 0 THEN
			INSERT INTO `RESERVED_BY` (`From_date`, `To_date`, `G_email_addr`, `R_ID`, `H_email_addr`) VALUES
				('2020-04-27', '2020-04-28', 'guest1@sample.com', 1, 'host1@gmail.com'),
				('2020-04-25', '2020-04-26', 'guest2@gmail.com', 2, 'host1@gmail.com'),
				('2020-03-27', '2020-03-28', 'guest4@gmail.com', 2, 'host1@gmail.com'),
				('2020-02-05', '2020-02-06', 'guest2@gmail.com', 1, 'host5@gmail.com'),
				('2020-01-20', '2020-01-21', 'guest1@sample.com', 1, 'host5@gmail.com'),
				('2020-02-14', '2020-02-15', 'guest4@gmail.com', 1, 'host5@gmail.com'),
				('2020-01-08', '2020-01-09', 'guest3@gmail.com', 1, 'host5@gmail.com'),
				('2020-02-16', '2020-02-17', 'guest1@sample.com', 1, 'host3@gmail.com');
			SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'reserved_by ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'reserved_by ');
		END IF;
        
        IF total_count_payment = 0 THEN
		INSERT INTO `PAYMENT` (`P_Num`, `P_Time`, `P_Amount`, `G_email_addr`, `H_email_addr`) VALUES				
				(1, '2020-04-28 19:05:46', 50, 'guest1@sample.com', 'host1@gmail.com'),
				(2, '2020-04-26 19:05:46', 80, 'guest2@gmail.com', 'host1@gmail.com'),
				(3, '2020-03-28 19:05:46', 80, 'guest4@gmail.com', 'host1@gmail.com'),
				(4, '2020-02-06 19:05:46', 120, 'guest2@gmail.com', 'host5@gmail.com'),
				(5, '2020-01-21 19:05:46', 120, 'guest1@sample.com', 'host5@gmail.com'),
				(6, '2020-02-14 19:05:46', 120, 'guest4@gmail.com', 'host5@gmail.com'),
				(7, '2020-01-08 19:05:46', 120, 'guest3@gmail.com', 'host5@gmail.com'),
				(8, '2020-02-16 19:05:46', 70, 'guest1@sample.com', 'host3@gmail.com');		
			SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'PAYMENT ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'PAYMENT ');
		END IF;
        
        IF total_count_reviews = 0 THEN
		INSERT INTO `REVIEWS` (`Re_Num`, `Re_Text`, `Re_Time`, `G_email_addr`, `H_email_addr`) VALUES		
				(1, 'This a good trip.',  '2020-04-28 19:05:46', 'guest1@sample.com', 'host1@gmail.com'),
				(2, 'Host is nice',  '2020-04-26 19:05:46', 'guest2@gmail.com', 'host1@gmail.com'),
				(3, 'Good room.',  '2020-03-28 19:05:46',  'guest4@gmail.com', 'host1@gmail.com'),
				(4, 'This a good trip. clean room',  '2020-02-06 19:05:46',  'guest2@gmail.com', 'host5@gmail.com'),
				(5, 'This a good trip. good host',  '2020-01-21 19:05:46',  'guest1@sample.com', 'host5@gmail.com'),
				(6, 'This a good trip. Nice host',  '2020-02-14 19:05:46',  'guest4@gmail.com', 'host5@gmail.com'),
				(7, 'Clean Room',  '2020-01-08 19:05:46',  'guest3@gmail.com', 'host5@gmail.com'),
				(8, 'Good room.',  '2020-02-16 19:05:46',  'guest1@sample.com', 'host3@gmail.com');		
			SET LOGINFO_INSERT = CONCAT(LOGINFO_INSERT, 'REVIEWS ');
		ELSE
			SET LOGINFO_NOINSERT = CONCAT(LOGINFO_NOINSERT, 'REVIEWS ');
		END IF;
        
        SET LOGINFO = CONCAT(LOGINFO_INSERT, LOGINFO_NOINSERT);
		 -- select total_count_payment,  total_count_reviews, total_count_guests, total_count_host, total_count_rooms, total_count_reservedby, total_count_amenities, total_count_offers, total_count_locateon, total_count_location;
      END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `amenities`
--

CREATE TABLE `amenities` (
  `A_Type` varchar(255) NOT NULL,
  `A_Desc` varchar(255) NOT NULL,
  `A_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `amenities`
--

INSERT INTO `amenities` (`A_Type`, `A_Desc`, `A_Name`) VALUES
('Facilities', 'There are a lot of spaces outside for parking.', 'Free street parking'),
('Basic', 'Central heating available in the listing.', 'Heating'),
('Bed and bath', 'Shower in room.', 'Shower'),
('Basic', 'Continuous access in the listing.', 'WIFI');

-- --------------------------------------------------------

--
-- Table structure for table `guests`
--

CREATE TABLE `guests` (
  `Email_addr` varchar(255) NOT NULL,
  `Phone_num` char(31) NOT NULL,
  `F_name` char(255) NOT NULL,
  `L_name` char(255) NOT NULL,
  `Password_encrypted` varchar(255) NOT NULL,
  `Gender` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guests`
--

INSERT INTO `guests` (`Email_addr`, `Phone_num`, `F_name`, `L_name`, `Password_encrypted`, `Gender`) VALUES
('guest1@sample.com', '1234567890', 'John', 'Smith', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Male'),
('guest2@gmail.com', '1234567892', 'Amy', 'Knight', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
('guest3@gmail.com', '8876543212', 'Rick', 'Ponting', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Male'),
('guest4@gmail.com', '8876543213', 'Teresa', 'Hills', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
('guest5@gmail.com', '6876543214', 'Patrick', 'Jane', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `host`
--

CREATE TABLE `host` (
  `Email_addr` varchar(255) NOT NULL,
  `Phone_num` char(31) NOT NULL,
  `F_name` char(255) NOT NULL,
  `L_name` char(255) NOT NULL,
  `Password_encrypted` varchar(255) NOT NULL,
  `Gender` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `host`
--

INSERT INTO `host` (`Email_addr`, `Phone_num`, `F_name`, `L_name`, `Password_encrypted`, `Gender`) VALUES
('host1@gmail.com', '9876543210', 'Amy', 'Black', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
('host2@gmail.com', '9876543212', 'Shawn', 'Booth', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Male'),
('host3@gmail.com', '9876543213', 'Kate', 'Larkin', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
('host4@gmail.com', '9876543214', 'Dana', 'Schumer', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female'),
('host5@gmail.com', '9876543215', 'Phoebe', 'Hind', '3c56aafa21488c24fe9ecb68ba8478778184c131fd422444c4a6b8f305260b4af28be8f29dd23ffa7ed6aa9dc9b8d2691ce3d8d3ad9cab0e77f42f4bf945a966', 'Female');

-- --------------------------------------------------------

--
-- Table structure for table `locate_on`
--

CREATE TABLE `locate_on` (
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL,
  `R_City` varchar(20) NOT NULL,
  `R_State` varchar(20) NOT NULL,
  `R_Country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locate_on`
--

INSERT INTO `locate_on` (`R_ID`, `H_email_addr`, `R_City`, `R_State`, `R_Country`) VALUES
(1, 'host1@gmail.com', 'San Jose', 'CA', 'USA'),
(1, 'host2@gmail.com', 'Santa Clara', 'CA', 'USA'),
(1, 'host3@gmail.com', 'San Jose', 'CA', 'USA'),
(1, 'host4@gmail.com', 'Sacramento', 'CA', 'USA'),
(1, 'host5@gmail.com', 'San Jose', 'CA', 'USA'),
(2, 'host1@gmail.com', 'San Jose', 'CA', 'USA'),
(2, 'host2@gmail.com', 'San Francisco', 'CA', 'USA'),
(2, 'host4@gmail.com', 'Vacaville', 'CA', 'USA'),
(3, 'host2@gmail.com', 'Mountain View', 'CA', 'USA'),
(3, 'host4@gmail.com', 'Santa Clara', 'CA', 'USA');

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `R_City` varchar(20) NOT NULL,
  `R_State` varchar(20) NOT NULL,
  `R_Country` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`R_City`, `R_State`, `R_Country`) VALUES
('Mountain View', 'CA', 'USA'),
('Sacramento', 'CA', 'USA'),
('San Francisco', 'CA', 'USA'),
('San Jose', 'CA', 'USA'),
('Santa Clara', 'CA', 'USA'),
('Vacaville', 'CA', 'USA');

-- --------------------------------------------------------

--
-- Stand-in structure for view `offered_amenities`
-- (See below for the actual view)
--
CREATE TABLE `offered_amenities` (
`A_Name` varchar(255)
,`R_ID` int(31)
,`H_email_addr` varchar(255)
,`A_Type` varchar(255)
,`A_Desc` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

CREATE TABLE `offers` (
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL,
  `A_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`R_ID`, `H_email_addr`, `A_Name`) VALUES
(1, 'host1@gmail.com', 'Free street parking'),
(1, 'host1@gmail.com', 'Shower'),
(1, 'host1@gmail.com', 'WIFI'),
(1, 'host2@gmail.com', 'Heating'),
(1, 'host2@gmail.com', 'WIFI'),
(1, 'host3@gmail.com', 'Free street parking'),
(1, 'host3@gmail.com', 'Heating'),
(1, 'host3@gmail.com', 'Shower'),
(1, 'host3@gmail.com', 'WIFI'),
(1, 'host4@gmail.com', 'Shower'),
(1, 'host4@gmail.com', 'WIFI'),
(1, 'host5@gmail.com', 'Heating'),
(1, 'host5@gmail.com', 'Shower'),
(1, 'host5@gmail.com', 'WIFI'),
(2, 'host1@gmail.com', 'Heating'),
(2, 'host1@gmail.com', 'WIFI'),
(2, 'host2@gmail.com', 'Heating'),
(2, 'host2@gmail.com', 'WIFI'),
(2, 'host4@gmail.com', 'WIFI'),
(3, 'host2@gmail.com', 'Heating'),
(3, 'host2@gmail.com', 'Shower'),
(3, 'host2@gmail.com', 'WIFI'),
(3, 'host4@gmail.com', 'WIFI');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `P_Num` bigint(255) NOT NULL,
  `P_Time` datetime NOT NULL,
  `P_Amount` int(31) NOT NULL,
  `G_email_addr` varchar(255) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`P_Num`, `P_Time`, `P_Amount`, `G_email_addr`, `H_email_addr`) VALUES
(1, '2020-04-28 19:05:46', 50, 'guest1@sample.com', 'host1@gmail.com'),
(2, '2020-04-26 19:05:46', 80, 'guest2@gmail.com', 'host1@gmail.com'),
(3, '2020-03-28 19:05:46', 80, 'guest4@gmail.com', 'host1@gmail.com'),
(4, '2020-02-06 19:05:46', 120, 'guest2@gmail.com', 'host5@gmail.com'),
(5, '2020-01-21 19:05:46', 120, 'guest1@sample.com', 'host5@gmail.com'),
(6, '2020-02-14 19:05:46', 120, 'guest4@gmail.com', 'host5@gmail.com'),
(7, '2020-01-08 19:05:46', 120, 'guest3@gmail.com', 'host5@gmail.com'),
(8, '2020-02-16 19:05:46', 70, 'guest1@sample.com', 'host3@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `reserved_by`
--

CREATE TABLE `reserved_by` (
  `From_date` date NOT NULL,
  `To_date` date NOT NULL,
  `G_email_addr` varchar(255) NOT NULL,
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reserved_by`
--

INSERT INTO `reserved_by` (`From_date`, `To_date`, `G_email_addr`, `R_ID`, `H_email_addr`) VALUES
('2020-04-27', '2020-04-28', 'guest1@sample.com', 1, 'host1@gmail.com'),
('2020-02-16', '2020-02-17', 'guest1@sample.com', 1, 'host3@gmail.com'),
('2020-01-20', '2020-01-21', 'guest1@sample.com', 1, 'host5@gmail.com'),
('2020-02-05', '2020-02-06', 'guest2@gmail.com', 1, 'host5@gmail.com'),
('2020-04-25', '2020-04-26', 'guest2@gmail.com', 2, 'host1@gmail.com'),
('2020-01-08', '2020-01-09', 'guest3@gmail.com', 1, 'host5@gmail.com'),
('2020-02-14', '2020-02-15', 'guest4@gmail.com', 1, 'host5@gmail.com'),
('2020-03-27', '2020-03-28', 'guest4@gmail.com', 2, 'host1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `Re_Num` bigint(255) NOT NULL,
  `Re_Text` varchar(1000) NOT NULL,
  `Re_Time` datetime NOT NULL,
  `G_email_addr` varchar(255) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`Re_Num`, `Re_Text`, `Re_Time`, `G_email_addr`, `H_email_addr`) VALUES
(1, 'This a good trip.', '2020-04-28 19:05:46', 'guest1@sample.com', 'host1@gmail.com'),
(2, 'Host is nice', '2020-04-26 19:05:46', 'guest2@gmail.com', 'host1@gmail.com'),
(3, 'Good room.', '2020-03-28 19:05:46', 'guest4@gmail.com', 'host1@gmail.com'),
(4, 'This a good trip. clean room', '2020-02-06 19:05:46', 'guest2@gmail.com', 'host5@gmail.com'),
(5, 'This a good trip. good host', '2020-01-21 19:05:46', 'guest1@sample.com', 'host5@gmail.com'),
(6, 'This a good trip. Nice host', '2020-02-14 19:05:46', 'guest4@gmail.com', 'host5@gmail.com'),
(7, 'Clean Room', '2020-01-08 19:05:46', 'guest3@gmail.com', 'host5@gmail.com'),
(8, 'Good room.', '2020-02-16 19:05:46', 'guest1@sample.com', 'host3@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `R_ID` int(31) NOT NULL,
  `H_email_addr` varchar(255) NOT NULL,
  `R_Price` int(31) NOT NULL,
  `R_Type` char(255) NOT NULL,
  `R_MaxGuest` int(31) NOT NULL,
  `R_Addr` varchar(255) NOT NULL,
  `R_Status` char(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`R_ID`, `H_email_addr`, `R_Price`, `R_Type`, `R_MaxGuest`, `R_Addr`, `R_Status`) VALUES
(1, 'host1@gmail.com', 50, 'Shared room', 1, '1111, 31st', 'unavailable'),
(1, 'host2@gmail.com', 50, 'Shared room', 2, '444, 1st', 'available'),
(1, 'host3@gmail.com', 70, 'Private room', 2, '523, 1st', 'available'),
(1, 'host4@gmail.com', 60, 'Private room', 2, '741, 1st', 'available'),
(1, 'host5@gmail.com', 120, 'Private room', 3, '89, 5th', 'available'),
(2, 'host1@gmail.com', 80, 'Private room', 2, '2222, 71st', 'available'),
(2, 'host2@gmail.com', 70, 'Private room', 2, '333, 7th', 'available'),
(2, 'host4@gmail.com', 50, 'Shared room', 1, '563, 15th', 'available'),
(3, 'host2@gmail.com', 100, 'Private room', 3, '236, 21st', 'available'),
(3, 'host4@gmail.com', 50, 'Shared room', 1, '21, 1st', 'available');

-- --------------------------------------------------------

--
-- Stand-in structure for view `roomswithlocation`
-- (See below for the actual view)
--
CREATE TABLE `roomswithlocation` (
`R_ID` int(31)
,`H_email_addr` varchar(255)
,`R_Price` int(31)
,`R_Type` char(255)
,`R_MaxGuest` int(31)
,`R_Addr` varchar(255)
,`R_Status` char(255)
,`R_City` varchar(20)
,`R_State` varchar(20)
,`R_Country` varchar(20)
);

-- --------------------------------------------------------

--
-- Structure for view `offered_amenities`
--
DROP TABLE IF EXISTS `offered_amenities`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `offered_amenities`  AS  (select `offers`.`A_Name` AS `A_Name`,`offers`.`R_ID` AS `R_ID`,`offers`.`H_email_addr` AS `H_email_addr`,`amenities`.`A_Type` AS `A_Type`,`amenities`.`A_Desc` AS `A_Desc` from (`offers` join `amenities` on(`offers`.`A_Name` = `amenities`.`A_Name`))) ;

-- --------------------------------------------------------

--
-- Structure for view `roomswithlocation`
--
DROP TABLE IF EXISTS `roomswithlocation`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `roomswithlocation`  AS  (select `rooms`.`R_ID` AS `R_ID`,`rooms`.`H_email_addr` AS `H_email_addr`,`rooms`.`R_Price` AS `R_Price`,`rooms`.`R_Type` AS `R_Type`,`rooms`.`R_MaxGuest` AS `R_MaxGuest`,`rooms`.`R_Addr` AS `R_Addr`,`rooms`.`R_Status` AS `R_Status`,`locate_on`.`R_City` AS `R_City`,`locate_on`.`R_State` AS `R_State`,`locate_on`.`R_Country` AS `R_Country` from (`rooms` join `locate_on` on(`rooms`.`R_ID` = `locate_on`.`R_ID` and `rooms`.`H_email_addr` = `locate_on`.`H_email_addr`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `amenities`
--
ALTER TABLE `amenities`
  ADD PRIMARY KEY (`A_Name`);

--
-- Indexes for table `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`Email_addr`);

--
-- Indexes for table `host`
--
ALTER TABLE `host`
  ADD PRIMARY KEY (`Email_addr`);

--
-- Indexes for table `locate_on`
--
ALTER TABLE `locate_on`
  ADD PRIMARY KEY (`R_ID`,`H_email_addr`,`R_City`,`R_State`,`R_Country`),
  ADD KEY `Constraint_l_to_r` (`H_email_addr`,`R_ID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`R_City`,`R_State`,`R_Country`);

--
-- Indexes for table `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`R_ID`,`H_email_addr`,`A_Name`),
  ADD KEY `Constraint_off_r` (`H_email_addr`,`R_ID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`P_Num`),
  ADD KEY `Constraint_pa_to_g` (`G_email_addr`),
  ADD KEY `Constraint_pa_to_h` (`H_email_addr`);

--
-- Indexes for table `reserved_by`
--
ALTER TABLE `reserved_by`
  ADD PRIMARY KEY (`G_email_addr`,`R_ID`,`H_email_addr`),
  ADD KEY `Constraint_res_to_r` (`R_ID`,`H_email_addr`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`Re_Num`),
  ADD KEY `Constraint_re_to_g` (`G_email_addr`),
  ADD KEY `Constraint_re_to_h` (`H_email_addr`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`R_ID`,`H_email_addr`),
  ADD KEY `Constraint1` (`H_email_addr`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `locate_on`
--
ALTER TABLE `locate_on`
  ADD CONSTRAINT `Constraint_l_to_r` FOREIGN KEY (`H_email_addr`,`R_ID`) REFERENCES `rooms` (`H_email_addr`, `R_ID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `Constraint_pa_to_g` FOREIGN KEY (`G_email_addr`) REFERENCES `guests` (`Email_addr`),
  ADD CONSTRAINT `Constraint_pa_to_h` FOREIGN KEY (`H_email_addr`) REFERENCES `host` (`Email_addr`);

--
-- Constraints for table `reserved_by`
--
ALTER TABLE `reserved_by`
  ADD CONSTRAINT `Constraint_res_to_g` FOREIGN KEY (`G_email_addr`) REFERENCES `guests` (`Email_addr`),
  ADD CONSTRAINT `Constraint_res_to_r` FOREIGN KEY (`R_ID`,`H_email_addr`) REFERENCES `rooms` (`R_ID`, `H_email_addr`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `Constraint_re_to_g` FOREIGN KEY (`G_email_addr`) REFERENCES `guests` (`Email_addr`),
  ADD CONSTRAINT `Constraint_re_to_h` FOREIGN KEY (`H_email_addr`) REFERENCES `host` (`Email_addr`);

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `Constraint1` FOREIGN KEY (`H_email_addr`) REFERENCES `host` (`Email_addr`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
