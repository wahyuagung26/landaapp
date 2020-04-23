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
function get_client_ip()
{
    $ipaddress = '';
    if (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
    } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
        $ipaddress = $_SERVER['HTTP_FORWARDED'];
    } elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
    } else {
        $ipaddress = 'UNKNOWN';
    }

    return $ipaddress;
}
function sendMessage($messaggio)
{
    $token      = "851330485:AAHnV7HgvRCYouoKM_EZN6Pn4J69psjO_bk";
    $chat_id    = config("TELEGRAM_CHANNEL");
    $result     = '';
    if (!empty($chat_id)) {
        $url        = "https://api.telegram.org/bot".$token."/sendMessage?chat_id=". $chat_id."&text=".urlencode($messaggio)."&parse_mode=HTML";
        $ch         = curl_init();
        $optArray   = [CURLOPT_URL => $url, CURLOPT_RETURNTRANSFER => true];
        curl_setopt_array($ch, $optArray);
        $result = curl_exec($ch);
        curl_close($ch);
    }
    return $result;
}
function errorHandler($error_level, $error_message, $error_file, $error_line, $error_context)
{
    $error = "lvl: " . $error_level . " | msg:" . $error_message . " | file:" . $error_file . " | ln:" . $error_line;
    switch ($error_level) {
        case E_ERROR:
        case E_CORE_ERROR:
        case E_COMPILE_ERROR:
        case E_PARSE:
            mylog($error, "fatal");
            break;
        case E_USER_ERROR:
        case E_RECOVERABLE_ERROR:
            mylog($error, "error");
            break;
        case E_WARNING:
        case E_CORE_WARNING:
        case E_COMPILE_WARNING:
        case E_USER_WARNING:
            mylog($error, "warn");
            break;
        case E_NOTICE:
        case E_USER_NOTICE:
            mylog($error, "info");
            break;
        case E_STRICT:
            mylog($error, "debug");
            break;
        default:
            mylog($error, "warn");
    }
}
function shutdownHandler()
{
    $lasterror = error_get_last();
    switch ($lasterror['type']) {
    case E_ERROR:
    case E_CORE_ERROR:
    case E_COMPILE_ERROR:
    case E_USER_ERROR:
    case E_RECOVERABLE_ERROR:
    case E_CORE_WARNING:
    case E_COMPILE_WARNING:
    case E_PARSE:
        $error = "[SHUTDOWN] lvl:" . $lasterror['type'] . " \nMessage:" . $lasterror['message'] . " \nFile:" . $lasterror['file'] . " line:" . $lasterror['line'];
        mylog($error, "fatal");
    }
}
function mylog($error, $errlvl)
{
    $username = isset($_SESSION['user']['username']) ? $_SESSION['user']['username'] : 'Not found';
    $link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] .  $_SERVER['REQUEST_URI'];
    $text = "<pre>";
    $text .= date("d-m-Y H:i:s"). " \n \n";
    $text .= "Url : ". $link. "\n \n";
    $text .= "IP : ".get_client_ip()." | User : ".$username." \n \n";
    $text .= $error." </pre>";
    sendMessage($text);
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
