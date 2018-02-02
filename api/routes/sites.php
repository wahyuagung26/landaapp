<?php
$app->get('/tes', function ($request, $responsep) {
    echo json_encode(getGlobalMenu());
    echo '<br>';
    echo $this->token . '<br>';
    echo '<br>';
    echo '<table><tr><td>No</td></tr></table>';
});

$app->get('/site/session', function ($request, $response) {
    if (!empty($this->token)) {
        $db = $this->db;
        $db->select("id, username, nama, m_roles_id, akses")
            ->from("m_user")
            ->where("token_key", "=", $this->token);
        $model = $db->find();

        $model->akses = json_decode($model->akses);
        return successResponse($response, $model);
    }
    return unprocessResponse($response, ['undefined']);
})->setName('session');

$app->post('/site/login', function ($request, $response) {
    $params = $request->getParams();
    $sql    = $this->db;

    $username = isset($params['username']) ? $params['username'] : '';
    $password = isset($params['password']) ? $params['password'] : '';

    $model = $sql->select("m_user.*, m_roles.akses")
        ->from("m_user")
        ->leftJoin("m_roles", "m_roles.id = m_user.m_roles_id")
        ->where("username", "=", $username)
        ->andWhere("password", "=", sha1($password))
        ->find();

    if (!empty($model)) {
        $requested_scopes = $request->getParsedBody() ?: [];

        /** Generate token baru */
        $now     = new DateTime();
        $future  = new DateTime("+20 hours");
        $server  = $request->getServerParams();
        $jti     = md5(sha1(random_bytes(16)));
        $payload = [
            "iat" => $now->getTimeStamp(),
            "exp" => $future->getTimeStamp(),
            "jti" => $jti,
            "sub" => isset($server["PHP_AUTH_USER"]) ? $server["PHP_AUTH_USER"] : '',
        ];
        $secret  = getenv("S_KEY");
        $token   = Firebase\JWT\JWT::encode($payload, $secret, "HS256");
        $expires = $future->getTimeStamp();

        /** Simpan token ke tabel user */
        $sql->update("m_user", ["token_key" => $token, "token_expires" => $expires], ["id" => $model->id]);

        $data["token"]              = $token;
        $data["expires"]            = $expires;
        $data['user']['id']         = $model->id;
        $data['user']['username']   = $model->username;
        $data['user']['nama']       = $model->nama;
        $data['user']['m_roles_id'] = $model->m_roles_id;
        $data['user']['akses']      = json_decode($model->akses);

        return successResponse($response, $data);
    }
    return unprocessResponse($response, ['Authentication Systems gagal, username atau password Anda salah.']);
})->setName('session');

$app->get('/site/logout', function () {
    session_destroy();
})->setName('logout');
