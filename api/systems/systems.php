<?php
function site_url()
{
    return rtrim(getenv('SITE_URL'), '/') . '/';
}

function site_path()
{
    static $_path;

    if (!$_path) {
        $_path = rtrim(parse_url(getenv('SITE_URL'), PHP_URL_PATH), '/');
    }

    return $_path;
}

function img_url()
{
    return rtrim(getenv('SITE_URL'), '/') . '/';
}

function img_path()
{
    return rtrim(getenv('IMG_PATH'), '/') . '/';
}

function dispatch()
{
    $path = $_SERVER['REQUEST_URI'];

    if (getenv('SITE_URL') !== null) {
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

    if ($getUri[0] == 'api') {
        $file = 'routes/' . (isset($getUri[1]) ? $getUri[1] : 'sites') . '.php';

        if (file_exists($file)) {
            return $file;
        }
    } else {

        $file = 'routes/' . $getUri[0] . '.php';

        if (file_exists($file)) {
            return $file;
        }
    }

    return 'routes/sites.php';
}

function partial($view, $locals = null)
{

    if (is_array($locals) && count($locals)) {
        extract($locals, EXTR_SKIP);
    }

    $path = basename($view);
    $view = preg_replace('/' . $path . '$/', "_{$path}", $view);
    $view = "views/{$view}.php";

    if (file_exists($view)) {
        ob_start();
        require $view;
        return ob_get_clean();
    } else {
        error(500, "partial [{$view}] not found");
    }

    return '';
}

function content($value = null)
{
    return stash('$content$', $value);
}

function render($view, $locals = null, $layout = null)
{
    if (is_array($locals) && count($locals)) {
        extract($locals, EXTR_SKIP);
    }

    ob_start();

    include "views/{$view}.php";
}

function successResponse($response, $message)
{
    return $response->withJson([
        'status_code' => 200,
        'data'        => $message,
    ], 200);
}

function unprocessResponse($response, $message)
{
    return $response->withJson([
        'status_code' => 422,
        'errors'      => $message,
    ], 422);
}

function unauthorizedResponse($response, $message)
{
    return $response->withJson([
        'status_code' => 401,
        'errors'      => $message,
    ], 401);
}
