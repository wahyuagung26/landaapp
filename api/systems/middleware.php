<?php
$app->add(function ($request, $response, $next) {
    /**
     * Get route name
     */
    $route     = $request->getAttribute('route');
    $routeName = $route->getName();
    /**
     * Set Global route
     */
    $publicRoutesArray = array(
        'login',
        'session',
    );
    /**
     * Check session
     */
    if (!isset($_SESSION['user']['id']) && !in_array($routeName, $publicRoutesArray)) {
        return unauthorizedResponse($response, ['Mohon maaf, anda tidak mempunyai akses']);
    }
    /**
     * Return if isset session
     */
    return $next($request, $response);
});
