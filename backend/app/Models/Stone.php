<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Orchid\Screen\AsSource;

class Stone extends Model
{
    use HasFactory, AsSource;

    protected $fillable = ['name','slug','properties'];

    protected $casts = [
        'properties' => 'array',
    ];
}
