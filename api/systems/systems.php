<?php
function config($key)
{
    include getConfig();
    return isset($config[$key]) ? $config[$key] : '';
}
function site_url()
{
    return rtrim(config('SITE_URL'), '/') . '/';
}
function site_path()
{
    static $_path;
    if (!$_path) {
        $_path = rtrim(parse_url(config('SITE_URL'), PHP_URL_PATH), '/');
    }
    return $_path;
}
function img_url()
{
    return rtrim(config('SITE_URL'), '/') . '/';
}
function img_path()
{
    return rtrim(config('IMG_PATH'), '/') . '/';
}
function dispatch()
{
    $path = $_SERVER['REQUEST_URI'];
    if (config('SITE_URL') !== null) {
        $path = preg_replace('@^' . preg_quote(site_path()) . '@', '', $path);
    }
    $parts = preg_split('/\?/', $path, -1, PREG_SPLIT_NO_EMPTY);
    $uri = trim($parts[0], '/');
    if ($uri == 'index.php' || $uri == '') {
        $uri = 'site';
    }
    return $uri;
}
function getUrlFile()
{
    $uri    = dispatch();
    $getUri = explode("/", $uri);
    $path   = isset($getUri[0]) ? $getUri[0] : '';
    $action = isset($getUri[1]) ? $getUri[1] : '';
    $action2 = isset($getUri[2]) ? $getUri[2] : '';
    if ($path == 'api') {
        $file = 'routes/' . (isset($action) ? $action : 'sites') . '.php';
        if (file_exists($file)) {
            return $file;
        }
    } elseif ($path == 'acc') {
        $file = 'vendor/cahkampung/landa-acc/routes/' . $action . '.php';
        if (file_exists($file)) {
            return $file;
        }
    } else {
        $file = 'routes/' . $path . '.php';
        if (file_exists($file)) {
            return $file;
        }
    }
    return 'routes/sites.php';
}
function successResponse($response, $message)
{
    return $response->write(json_encode([
        'status_code' => 200,
        'data'        => $message,
    ]))->withStatus(200);
}
function unprocessResponse($response, $message)
{
    return $response->write(json_encode([
        'status_code' => 422,
        'errors'      => $message,
    ]))->withStatus(200);
}
function unauthorizedResponse($response, $message)
{
    return $response->write(json_encode([
        'status_code' => 403,
        'errors'      => $message,
    ]))->withStatus(403);
}
function validate($data, $validasi, $custom = [])
{
    if (!empty($custom)) {
        $validasiData = array_merge($validasi, $custom);
    } else {
        $validasiData = $validasi;
    }
    $lang = 'en';
    $gump = new GUMP($lang);
    $validate = $gump->is_valid($data, $validasiData);
    if ($validate === true) {
        return true;
    } else {
        return $validate;
    }
}
function get_string_between($string, $start, $end)
{
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) {
        return '';
    }
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}
