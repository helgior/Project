-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Ноя 26 2024 г., 08:03
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `webjek`
--

-- --------------------------------------------------------

--
-- Структура таблицы `maps`
--

CREATE TABLE `maps` (
  `id` int NOT NULL,
  `street_name` varchar(255) NOT NULL,
  `coordinates` json NOT NULL,
  `houses` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `maps`
--

INSERT INTO `maps` (`id`, `street_name`, `coordinates`, `houses`) VALUES
(1, 'Садовая', '[[\"56.79167789744446\", \"53.38284215572648\"], [\"56.7867964023117\", \"53.38284215572648\"], [\"56.78206373426247\", \"53.38266027031713\"]]', '[1, 1, 1]'),
(2, 'Мира', '[[\"56.78198900313693\", \"53.38247838490778\"], [\"56.78261807462487\", \"53.37623553881286\"], [\"56.78405740436429\", \"53.367957514805305\"]]', '[1, 1, 0]'),
(3, 'Рябиновая', '[[\"56.785253913546235\", \"53.37473188237868\"], [\"56.782869527763026\", \"53.37425704352548\"], [\"56.781083306769645\", \"53.37246848384508\"]]', '[0, 0, 0]');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `maps`
--
ALTER TABLE `maps`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `maps`
--
ALTER TABLE `maps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
