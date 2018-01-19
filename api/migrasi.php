<?php
use Cahkampung\Migrasi;

error_reporting(0);

require 'vendor/autoload.php';

/** load .env file */
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

$db_setting = [
    "host"     => getenv('DB_HOST'),
    "username" => getenv('DB_USER'),
    "password" => getenv('DB_PASS'),
    "database" => getenv('DB_NAME'),
    "path"     => "migrasi",
];

$migrasi = new Migrasi($db_setting);

$migrasi->migrasi();
