<?php

# Session lifetime of 20 hours
ini_set('session.gc_maxlifetime', 20 * 60 * 60);
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);
session_save_path(__DIR__ . '/api/sessions');

session_start();

require 'vendor/autoload.php';

/** load .env file */
$dotenv = new Dotenv\Dotenv(__DIR__);

$subDomain = explode('.', $_SERVER['HTTP_HOST']);
if (isset($subDomain[0]) && $subDomain[0] == 'tes') {
    $dotenv->load();
} else {
    $dotenv->load('tes.env');
}

/* --- System --- */
require 'systems/database.php';
require 'systems/systems.php';
require 'systems/functions.php';

$display = (getenv('DISPLAY_ERRORS') == 'true') ? true : false;

$config = [
    'displayErrorDetails'               => $display,
    'determineRouteBeforeAppMiddleware' => true,
];

$app = new \Slim\App(["settings" => $config]);

require 'systems/dependencies.php';
require 'systems/middleware.php';

/** route to php file */
$file = getUrlFile();
require $file;

$app->run();
