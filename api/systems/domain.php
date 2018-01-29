<?php
$subDomain = explode('.', $_SERVER['HTTP_HOST']);
if (isset($subDomain[0]) && $subDomain[0] == 'tes') {
    /** load .env file */
    $dotenv = new Dotenv\Dotenv(__DIR__ . '/config/', "test.env");
    $dotenv->load();
} else {
    /** load .env file */
    $dotenv = new Dotenv\Dotenv(__DIR__ . '/config/', ".env");
    $dotenv->load();
}
