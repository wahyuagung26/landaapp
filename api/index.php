<?php
use \Psr\Http\Message\ResponseInterface;
use \Psr\Http\Message\ServerRequestInterface;

session_start();

# Session lifetime of 3 hours
ini_set('session.gc_maxlifetime', 20 * 60 * 60);
# Enable session garbage collection with a 1% chance of
# running on each session_start()
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);
# Our own session save path; it must be outside the
# default system save path so Debian's cron job doesn't
# try to clean it up. The web server daemon must have
# read/write permissions to this directory.
session_save_path(__DIR__ . '/api/sessions');

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
