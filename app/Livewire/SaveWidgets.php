<?php

namespace App\Livewire;

use App\Models\Widget;
use Livewire\Component;

class SaveWidgets extends Component
{
    public $widgets;
    public $widgetLayout = [];

    public function mount()
    {
        $this->widgets = Widget::all()->toArray();
    }

    public function saveWidgets()
    {
        foreach ($this->widgetLayout as $layout) {
            Widget::where('id', $layout['id'])->update([
                'x' => $layout['x'],
                'y' => $layout['y'],
                'width' => $layout['width'],
                'height' => $layout['height'],
            ]);
        }

        $this->dispatch('widgets-saved', ['message' => 'Layout saved successfully!']);
    }

    public function render()
    {
        return view('livewire.save-widgets');
    }
}
