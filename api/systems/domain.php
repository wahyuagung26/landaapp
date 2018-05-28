<?php

function getConfig()
{
    $subDomain = explode('.', $_SERVER['HTTP_HOST']);
    if (isset($subDomain[0]) && $subDomain[0] == 'tes') {
        $path = 'config/test.php';
    } else {
        $path = 'config/config.php';
    }

    return $path;
}
