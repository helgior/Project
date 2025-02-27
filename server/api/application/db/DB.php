<?php
class DB {
    private $pdo;

    function __construct() {
        // Настройки подключения к базе данных
        $host = '127.0.0.1';
        $port = '3306';
        $user = 'root';
        $pass = '';
        $db = 'webjek';
        $connect = "mysql:host=$host;port=$port;dbname=$db;charset=utf8";
        $this->pdo = new PDO($connect, $user, $pass);
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function __destruct() {
        $this->pdo = null;
    }

    private function execute($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        return $sth->execute($params);
    }

    private function query($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetch(PDO::FETCH_OBJ);
    }

    private function queryAll($sql, $params = []) {
        $sth = $this->pdo->prepare($sql);
        $sth->execute($params);
        return $sth->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getBanners() {
        return $this->queryAll("SELECT * FROM banners");
    }

    public function addBanner($title, $text, $image, $url) {
        return $this->execute("INSERT INTO banners (title, text, image, url) VALUES (?, ?, ?, ?)", [$title, $text, $image, $url]);
    }

    public function deleteBanner($id) {
        return $this->execute("DELETE FROM banners WHERE id=?", [$id]);
    }

    public function updateBanner($id, $hidden) {
        return $this->execute("UPDATE banners SET hidden=? WHERE id=?", [$hidden, $id]);
    }

    public function setBannerOrder($id, $priority) {
        return $this->execute("UPDATE banners SET priority=? WHERE id=?", [$priority, $id]);
    }

    public function getNews() {
        return $this->queryAll("SELECT * FROM news ORDER BY date DESC");
    }

    public function addNews($title, $text, $image) {
        return $this->execute("INSERT INTO news (title, text, image) VALUES (?, ?, ?)", [$title, $text, $image]);
    }
}