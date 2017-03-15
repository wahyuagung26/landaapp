<?php
$container = $app->getContainer();

/** Database dependencies */
$container['db'] = function ($container) {
    $database = new Cahkampung\Landadb(Db());
    return $database;
};
