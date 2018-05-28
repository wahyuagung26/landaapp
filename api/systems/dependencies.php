<?php
$container = $app->getContainer();

/** Database dependencies */
$container['db'] = function ($container) {
    $db       = config('DB');
    $database = new Cahkampung\Landadb($db['db']);
    return $database;
};
