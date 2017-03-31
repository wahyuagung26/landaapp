<?php
$app->get('/', function () {

});

$app->get('/site/session', function ($request, $response) {
    if (isset($_SESSION['user']['m_roles_id'])) {
        return successResponse($response, $_SESSION);
    }
    return unprocessResponse($response, ['undefined']);
});

$app->post('/site/login', function ($request, $response) {
    $params = $request->getParams();

    $sql = $this->db;

    $model = $sql->select("*")
        ->from("m_user")
        ->where("username", "=", $params['username'])
        ->andWhere("password", "=", sha1($params['password']))
        ->find();

    if (!empty($model)) {
        $_SESSION['user']['id']         = $model->id;
        $_SESSION['user']['username']   = $model->username;
        $_SESSION['user']['nama']       = $model->nama;
        $_SESSION['user']['m_roles_id'] = $model->m_roles_id;

        return successResponse($response, $_SESSION);
    }
    return unprocessResponse($response, ['Authentication Systems gagal, username atau password Anda salah.']);
});

$app->get('/site/logout', function () {
    session_destroy();
});
