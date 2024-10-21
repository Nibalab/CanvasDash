<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Widget;
class WidgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Widget::create([
            'name' => 'weather-widget',
            'title' => 'Today’s Weather',
            'color' => '#2196f3',
            'x' => 0,
            'y' => 0,
            'width' => 4,
            'height' => 2,
        ]);
    }
}
