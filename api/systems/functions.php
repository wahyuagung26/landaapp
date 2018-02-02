<?php

function validate($data, $validasi, $custom = [])
{
    if (!empty($custom)) {
        $validasiData = array_merge($validasi, $custom);
    } else {
        $validasiData = $validasi;
    }

    $validate = GUMP::is_valid($data, $validasiData);

    if ($validate === true) {
        return true;
    } else {
        return $validate;
    }
}

function getGlobalMenu()
{
    return explode(',', str_replace(" ", "", getenv('GLOBAL_ROUTES')));
}
