<?php

namespace App\Livewire;

use App\Models\Widget;
use Livewire\Component;

class StockmarketWidget extends Component
{
    public $widget;
    public $labels = [];
    public $prices = [];

    public function mount($widget)
    {
        $this->widget = Widget::findOrFail($widget);
        $this->widget->details = json_decode($this->widget->details, true);
    }

    public function render()
    {
        // Extract values from the details
        $details = $this->widget->details;

        // Prepare data for the chart
        $chartData = [
            'labels' => ['Open', 'High', 'Low', 'Close', 'Previous Close'],
            'data' => [
                $details['open'] ?? 0,
                $details['high'] ?? 0,
                $details['low'] ?? 0,
                $details['price'] ?? 0,
                $details['previousClose'] ?? 0,
            ],
        ];

        return view('livewire.stockmarket-widget', [
            'chartData' => json_encode($chartData),
        ]);
        return view('livewire.stockmarket-widget');
    }
}
