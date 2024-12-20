<?php

class Request {
    function __construct($db) {
        $this->db = $db;
    }
    public function createRequest($user_id, $category_id, $flat_id, $status_id, $description, $priority, $date) {
        return $this->db->createRequest($user_id, $category_id, $flat_id, $status_id, $description, $priority, $date);
    }

    public function getRequest() {
        return $this->db->getRequest();
    }

    public function answerToRequest($id, $status_id) {
        return $this->db->answerToRequest($id, $status_id);
    }
}

