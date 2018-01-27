<?php

use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = [
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin'),
            'role_id' => 1
        ];

        $user = [
            'name' => 'User',
            'email' => 'user@user.com',
            'password' => \Illuminate\Support\Facades\Hash::make('user'),
            'role_id' => 2
        ];

        \App\User::create($admin);
        \App\User::create($user);
    }
}
