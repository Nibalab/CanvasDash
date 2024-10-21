<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

use App\Livewire\Dashboard;
use App\Livewire\AddCovid19Widget;
use App\Livewire\AddMapWidget;
use App\Livewire\AddNewsWidget;
use App\Livewire\AddStockMarketWidget;
use App\Livewire\AddWeatherWidget;
use App\Livewire\MapWidget;

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/test', function () {
    return view('test');
})->name('test');
Route::middleware(['auth'])->group(function () {
    // Route Livewire
    \Livewire\Livewire::setUpdateRoute(function ($handle) {
        return Route::post('/livewire/update', $handle);
    });

    Route::get('/dashboard', Dashboard::class)->name('dashboard');
    Route::get('/add-weather-widget', AddWeatherWidget::class)->name('add.weather.widget');
    Route::get('/add-covid-19-widget', AddCovid19Widget::class)->name('add.covid19.widget');
    Route::get('/add-news-widget', AddNewsWidget::class)->name('add.news.widget');
    Route::get('/add-stock-market-widget', AddStockMarketWidget::class)->name('add.stockmarket.widget');
    Route::get('/add-map-widget', AddMapWidget::class)->name('add.map.widget');
    Route::get('/map-widget', MapWidget::class)->name('map.widget');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
