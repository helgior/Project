<?php

class Appeals
{
    private $db;

    function __construct($db)
    {
        $this->db = $db;
    }

    public function getAppeals()
    {
        return $this->db->getAppeals();
    }

    public function addAppeal($userId, $category, $comment = null)
    {
        return $this->db->addAppeal($userId, $category, $comment);
    }

    public function updateAppealStatus($id, $status)
    {
        return $this->db->updateAppealStatus($id, $status);
    }

    public function assignExecutor($id, $executorId)
    {
        return $this->db->assignExecutor($id, $executorId);
    }

    public function deleteAppeal($id)
    {
        return $this->db->deleteAppeal($id);
    }
}
