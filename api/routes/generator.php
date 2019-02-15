<?php
/**
 * Validasi
 * @param  array $data
 * @param  array $custom
 * @return array
 */
function validasi($data, $custom = array())
{
    $validasi = array(
        "path"    => "required",
        "table"   => "required",
        "filePhp" => "required",
    );
    GUMP::set_field_name("m_roles_id", "Hak Akses");
    $cek = validate($data, $validasi, $custom);
    return $cek;
}
/**
 * Ambil semua tabel
 */
$app->get('/generator/getTabel', function ($request, $response) {
    $db    = $this->db;
    $tabel = $db->findAll("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_TYPE='BASE TABLE' and TABLE_SCHEMA = '" . config('DB')['db']['DB_NAME'] . "'");
    $arr   = [];
    foreach ($tabel as $key => $value) {
        $arr[$value->TABLE_NAME] = $value->TABLE_NAME;
    }

    return successResponse($response, $arr);
});
/**
 * Proses generate
 */
$app->post('/generator/generate', function ($request, $response) {
    $params   = $request->getParams();
    $validasi = validasi($params);
    if ($validasi === true) {
        $table   = $params['table'];
        $path    = $params['path'];
        $filePhp = $params['filePhp'];

        $htmlJsPath = '../' . $path;
        $phpPath    = 'routes/' . $filePhp.'.php';
        if (file_exists($htmlJsPath)) {
            return unprocessResponse($response, ["Folder $path tidak kosong, untuk keamanan file anda harap masukkan path yang lain !"]);
        }
        if (file_exists($phpPath)) {
            return unprocessResponse($response, ["File $filePhp.php sudah ada, untuk keamanan file anda harap masukkan nama yang lain !"]);
        }

        $db = $this->db;

        /**
         * CEK TABEL DETAIL
         */
        $cekDetail    = $db->find("SELECT TABLE_NAME FROM information_schema.tables WHERE table_schema = '" . config('DB')['db']['DB_NAME'] . "' AND table_name = '" . $table . "_det' LIMIT 1;");
        $listFieldDet = [];
        $fieldRelasi  = $table . '_id';
        if (isset($cekDetail->TABLE_NAME) && !empty($cekDetail->TABLE_NAME)) {
            $listFieldDet = $db->findAll("DESCRIBE $cekDetail->TABLE_NAME");
            foreach ($listFieldDet as $key => $value) {
                $value->maks = get_string_between($value->Type, "(", ")");
                if ($value->maks == "") {
                    $value->maks = "255";
                }
            }
        }

        $listField = $db->findAll("DESCRIBE $table");

        $ctrl       = str_replace("_", "", $table);
        $tableName  = str_replace("_", " ", $table);
        $firstField = '';
        $is_deleted = false;
        foreach ($listField as $key => $value) {
            $value->nama      = ucwords($value->Field);
            $value->showField = "{{ row." . $value->Field . " }}";
            $value->maks      = get_string_between($value->Type, "(", ")");
            if ($value->maks == "") {
                $value->maks = "255";
            }
            if ($key == 1) {
                $firstField = $value->Field;
            }
            if ($value->Field == 'is_deleted') {
                $is_deleted = true;
            }
        }

        $viewHtml = $this->view->fetch('generator/html.html', [
            "ctrl"         => $ctrl,
            "field"        => $listField,
            "is_deleted"   => $is_deleted,
            "listFieldDet" => $listFieldDet,
            "fieldRelasi"  => $fieldRelasi,
        ]);

        $viewJs = $this->view->fetch('generator/js.html', [
            "ctrl"         => $ctrl,
            "apiUrl"       => $filePhp,
            "firstField"   => $firstField,
            "is_deleted"   => $is_deleted,
            "listFieldDet" => $listFieldDet,
            "fieldRelasi"  => $fieldRelasi,
        ]);

        $viewPhp = $this->view->fetch('generator/php.html', [
            "ctrl"         => $ctrl,
            "apiUrl"       => $filePhp,
            "tableName"    => $tableName,
            "table"        => $table,
            "field"        => $listField,
            "is_deleted"   => $is_deleted,
            "listFieldDet" => $listFieldDet,
            "fieldRelasi"  => $fieldRelasi,
        ]);

        $htmlJsPath = '../' . $path;
        if (file_exists($htmlJsPath)) {
            fopen($htmlJsPath . '/index.html', 'w');
            file_put_contents($htmlJsPath . '/index.html', $viewHtml);
        } else {
            mkdir($htmlJsPath);
            fopen($htmlJsPath . '/index.html', 'w');
            file_put_contents($htmlJsPath . '/index.html', $viewHtml);
        }

        if (file_exists($htmlJsPath)) {
            fopen($htmlJsPath . '/index.js', 'w');
            file_put_contents($htmlJsPath . '/index.js', $viewJs);
        } else {
            mkdir($htmlJsPath);
            fopen($htmlJsPath . '/index.js', 'w');
            file_put_contents($htmlJsPath . '/index.js', $viewJs);
        }

        $phpPath = 'routes';
        if (file_exists($phpPath)) {
            fopen($phpPath . '/' . $filePhp . '.php', 'w');
            file_put_contents($phpPath . '/' . $filePhp . '.php', '<?php' . $viewPhp);
        } else {
            mkdir($phpPath);
            fopen($phpPath . '/' . $filePhp . '.php', 'w');
            file_put_contents($phpPath . '/' . $filePhp . '.php', '<?php' . $viewPhp);
        }

        return successResponse($response, ["File PHP, JS dan HTML untuk tabel " . $table . " berhasil ditambah, silahkan buat hak akses dan config router nya"]);
    } else {
        return unprocessResponse($response, $validasi);
    }
});
