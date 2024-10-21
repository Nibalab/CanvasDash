<?php

namespace App\Livewire;

use App\Models\Widget;
use Illuminate\Support\Facades\Http;
use Livewire\Component;

class AddWeatherWidget extends Component
{
    public $title = '';
    public $color = '#4caf50';
    public $width = 3;
    public $height = 3;
    public $date;
    public $longitude;
    public $latitude;
    public $user_id;
    public $weatherData;

    protected $rules = [
        'title' => 'required|string|max:255',
        'color' => 'required|string',
        'width' => 'required|integer|min:1|max:12',
        'height' => 'required|integer|min:1|max:12',
        'longitude' => 'required|numeric',
        'latitude' => 'required|numeric',
    ];

    public function mount()
    {
        $this->date = now()->format('Y-m-d');
        $this->user_id = auth()->id();
        $this->weatherData = [];

        if (Widget::where('user_id', $this->user_id)->where('name', 'weather-widget')->exists()) {
            return redirect('/dashboard');
        }
    }

    public function fetchWeatherData()
    {
        $apiKey = 'GWN7DUAGQ7PZGC7XPVK9HCEDE';
        $url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{$this->latitude},{$this->longitude}?key={$apiKey}";

        try {
            $response = Http::withOptions(['verify' => false])->get($url);
            if ($response->successful()) {
                $weatherData = $response->json();
                $this->weatherData = $weatherData['days'][0];
            } else {
                $this->weatherData = ['error' => 'Failed to fetch data.'];
            }
        } catch (\Exception $e) {
            $this->weatherData = ['error' => $e->getMessage()];
        }
    }
    
    public function saveWidget()
    {
        $this->validate();
        
        $this->fetchWeatherData();
        
        Widget::create([
            'user_id' => $this->user_id,
            'name' => 'weather-widget',
            'title' => $this->title,
            'color' => $this->color,
            'x' => 0,
            'y' => 0,
            'width' => $this->width,
            'height' => $this->height,
            'details' => json_encode([
                'longitude' => $this->longitude, 
                'latitude' => $this->latitude, 
                'icon' => $this->weatherData['icon'], 
                'datetime' => $this->weatherData['datetime'],
                'description' => $this->weatherData['description'] ?? 'No description available',
                'temp' => $this->weatherData['temp'],
                'conditions' => $this->weatherData['conditions'],
            ]),
        ]);

         $this->dispatch('notification', [
            'type' => 'success',
            'message' => 'Weather widget saved successfully!'
        ]);
    }
    public function render()
    {
        return view('livewire.add-weather-widget')->extends('layouts.app');
    }
}
