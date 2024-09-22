<?php
// Подключение к базе данных
$servername = "localhost"; // Замените на имя сервера базы данных
$username = "root"; // Замените на имя пользователя базы данных
$password = ""; // Замените на пароль пользователя базы данных
$dbname = "my_database"; // Замените на имя базы данных

// Создайте соединение
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверьте подключение
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Проверка, была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Получение данных из формы
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Валидация данных
    if (empty($username) || empty($email) || empty($password)) {
        $error_message = 'Пожалуйста, заполните все поля.';
    } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Неверный формат email.';
    } else {
        // Проверка, существует ли пользователь с таким email
        $sql = "SELECT * FROM users WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $error_message = 'Пользователь с таким email уже существует.';
        } else {
            // Хеширование пароля
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            // Добавление пользователя в базу данных
            $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sss", $username, $email, $hashed_password);

            if ($stmt->execute()) {
                // Регистрация успешна
                $success_message = 'Регистрация прошла успешно!';
            } else {
                $error_message = 'Произошла ошибка при регистрации.';
            }
        }
    }
}