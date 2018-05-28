<?php
use Cahkampung\Migrasi;

error_reporting(0);

require 'vendor/autoload.php';
require 'systems/domain.php';
require 'systems/systems.php';

$db         = config('DB');
$db_setting = [
    "host"     => $db['db']['DB_HOST'],
    "username" => $db['db']['DB_USER'],
    "password" => $db['db']['DB_PASS'],
    "database" => $db['db']['DB_NAME'],
    "path"     => "migrasi",
];

$migrasi = new Migrasi($db_setting);
$migrasi->migrasi();
