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

        $user2 = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john@doe.com',
            'password' => \Illuminate\Support\Facades\Hash::make('user'),
            'role_id' => 2
        ];

        $user3 = [
            'first_name' => 'Karolina',
            'last_name' => 'Kowalska',
            'email' => 'karolina@kowalska.com',
            'password' => \Illuminate\Support\Facades\Hash::make('user'),
            'role_id' => 2
        ];

        \App\User::create($admin);
        \App\User::create($user);
        \App\User::create($user2);
        \App\User::create($user3);
    }
}
