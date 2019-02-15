<?php
$app->get('/', function ($request, $responsep) {
});
/**
 * Ambil session user
 */
$app->get('/site/session', function ($request, $response) {
    if (isset($_SESSION['user']['m_roles_id'])) {
        return successResponse($response, $_SESSION);
    }
    return unprocessResponse($response, ['undefined']);
})->setName('session');
/**
 * Proses login
 */
$app->post('/site/login', function ($request, $response) {
    $params   = $request->getParams();
    $sql      = $this->db;
    $username = isset($params['username']) ? $params['username'] : '';
    $password = isset($params['password']) ? $params['password'] : '';
    /**
     * Login Admin
     */
    $sql->select("m_user.*, m_roles.akses")
        ->from("m_user")
        ->leftJoin("m_roles", "m_roles.id = m_user.m_roles_id")
        ->where("username", "=", $username)
        ->andWhere("password", "=", sha1($password));
    $model = $sql->find();
    /**
     * Simpan user ke dalam session
     */
    if (isset($model->id)) {
        $_SESSION['user']['id']         = $model->id;
        $_SESSION['user']['username']   = $model->username;
        $_SESSION['user']['nama']       = $model->nama;
        $_SESSION['user']['m_roles_id'] = $model->m_roles_id;
        $_SESSION['user']['akses']      = json_decode($model->akses);
        return successResponse($response, $_SESSION);
    }
    return unprocessResponse($response, ['Authentication Systems gagal, username atau password Anda salah.']);
})->setName('login');
/**
 * Hapus semua session
 */
$app->get('/site/logout', function ($request, $response) {
    session_destroy();
    return successResponse($response, []);
})->setName('logout');
