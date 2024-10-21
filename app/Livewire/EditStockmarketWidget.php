<?php

namespace App\Livewire;

use App\Models\Widget;
use Livewire\Component;

class EditStockmarketWidget extends Component
{

    public $title = '';
    public $color = '#4caf50';
    public $width = 3;
    public $height = 3;
    public $user_id;
    public $description;
    public $widget;

    protected $rules = [
        'title' => 'required|string|max:255',
        'color' => 'required|string',
        'width' => 'required|integer|min:1|max:12',
        'height' => 'required|integer|min:1|max:12',
    ];

    public function mount($name)
    {
        $this->user_id = auth()->id();
        
        $this->widget = Widget::where('user_id', $this->user_id)
            ->where('name', strtolower($name) . '-widget')
            ->first();

        if ($this->widget) {
            $this->title = $this->widget->title;
            $this->description = $this->widget->description;
            $this->color = $this->widget->color;
            $this->width = $this->widget->width;
            $this->height = $this->widget->height;
        }
    }

    public function saveWidget()
    {
        $this->validate();

        if ($this->widget) {
            $this->widget->update([
                'title' => $this->title,
                'description' => $this->description,
                'color' => $this->color,
                'width' => $this->width,
                'height' => $this->height,
            ]);

            $this->dispatch('notification', [
                'type' => 'success',
                'message' => 'Stock Market widget updated successfully!',
            ]);
        }
    }

    public function render()
    {
        return view('livewire.edit-stockmarket-widget');
    }
}
