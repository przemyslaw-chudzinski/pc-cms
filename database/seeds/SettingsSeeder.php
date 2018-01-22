<?php

use Illuminate\Database\Seeder;
use App\Setting;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (config('admin.modules.settings.defaults') as $defaultSetting) {
            Setting::create($defaultSetting);
        }
    }
}
