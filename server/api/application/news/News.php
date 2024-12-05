<?php

class News {
    function __construct($db) {
        $this->db = $db;
    }

    public function getBanners() {
        return $this->db->getBanners();
    }

    public function addBanner($title, $text, $image, $url) {
        return $this->db->addBanner($title, $text, $image, $url);
    }
}