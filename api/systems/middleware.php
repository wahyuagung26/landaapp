<?php
$app->add(function ($request, $response, $next) {
    /**
     * Get route name
     */
    $route = $request->getAttribute('route');

    $routeName = '';
    if ($route !== null) {
        $routeName = $route->getName();
    }
    /**
     * Set Global route
     */
    $publicRoutesArray = array(
        'login',
        'session',
        'logout',
    );
    /**
     * Check session
     */
    if ((!isset($_SESSION['user']['id']) || !isset($_SESSION['user']['m_roles_id']) || !isset($_SESSION['user']['akses'])) && !in_array($routeName, $publicRoutesArray)) {
        return unauthorizedResponse($response, ['Mohon maaf, anda tidak mempunyai akses']);
    }
    /**
     * Return if isset session
     */
    return $next($request, $response);
});
