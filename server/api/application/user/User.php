<?php

require_once 'DB.php';

class User {
    private $db;

    function __construct($db) {
        $this->db = $db;
    }

    public function getUser($token) {
        return $this->db->getUserByToken($token);
    }

    public function login($login, $hash, $rnd) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            if (md5($user->password . $rnd) === $hash) {
                $token = md5(rand());
                $this->db->updateToken($user->id, $token);
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'role' => $user->role, // Включите роль
                    'token' => $token
                ];
            }
            return ['error' => 1002];
        }
        return ['error' => 1005];
    }

    public function logout($token) {
        $user = $this->db->getUserByToken($token);
        if ($user) {
            $this->db->updateToken($user->id, null);
            return true;
        }
        return ['error' => 1003];
    }

    public function registration($login, $password, $name, $role) {
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            return ['error' => 1001];
        }
        $this->db->registration($login, password_hash($password, PASSWORD_DEFAULT), $name, $role);
        $user = $this->db->getUserByLogin($login);
        if ($user) {
            $token = md5(rand());
            $this->db->updateToken($user->id, $token);
            return [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role, // Включите роль
                'token' => $token
            ];
        }
        return ['error' => 1004];
    }
}
