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
            'first_name' => 'Przemysław',
            'last_name' => 'Chudziński',
            'email' => 'admin@admin.com',
            'password' => \Illuminate\Support\Facades\Hash::make('admin'),
            'role_id' => 1
        ];

        $user = [
            'first_name' => 'Jan',
            'last_name' => 'Kowalski',
            'email' => 'user@user.com',
            'password' => \Illuminate\Support\Facades\Hash::make('user'),
            'role_id' => 2
        ];

        \App\User::create($admin);
        \App\User::create($user);
    }
}
