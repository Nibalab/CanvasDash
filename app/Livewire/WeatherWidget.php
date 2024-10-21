<?php

namespace App\Livewire;

use App\Models\Widget;
use Livewire\Component;

class WeatherWidget extends Component
{
    public $widget;

    public function mount($widget)
    {
        $this->widget = Widget::findOrFail($widget) ?? collect();
        $this->widget->details = json_decode($this->widget->details, true);
    }

    public function render()
    {
        return view('livewire.weather-widget');
    }
}
