<?php
/**
 * Created by PhpStorm.
 * User: darkwolf
 * Date: 26.06.2016
 * Time: 19:51
 */

require_once('php/class/registry.class.php');
require_once('php/class/pagedata.class.php');

class BaseSite extends _registry
{
    protected $pagedata = null;
    protected $path = "";
    public function __construct($path="")
    {
        $this->path = $path;
        $this->pagedata = PageData::getInstance();
        $this->init($path);
    }
    private function __clone() {}

    /*overwrite*/
    protected function init($path) {return $this;}
    public function render() {
        if ($this->pagedata->request_json)
            return $this->renderJSON();
        return $this->renderHTML();
    }
    public function renderHTML() {return $this;}
    public function renderJSON() {return $this;}
}
?>