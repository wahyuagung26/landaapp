<?php

use Phinx\Seed\AbstractSeed;

class UserSeeder extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeders is available here:
     * http://docs.phinx.org/en/latest/seeding.html
     */
    public function run()
    {
        $data = [
            [
                'id'         => 1,
                'nama'       => 'administrator',
                'username'   => 'admin',
                'password'   => sha1('landak'),
                'akses'      => '{}',
                'is_deleted' => 0,
            ],
        ];

        $user = $this->table('m_user');
        $user->insert($data)
            ->save();
    }
}
