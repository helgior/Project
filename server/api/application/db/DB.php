<?php
class DB
{
    private $pdo;

    function __construct()
    {
        // MySQL
        $host = '127.0.0.1';
        $port = '3333';
        $user = 'root';
        $pass = '';
        $db = 'webjek';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);

        // Установите режим ошибок PDO на исключения
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function __destruct()
    {
        $this->pdo = null;
    }

    // Выполнить запрос без возвращения данных
    private function execute($sql, $params = [])
    {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    // Получение ОДНОЙ записи
    private function query($sql, $params = [])
    {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    // Получение НЕСКОЛЬКИХ записей
    private function queryAll($sql, $params = [])
    {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getUserByLogin($login)
    {
        $user = $this->query("SELECT * FROM users WHERE login=?", [$login]);
        return $user;
    }

    public function getUserByToken($token)
    {
        return $this->query("SELECT * FROM users WHERE token=?", [$token]);
    }

    public function updateToken($userId, $token)
    {
        $this->execute("UPDATE users SET token=? WHERE id=?", [$token, $userId]);
    }

    public function registration($login, $password, $name, $surname, $role)
    {
        $allowedRoles = ['user', 'admin', 'executor'];
        if (!in_array($role, $allowedRoles)) {
            throw new Exception('Invalid role');
        }
        $this->execute("INSERT INTO users (login, password, name, surname, role) VALUES (?, ?, ?, ?, ?)", [$login, $password, $name, $surname, $role]);
    }

    public function getMaps()
    {
        return $this->queryAll("SELECT * FROM maps");
    }

    public function addMap($streetName, $coordinates, $houses)
    {
        $this->execute("INSERT INTO maps (street_name, coordinates, houses) VALUES (?, ?, ?)", [$streetName, json_encode($coordinates), json_encode($houses)]);
    }
    public function getBanners()
    {
        return $this->queryAll("SELECT * FROM banners");
    }

    public function addBanner($title, $text, $image, $url)
    {
        return $this->execute("INSERT INTO banners (title, text, image, url) VALUES (?, ?, ?, ?)", [$title, $text, $image, $url]);
    }
    public function deleteBanner($id)
    {
        return $this->execute("DELETE FROM banners WHERE id=?", [$id]);
    }
    public function updateBanner($id, $hidden)
    {
        return $this->execute("UPDATE banners SET hidden=? WHERE id=?", [$hidden, $id]);
    }
    public function setBannerOrder($id, $priority)
    {
        return $this->execute("UPDATE banners SET priority=? WHERE id=?", [$priority, $id]);
    }
    public function getNews()
    {
        return $this->queryAll("SELECT * FROM news ORDER BY date DESC");
    }

    public function addNews($title, $text, $image)
    {
        return $this->execute("INSERT INTO news (title, text, image) VALUES (?, ?, ?)", [$title, $text, $image]);
    }

    public function deleteAppeal($id)
    {
        $sql = "DELETE FROM appeals WHERE id = ?";
        return $this->execute($sql, [$id]);
    }

    public function addAppeal($userId, $category, $comment = null)
    {
        $sql = "INSERT INTO appeals (user_id, category, comment, status) VALUES (?, ?, ?, 'В ожидании')";
        return $this->execute($sql, [$userId, $category, $comment]);
    }

    public function getAppeals()
    {
        $query = "SELECT 
                a.id, 
                a.user_id, 
                a.executor_id, 
                a.comment, 
                a.status, 
                a.category,
                u.name as user_name, 
                u.surname as user_surname,
                e.name as executor_name,
                e.surname as executor_surname
              FROM appeals a
              JOIN users u ON a.user_id = u.id
              LEFT JOIN users e ON a.executor_id = e.id
              ORDER BY a.id DESC";

        $sth = $this->pdo->prepare($query);
        $sth->execute();
        $result = $sth->fetchAll(PDO::FETCH_ASSOC);

        $appeals = [];
        foreach ($result as $row) {
            $appeals[] = [
                'id' => (int) $row['id'],
                'user' => [
                    'id' => (int) $row['user_id'],
                    'name' => $row['user_name'],
                    'surname' => $row['user_surname']
                ],
                'executorId' => $row['executor_id'] ? (int) $row['executor_id'] : null,
                'comment' => $row['comment'],
                'status' => $row['status'],
                'category' => $row['category']
            ];
        }

        return $appeals;
    }
}
