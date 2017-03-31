<?php
function Db()
{
    return [
        'DB_HOST'        => getenv('DB_HOST'),
        'DB_USER'        => getenv('DB_USER'),
        'DB_PASS'        => getenv('DB_PASS'),
        'DB_NAME'        => getenv('DB_NAME'),
        'DB_CHARSET'     => getenv('DB_CHARSET'),
        'CREATED_USER'   => getenv('CREATED_USER'),
        'CREATED_TIME'   => getenv('CREATED_TIME'),
        'CREATED_TYPE'   => getenv('CREATED_TYPE'),
        'MODIFIED_USER'  => getenv('MODIFIED_USER'),
        'MODIFIED_TIME'  => getenv('MODIFIED_TIME'),
        'MODIFIED_TYPE'  => getenv('MODIFIED_TYPE'),
        'DISPLAY_ERRORS' => getenv('DISPLAY_ERRORS'),
        'USER_ID'        => 0,
    ];
}
