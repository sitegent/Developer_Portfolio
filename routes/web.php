<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\FrontendController;

Route::get('/', [FrontendController::class, 'home'])->name('home');
Route::get('/about', [FrontendController::class, 'about'])->name('about');
Route::get('/services', [FrontendController::class, 'services'])->name('services.page');
Route::get('/works', [FrontendController::class, 'works'])->name('works.page');
Route::get('/contact', [FrontendController::class, 'contact'])->name('contact.page');
Route::post('/contact', [FrontendController::class, 'storeHire'])->name('hire.store');
Route::post('/fcm/token', [\App\Http\Controllers\Admin\NotificationController::class, 'saveToken'])->name('fcm.token.save');

Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('site-content', \App\Http\Controllers\Admin\SiteContentController::class);
    Route::resource('services', \App\Http\Controllers\Admin\ServiceController::class);
    Route::resource('works', \App\Http\Controllers\Admin\WorkController::class);
    Route::resource('messages', \App\Http\Controllers\Admin\MessageController::class);
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'update'])->name('settings.update');
    Route::resource('brands', \App\Http\Controllers\Admin\BrandController::class)->only(['index', 'store', 'destroy']);
    Route::resource('experiences', \App\Http\Controllers\Admin\ExperienceController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/notifications', [\App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/send', [\App\Http\Controllers\Admin\NotificationController::class, 'send'])->name('notifications.send');
});

Route::get('/fix-storage', function () {
    $target = storage_path('app/public');
    $shortcut = public_path('storage');
    
    if (file_exists($shortcut)) {
        return "আগে থেকেই আছে, দয়া করে public/storage ফোল্ডারটি ডিলিট করে আবার চেষ্টা করুন।";
    }
    
    app('files')->link($target, $shortcut);
    return "Storage link created successfully!";
});
require __DIR__.'/auth.php';
