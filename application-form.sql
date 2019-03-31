-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2019-03-30 13:32:17
-- 服务器版本： 10.1.37-MariaDB
-- PHP 版本： 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `application-form`
--
CREATE DATABASE IF NOT EXISTS `application-form` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `application-form`;

-- --------------------------------------------------------

--
-- 表的结构 `college`
--

CREATE TABLE `college` (
  `id` int(11) NOT NULL,
  `college` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `college`
--

INSERT INTO `college` (`id`, `college`) VALUES
(1, '建筑学院'),
(2, '土木与交通学院'),
(3, '电力学院'),
(4, '电子与信息学院'),
(5, '自动化科学与工程学院'),
(6, '材料科学与工程学院'),
(7, '化学与化工学院'),
(8, '轻工科学与工程学院'),
(9, '食品科学与工程学院'),
(10, '数学学院'),
(11, '物理与光电学院'),
(12, '工商管理学院'),
(13, '公共管理学院'),
(14, '外国语学院'),
(15, '体育学院'),
(16, '马克思主义学院'),
(17, '计算机科学与工程学院'),
(18, '软件学院'),
(19, '环境与能源学院'),
(20, '生物科学与工程学院'),
(21, '新闻与传播学院'),
(22, '设计学院'),
(23, '法学院'),
(24, '经济与贸易学院'),
(25, '艺术学院'),
(26, '医学院'),
(27, '国际教育学院'),
(28, '生物医学科学与工程学院');

-- --------------------------------------------------------

--
-- 表的结构 `depart`
--

CREATE TABLE `depart` (
  `id` int(11) NOT NULL,
  `depart` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `depart`
--

INSERT INTO `depart` (`id`, `depart`) VALUES
(1, '技术部-代码组'),
(2, '技术部-设计组'),
(3, '技术部'),
(4, '策划推广部'),
(5, '编辑部-原创写手'),
(6, '编辑部-摄影'),
(7, '编辑部-可视化设计'),
(8, '视觉设计部'),
(9, '视频部-策划导演'),
(10, '视频部-摄影摄像'),
(11, '视频部-剪辑特效'),
(12, '外联部'),
(13, '节目部-国语组'),
(14, '节目部-英语组'),
(15, '节目部-粤语组'),
(16, '人力资源部'),
(17, '综合管理部-行政管理'),
(18, '综合管理部-物资财政'),
(19, '综合管理部-撰文记者'),
(20, '综合管理部-摄影记者'),
(21, '产品运营部');

-- --------------------------------------------------------

--
-- 表的结构 `info`
--

CREATE TABLE `info` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `sex` char(2) NOT NULL,
  `college` varchar(20) NOT NULL,
  `dorm` varchar(15) NOT NULL,
  `grade` varchar(10) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `first` char(10) NOT NULL,
  `second` char(10) NOT NULL,
  `adjust` char(2) NOT NULL,
  `intro` text,
  `firstD` char(10) NOT NULL,
  `secondD` char(10) NOT NULL,
  `position` char(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `info`
--


--
-- 转储表的索引
--

--
-- 表的索引 `college`
--
ALTER TABLE `college`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `depart`
--
ALTER TABLE `depart`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `info`
--
ALTER TABLE `info`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `college`
--
ALTER TABLE `college`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- 使用表AUTO_INCREMENT `depart`
--
ALTER TABLE `depart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 使用表AUTO_INCREMENT `info`
--
ALTER TABLE `info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
