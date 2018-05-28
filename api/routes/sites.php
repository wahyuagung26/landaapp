<?php
$app->get('/', function ($request, $responsep) {

});

$app->get('/site/session', function ($request, $response) {
    if (isset($_SESSION['user']['m_roles_id'])) {
        return successResponse($response, $_SESSION);
    }
    return unprocessResponse($response, ['undefined']);
})->setName('session');

$app->post('/site/login', function ($request, $response) {
    $params = $request->getParams();
    $sql    = $this->db;

    $username = isset($params['username']) ? $params['username'] : '';
    $password = isset($params['password']) ? $params['password'] : '';

    $sql->select("m_user.*, m_roles.akses")
        ->from("m_user")
        ->leftJoin("m_roles", "m_roles.id = m_user.m_roles_id")
        ->where("username", "=", $username)
        ->andWhere("password", "=", sha1($password));
    
    $model = $sql->find();
    if (isset($model->id)) {
        $_SESSION['user']['id']         = $model->id;
        $_SESSION['user']['username']   = $model->username;
        $_SESSION['user']['nama']       = $model->nama;
        $_SESSION['user']['m_roles_id'] = $model->m_roles_id;
        $_SESSION['user']['akses']      = json_decode($model->akses);

        return successResponse($response, $_SESSION);
    }
    return unprocessResponse($response, ['Authentication Systems gagal, username atau password Anda salah.']);
})->setName('session');

$app->get('/site/logout', function () {
    session_destroy();
})->setName('logout');
