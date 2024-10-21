<?php

namespace App\Livewire;

use App\Models\Widget;
use Livewire\Component;

class Covid19Widget extends Component
{
    public $widget;

    public function mount($widget)
    {
        $this->widget = Widget::findOrFail($widget) ?? collect();
        
    }
    
    public function render()
    {
        return view('livewire.covid19-widget');
    }
}
