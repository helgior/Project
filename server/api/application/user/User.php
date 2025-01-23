<?php

class User
{
    private $db;

    function __construct($db)
    {
        $this->db = $db;
    }

    private function normalizePhone($phone) {
        $phone = preg_replace('/[\s\-\+]/', '', $phone);
        
        if (strlen($phone) === 11 && $phone[0] === '8') {
            $phone = '7' . substr($phone, 1);
        }
        
        if (strlen($phone) === 10 && $phone[0] === '9') {
            $phone = '7' . $phone;
        }
        
        if (strlen($phone) === 11 && $phone[0] === '7') {
            $phone = '+' . $phone;
        }
        
        return $phone;
    }

    public function login($login, $clientHash, $rnd)
    {
        $normalizedPhone = $this->normalizePhone($login);
        error_log("Normalized phone: " . $normalizedPhone);
        
        $user = $this->db->getUserByLogin($normalizedPhone);
        if ($user) {
            $tempHash = md5($user->password . $rnd);
            error_log("Generated hash: " . $tempHash);
            error_log("Client hash: " . $clientHash);
            
            if ($tempHash === $clientHash) {
                $token = md5(rand());
                $this->db->updateToken($user->id, $token);
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'role' => $user->role,
                    'token' => $token
                ];
            }
            return ['error' => 1002]; 
        }
        return ['error' => 1005]; 
    }

    public function registration($login, $password, $name, $surname, $role)
    {
        $normalizedPhone = $this->normalizePhone($login);
        
        $user = $this->db->getUserByLogin($normalizedPhone);
        if ($user) {
            return ['error' => 1001];
        }
        
        $this->db->registration($normalizedPhone, $password, $name, $surname, $role);
        
        $user = $this->db->getUserByLogin($normalizedPhone);
        if ($user) {
            $token = md5(rand());
            $this->db->updateToken($user->id, $token);
            return [
                'id' => $user->id,
                'name' => $user->name,
                'surname' => $user->surname,
                'role' => $user->role,
                'token' => $token
            ];
        }
        return ['error' => 1004];
    }
}