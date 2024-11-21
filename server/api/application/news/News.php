<?php

class News {
    function __construct($db) {
        $this->db = $db;
    }

    public function getBanners() {
        return $this->db->getBanners();
    }

}