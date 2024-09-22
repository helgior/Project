<?php
session_start();

// Функция для входа пользователя
function login($username, $password) {
    // Подключение к базе данных
    $host = 'localhost'; // адрес сервера
    $db   = 'your_database'; // имя базы данных
    $user = 'your_username'; // имя пользователя
    $pass = 'your_password'; // пароль
    $charset = 'utf8mb4';
    
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    
    try {
        $pdo = new PDO($dsn, $user, $pass, $options);
    } catch (PDOException $e) {
        throw new PDOException($e->getMessage(), (int)$e->getCode());
    }
    
    // Подготовка и выполнение SQL-запроса
    $stmt = $pdo->prepare('SELECT * FROM users WHERE username = ?');
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    // Проверка пароля и существования пользователя
    if ($user && password_verify($password, $user['password'])) {
        // Если логин успешен, устанавливаем сессию
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        echo "Вы успешно вошли в систему!";
        // Перенаправление пользователя или выполнение другого действия
    } else {
        echo "Неправильное имя пользователя или пароль.";
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    login($username, $password);
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход в систему</title>
</head>
<body>
    <form action="login.php" method="post">
        <label for="username">Имя пользователя:</label>
        <input type="text" id="username" name="username" required><br>
        
        <label for="password">Пароль:</label>
        <input type="password" id="password" name="password" required><br>
        
        <button type="submit">Войти</button>
    </form>
</body>
</html>