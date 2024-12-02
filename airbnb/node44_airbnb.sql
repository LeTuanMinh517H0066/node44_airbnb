-- -------------------------------------------------------------
-- TablePlus 6.2.0(576)
--
-- https://tableplus.com/
--
-- Database: node44_airbnb
-- Generation Time: 2024-12-03 00:09:42.7510
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `bookings`;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `checkin` datetime DEFAULT NULL,
  `checkout` datetime DEFAULT NULL,
  `regis_num` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `comment` text,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `locate_name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) DEFAULT NULL,
  `guests` int DEFAULT NULL,
  `bed_rooms` int DEFAULT NULL,
  `beds` int DEFAULT NULL,
  `bath_rooms` int DEFAULT NULL,
  `description` text,
  `price` int DEFAULT NULL,
  `washing` tinyint(1) DEFAULT '0',
  `iron` tinyint(1) DEFAULT '0',
  `tivi` tinyint(1) DEFAULT '0',
  `cooler` tinyint(1) DEFAULT '0',
  `wifi` tinyint(1) DEFAULT '0',
  `kitchen` tinyint(1) DEFAULT '0',
  `parking` tinyint(1) DEFAULT '0',
  `pool` tinyint(1) DEFAULT '0',
  `image` varchar(255) DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `locate_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `locate_id` (`locate_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`locate_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `role` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `bookings` (`id`, `room_id`, `user_id`, `checkin`, `checkout`, `regis_num`) VALUES
(1, 1, 1, '2024-11-01 14:00:00', '2024-11-05 11:00:00', 1001),
(2, 2, 2, '2024-11-02 15:00:00', '2024-11-07 12:00:00', 1002),
(3, 3, 3, '2024-11-05 16:00:00', '2024-11-12 10:00:00', 1003),
(4, 4, 4, '2024-11-06 14:30:00', '2024-11-09 11:30:00', 1004),
(5, 5, 5, '2024-11-08 15:00:00', '2024-11-10 12:00:00', 1005),
(6, 6, 6, '2024-11-09 13:00:00', '2024-11-15 12:00:00', 1006),
(7, 7, 7, '2024-11-11 16:00:00', '2024-11-14 10:00:00', 1007),
(8, 8, 8, '2024-11-12 17:00:00', '2024-11-16 11:00:00', 1008),
(9, 9, 9, '2024-11-13 14:00:00', '2024-11-17 12:00:00', 1009),
(10, 10, 10, '2024-11-14 16:30:00', '2024-11-19 11:00:00', 1010),
(11, 3, 11, '2024-11-30 16:39:00', '2024-11-30 16:39:00', 12);

INSERT INTO `comments` (`id`, `room_id`, `user_id`, `comment`, `date`) VALUES
(11, 1, 1, 'Great studio apartment for a short stay. Everything was as described, and the location is perfect for exploring the city.', '2024-10-01 14:30:00'),
(13, 3, 3, 'Absolutely loved the beachfront villa. The private pool and beach access made our stay unforgettable. Will book again.', '2024-10-05 10:00:00'),
(14, 4, 4, 'The loft was stylish and well-located, but it could use a bit more soundproofing. Otherwise, great for city explorers.', '2024-10-06 11:45:00'),
(15, 5, 5, 'The mountain retreat was exactly what we needed. Peaceful, quiet, and close to hiking trails. Perfect for nature lovers.', '2024-10-07 09:30:00'),
(16, 6, 6, 'This apartment was very modern and comfortable. It had all the amenities we needed for our stay. Would stay again!', '2024-10-08 16:20:00'),
(17, 7, 7, 'The countryside cottage was a lovely experience. Very cozy and quiet. Ideal for a family getaway.', '2024-10-09 13:50:00'),
(18, 8, 8, 'This suburban home had everything we needed for our family vacation. Spacious, with a big backyard and great facilities.', '2024-10-10 12:10:00'),
(19, 9, 9, 'A very practical condo in the heart of downtown. It’s perfect for a short business trip or quick stay.', '2024-10-12 15:00:00'),
(20, 10, 10, 'The rustic log cabin was amazing! A perfect getaway with beautiful surroundings and a warm, homely feel. Would recommend to anyone!', '2024-10-13 17:25:00'),
(21, 1, 2, 'check', '2024-05-10 10:00:00'),
(22, 2, 11, 'check 1223', '2014-04-11 13:00:00'),
(23, 3, 11, 'checkout', '2024-10-11 13:00:00');

INSERT INTO `locations` (`id`, `locate_name`, `city`, `country`, `image`) VALUES
(1, 'test update 1', 'update 2', 'update 3', 'public/imgs/locations/1733140062338.png'),
(2, 'New York Downtown', 'New York', 'United States', 'new_york_downtown.jpg'),
(3, 'Tokyo Shibuya', 'Tokyo', 'Japan', 'tokyo_shibuya.jpg'),
(4, 'Sydney Harbour', 'Sydney', 'Australia', 'sydney_harbour.jpg'),
(5, 'London City', 'London', 'United Kingdom', 'london_city.jpg'),
(6, 'Barcelona Beachfront', 'Barcelona', 'Spain', 'barcelona_beachfront.jpg'),
(7, 'Dubai Marina', 'Dubai', 'United Arab Emirates', 'dubai_marina.jpg'),
(8, 'Rome Historic Centre', 'Rome', 'Italy', 'rome_historic_centre.jpg'),
(9, 'Los Angeles Downtown', 'Los Angeles', 'United States', 'los_angeles_downtown.jpg'),
(10, 'Cape Town Waterfront', 'Cape Town', 'South Africa', 'cape_town_waterfront.jpg'),
(11, 'locate 1', 'city 1', 'country 1', 'public/imgs/locations/1733041410348.png');

INSERT INTO `rooms` (`id`, `room_name`, `guests`, `bed_rooms`, `beds`, `bath_rooms`, `description`, `price`, `washing`, `iron`, `tivi`, `cooler`, `wifi`, `kitchen`, `parking`, `pool`, `image`, `user_id`, `locate_id`) VALUES
(1, 'Cozy Studio Apartment', 2, 1, 1, 1, 'A small and cozy studio apartment perfect for a couple or solo traveler. Fully equipped with modern amenities.', 80, 1, 1, 1, 1, 1, 0, 1, 0, 'cozy_studio.jpg', 1, 3),
(2, 'Luxury Penthouse', 6, 3, 3, 2, 'A spacious and luxurious penthouse with stunning city views, 3 bedrooms, and all modern amenities.', 350, 1, 1, 1, 1, 1, 1, 1, 1, 'luxury_penthouse.jpg', 2, 1),
(3, 'Beachfront Villa', 8, 4, 4, 3, 'A beautiful villa located right on the beach with 4 bedrooms, a private pool, and outdoor seating.', 500, 1, 1, 1, 1, 1, 1, 0, 1, 'beachfront_villa.jpg', 3, 2),
(4, 'Urban Loft', 4, 2, 2, 2, 'An industrial-style loft in the heart of the city, perfect for friends or family.', 200, 1, 0, 1, 1, 1, 1, 1, 0, 'urban_loft.jpg', 4, 4),
(5, 'Mountain Retreat', 2, 1, 1, 1, 'A peaceful mountain retreat with scenic views, perfect for a weekend getaway. Includes hiking trails.', 120, 1, 0, 1, 1, 1, 0, 1, 0, 'mountain_retreat.jpg', 5, 5),
(6, 'Modern Apartment', 4, 2, 2, 2, 'A stylish modern apartment with two bedrooms and an open kitchen, located in the downtown area.', 150, 1, 1, 1, 0, 1, 1, 1, 0, 'modern_apartment.jpg', 6, 3),
(7, 'Countryside Cottage', 4, 2, 2, 1, 'A charming countryside cottage with a large garden and a peaceful atmosphere, ideal for family vacations.', 110, 0, 0, 0, 1, 1, 0, 1, 0, 'countryside_cottage.jpg', 7, 6),
(8, 'Suburban Home', 6, 3, 3, 2, 'A family-friendly suburban home with a large backyard, garage, and close proximity to schools and parks.', 220, 1, 1, 1, 1, 1, 1, 1, 1, 'suburban_home.jpg', 8, 2),
(9, 'Downtown Condo', 2, 1, 1, 1, 'A small and functional downtown condo perfect for business trips or a short stay.', 100, 0, 1, 1, 1, 1, 0, 1, 0, 'downtown_condo.jpg', 9, 1),
(10, 'Rustic Log Cabin', 5, 3, 3, 2, 'A cozy log cabin in a rural setting, perfect for nature lovers and outdoor enthusiasts. Includes a fireplace.', 180, 1, 0, 0, 1, 1, 0, 1, 1, 'rustic_log_cabin.jpg', 10, 5),
(11, 'check name', 2, 2, 2, 2, 'check descrip', 1000000, 1, 1, 1, 0, 1, 1, 1, 1, 'string', 11, 3);

INSERT INTO `users` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123', '555-1234', '1990-04-15', 1, 1),
(2, 'Jane Smith', 'jane.smith@example.com', 'securepass456', '555-5678', '1985-08-22', 2, 2),
(3, 'update name', 'example@gmail.com', 'mypassword789', '0991123', 'string', 1, 1),
(4, 'Bob Williams', 'bob.williams@example.com', 'bobsecurepass', '555-1357', '1988-03-10', 1, 1),
(5, 'Mary Davis', 'mary.davis@example.com', 'passwordMary!2024', '555-2468', '1995-06-18', 2, 2),
(6, 'James Brown', 'james.brown@example.com', 'James2023@pass', '555-9753', '1991-11-25', 1, 2),
(7, 'Patricia Taylor', 'patricia.taylor@example.com', 'pattysecure@789', '555-8642', '1990-01-05', 2, 1),
(8, 'Michael Anderson', 'michael.anderson@example.com', 'michaelPass12', '555-5432', '1983-09-14', 1, 2),
(9, 'Emily Thomas', 'emily.thomas@example.com', 'Emily@1234', '555-6789', '1994-05-09', 2, 2),
(10, 'David Martinez', 'david.martinez@example.com', 'David#2024', '555-4321', '1986-07-27', 1, 1),
(11, 'Minh 1', 'ltuanminh049@gmail.com', '$2b$10$lzEc6X3Bpx7rwdCXBp/zOusuT7c0S6YGta1m0kQ3MPn1M4pFBcE..', '0913205175', '2024-10-11', 1, 2),
(12, 'Admin', 'admin@gmail.com', '$2b$10$lzEc6X3Bpx7rwdCXBp/zOusuT7c0S6YGta1m0kQ3MPn1M4pFBcE..', '0913205175', '2024-10-11', 1, 3),
(13, 'Le Tuan Minh', '2018minh@gmail.com', '$2b$10$J.YNzIE82Ahim/dFDoR79uWvTxVWjhiOsj7CeQOxoFESOuTUt6gXi', '0913205175', '2024-06-10', 1, 1);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;