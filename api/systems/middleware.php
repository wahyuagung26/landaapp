<?php

$container        = $app->getContainer();
$container["jwt"] = function ($container) {
    return new StdClass;
};
$container["token"] = "";

$app->add(new \Slim\Middleware\JwtAuthentication([
    "path"     => "/",
    "secret"   => getenv("S_KEY"),
    "rules"    => [
        new \Slim\Middleware\JwtAuthentication\RequestPathRule([
            "path"        => "/",
            "passthrough" => getGlobalMenu(),
        ]),
        new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
            "passthrough" => ["OPTIONS"],
        ]),
    ],
    "callback" => function ($request, $response, $arguments) use ($container) {
        $container["jwt"] = $arguments["decoded"];
    },
    "error"    => function ($request, $response, $arguments) {
        $data["status"]  = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    },
]));

$app->add(function ($request, $response, $next) {
    $token = "";
    if (isset($request->getHeader('Authorization')[0])) {
        $token = str_replace("Bearer ", "", $request->getHeader('Authorization')[0]);
    }
    $this["token"] = $token;

    return $next($request, $response);
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});