<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Messages/Index', [
            'messages' => Message::latest()->paginate(10)
        ]);
    }

    public function show(Message $message)
    {
        return Inertia::render('Admin/Messages/Show', [
            'message' => $message
        ]);
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return redirect()->route('admin.messages.index')->with('success', 'Message deleted successfully.');
    }
}
