<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Service;
use App\Models\Work;
use App\Models\SiteContent;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'stats' => [
                'messages' => Message::count(),
                'services' => Service::count(),
                'works' => Work::count(),
                'content' => SiteContent::count(),
            ],
            'recentMessages' => Message::latest()->limit(5)->get(),
        ]);
    }
}
