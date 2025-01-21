SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Создаем новую таблицу `users` с правильной структурой
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,          -- Идентификатор пользователя
  `login` varchar(255) NOT NULL,             -- Логин (телефон)
  `name` varchar(255) NOT NULL,              -- Имя
  `surname` varchar(255) NOT NULL,           -- Фамилия
  `password` varchar(255) NOT NULL,          -- Хешированный пароль
  `token` varchar(255) DEFAULT NULL,         -- Токен
  `role` enum('user','admin','executor') NOT NULL, -- Роль
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Пример вставки данных
INSERT INTO `users` (`login`, `name`, `surname`, `password`, `token`, `role`) VALUES
('+7 444 444-44-44', 'Иван', 'Иванов', '123456', NULL, 'user'),
('+7 555 555-55-55', 'Олег', 'Орлов', '123456', NULL, 'admin');

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
