<?php
/** load .env file */
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

return array(
    "paths"        => array(
        "migrations" => "db/migrations",
        "seeds"      => "db/seeds",
    ),
    "environments" => array(
        "default_migration_table" => "migrations",
        "default_database"        => getenv('DB_NAME'),
        "development"             => array(
            "adapter" => "mysql",
            "host"    => getenv('DB_HOST'),
            "name"    => getenv('DB_NAME'),
            "user"    => getenv('DB_USER'),
            "pass"    => getenv('DB_PASS'),
            "charset" => getenv('DB_CHARSET'),
        ),
        "testing"                 => array(
            "adapter" => "sqlite",
            "host"    => null,
            "name"    => "db/database.sqlite",
            "user"    => null,
            "pass"    => null,
            "charset" => getenv('DB_CHARSET'),
        ),
    ),
);
