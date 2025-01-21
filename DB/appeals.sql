SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `appeals` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `executor_id` INT DEFAULT NULL,
  `comment` TEXT DEFAULT NULL,
  `status` ENUM('В ожидании', 'В работе', 'Завершено', 'Отменен') NOT NULL,
  `category` ENUM('Сантехника', 'Электрика', 'Функциональность веб-сайта') NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
  FOREIGN KEY (`executor_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Дамп данных таблицы `appeals`
INSERT INTO `appeals` (`id`, `user_id`, `executor_id`, `comment`, `status`, `category`) VALUES
(1, 1, NULL, 'Проблема с проводкой', 'В ожидании', 'Электрика'),
(2, 1, 2, 'Течет кран', 'В работе', 'Сантехника'),
(3, 2, 1, NULL, 'Завершено', 'Функциональность веб-сайта');

COMMIT;
