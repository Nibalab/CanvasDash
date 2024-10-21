<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPreference extends Model
{
    protected $fillable = ['user_id', 'widgets'];
    protected $casts = ['widgets' => 'array'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
