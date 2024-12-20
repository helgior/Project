<?php
require_once ('db/DB.php');
require_once ('user/User.php');
require_once ('chat/Chat.php');
require_once ('news/News.php');

class Application {
    function __construct() {
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
        $this->news = new News($db);
        $this->db = $db;
    }

    public function login($params) {
        if ($params['login'] && $params['hash'] && $params['rnd']) {
            return $this->user->login($params['login'], $params['hash'], $params['rnd']);
        }
        return ['error' => 242];
    }

    public function logout($params) {
        if ($params['token']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->user->logout($params['token']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function registration($params) {
        if ($params['login'] && $params['password'] && $params['name']) {
            return $this->user->registration($params['login'], $params['password'], $params['name']);
        }
        return ['error' => 242];
    }

    public function sendMessage($params) {
        if ($params['token'] && $params['message']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->sendMessage($user->id, $params['message']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getMessages($params) {
        if ($params['token'] && $params['hash']) {
            $user = $this->user->getUser($params['token']);
            if ($user) {
                return $this->chat->getMessages($params['hash']);
            }
            return ['error' => 705];
        }
        return ['error' => 242];
    }

    public function getBanners($params) {
        return $this->news->getBanners();
    }

    public function getMaps($params) {
        return $this->db->getMaps();
    }

    public function addMap($params) {
        if ($params['streetName'] && $params['coordinates'] && $params['houses']) {
            return $this->db->addMap($params['streetName'], $params['coordinates'], $params['houses']);
        }
        return ['error' => 242];
    }
    public function addBanner($params) {
        if ($params['title'] && $params['image'] && $params['url']) {
            return $this->news->addBanner($params['title'], $params['text'], $params['image'], $params['url']);
        }
        return ['error' => 242];
    }
    public function deleteBanner($params) {
        if ($params['id']) {
            return $this->news->deleteBanner($params['id']);
        }
        return ['error' => 242];
    }
    public function updateBanner($params) {
        if ($params['id'] && isset($params['hidden'])) {
            return $this->news->updateBanner($params['id'], $params['hidden']);
        }
        return ['error' => 242];
    }
    
    public function createRequest($params) {
        if ($params['user_id'] && $params['category_id'] && $params['flat_id'] &&
            $params['status_id'] && $params['description'] && $params['priority'] && $params['date']) {
            return $this->news->createRequest(
            $params['user_id'] && $params['category_id'] && $params['flat_id'] && 
            $params['status_id'] && $params['description'] &&$params['priority'] && $params['date']);
        }
        return ['error' => 341];
    }

    public function getRequest($params) {
        return $this->request->getRequest();
    }

    public function answerToRequest($params) {
        if ($params['id'] && isset($params['status_id'])) {
            return $this->request->answerToRequest($params['id'], $params['status_id']);
        }
        return ['error' => 342];
    }
}
