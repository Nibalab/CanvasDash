<?php

namespace App\Livewire;

use App\Models\Widget;
use Livewire\Component;
use Illuminate\Support\Facades\Http;

class AddNewsWidget extends Component
{
    public $title = '';
    public $color = '#4caf50';
    public $width = 3;
    public $height = 3;
    public $description;
    public $user_id;
    public $newsData;

    protected $rules = [
        'title' => 'required|string|max:255',
        'description' => 'nullable|string|max:255',
        'color' => 'required|string',
        'width' => 'required|integer|min:1|max:12',
        'height' => 'required|integer|min:1|max:12',
    ];

    public function mount()
    {
        $this->user_id = auth()->id();
        $this->newsData = [];

        if (Widget::where('user_id', $this->user_id)->where('name', 'news-widget')->exists()) {
            return redirect('/dashboard');
        }
    }

    public function fetchNewsData()
    {
        $apiKey = '4f23a9ca8eec411290e0e52325d85b30';
        $url = 'https://newsapi.org/v2/top-headlines?language=en&category=general&apiKey=' . $apiKey;

        try {
            $response = Http::withOptions(['verify' => false])->get($url);
            if ($response->successful()) {
                $articles = $response->json()['articles'];
                if($articles){
                    $this->newsData = array_slice($articles, 0, 3);
                }else{
                    $this->newsData = [];
                }
            } else {
                $this->dispatch('notification', [
                    'type' => 'error',
                    'message' => 'Failed to fetch news data.'
                ]);
            }
        } catch (\Exception $e) {
            $this->dispatch('notification', [
                'type' => 'error',
                'message' => 'An error occurred: ' . $e->getMessage()
            ]);
        }
    }

    public function saveWidget()
    {
        $this->validate();

        $this->fetchNewsData();

        Widget::create([
            'user_id' => $this->user_id,
            'name' => 'news-widget',
            'title' => $this->title,
            'description' => $this->description,
            'color' => $this->color,
            'x' => 0,
            'y' => 0,
            'width' => $this->width,
            'height' => $this->height,
            'details' => json_encode($this->newsData),
        ]);

        $this->dispatch('notification', [
            'type' => 'success',
            'message' => 'News widget saved successfully!'
        ]);
    }
    public function render()
    {
        return view('livewire.add-news-widget')->extends('layouts.app');
    }
}
