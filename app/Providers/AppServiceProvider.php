<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Vite::usePreloadTagAttributes(fn (?string $src, string $url, ?array $chunk, ?array $manifest) => [
            'as' => str_ends_with($url, '.css') ? 'style' : 'script',
        ]);
    }
}
