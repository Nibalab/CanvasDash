<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Widget;

class Dashboard extends Component
{

    protected $listeners = ['updateWidgets'];

    public function updateWidgets($widgets)
    {
        foreach ($widgets as $widget) {
            $current_widget = Widget::findOrFail($widget['id']);

            if ($current_widget) {
                $current_widget->update([
                    'width' => $widget['width'],
                    'height' => $widget['height'],
                    'x' => $widget['x'],
                    'y' => $widget['y']
                ]);

                return redirect('/dashboard');
            }
        }
    }

    public function render()
    {
        $widgets = Widget::where('user_id', auth()->id())->get() ?? collect();

        return view('livewire.dashboard', compact('widgets'))->extends('layouts.app');
    }
}
