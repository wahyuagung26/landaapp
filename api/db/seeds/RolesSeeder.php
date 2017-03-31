<?php

use Phinx\Seed\AbstractSeed;

class RolesSeeder extends AbstractSeed
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
            'id'         => 1,
            'nama'       => 'administrator',
            'akses'      => '',
            'is_deleted' => 0,
        ];

        $roles = $this->table('m_roles');
        $roles->insert($data)
            ->save();
    }
}
