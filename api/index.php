<?php
use \Psr\Http\Message\ResponseInterface;
use \Psr\Http\Message\ServerRequestInterface;

session_start();

require 'vendor/autoload.php';

/** load .env file */
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

/* --- System --- */
require 'systems/database.php';
require 'systems/systems.php';
require 'systems/functions.php';

$display = (getenv('DISPLAY_ERRORS') == 'true') ? true : false;

$config = [
    'displayErrorDetails' => $display,
];

$app = new \Slim\App(["settings" => $config]);

require 'systems/dependencies.php';

$app->add(function (ServerRequestInterface $request, ResponseInterface $response, callable $next) {
    return $next($request, $response);
});

/** route to php file */
$file = getUrlFile();
require $file;

$app->run();
