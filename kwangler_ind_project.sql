-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 18, 2021 at 06:14 PM
-- Server version: 5.7.33
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kwangler_ind_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `q_id` int(11) NOT NULL,
  `question` varchar(255) DEFAULT NULL,
  `correct_ans` int(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`q_id`, `question`, `correct_ans`) VALUES
(1, 'What will the console print?const foo = function(a,b) { a  =b; return a* (a - b);};const num = foo(2,3);console.log(num);', 1),
(2, 'What will the console print?const arr = [1,2,3,4,5];const obj = {1: arr.length};console.log(obj[1]);', 3);

-- --------------------------------------------------------

--
-- Table structure for table `question_ans`
--

CREATE TABLE `question_ans` (
  `q_id` int(11) DEFAULT NULL,
  `option_num` int(11) DEFAULT NULL,
  `options` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question_ans`
--

INSERT INTO `question_ans` (`q_id`, `option_num`, `options`) VALUES
(1, 1, '10'),
(1, 2, '25'),
(1, 3, '-10'),
(1, 4, '-25'),
(2, 1, 'undefined'),
(2, 2, 'Not defined'),
(2, 3, '5');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`q_id`);

--
-- Indexes for table `question_ans`
--
ALTER TABLE `question_ans`
  ADD KEY `q_id` (`q_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
