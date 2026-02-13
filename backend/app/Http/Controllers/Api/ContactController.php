<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $messages
        ]);
    }

    public function unreadCount()
    {
        $count = ContactMessage::where('is_read', false)->count();
        return response()->json([
            'success' => true,
            'count' => $count
        ]);
    }

    public function store(StoreContactMessageRequest $request)
    {
        $message = ContactMessage::create($request->validated());

        // Send email via Resend
        $this->sendResendEmail($message);

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully. We will get back to you soon.',
            'data' => $message
        ], 201);
    }

    public function show($id)
    {
        $message = ContactMessage::findOrFail($id);
        
        // Mark as read when viewing
        if (!$message->is_read) {
            $message->update(['is_read' => true]);
        }

        return response()->json([
            'success' => true,
            'data' => $message
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->update([
            'is_read' => $request->is_read
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Message status updated',
            'data' => $message
        ]);
    }

    public function destroy($id)
    {
        $message = ContactMessage::findOrFail($id);
        $message->delete();

        return response()->json([
            'success' => true,
            'message' => 'Message deleted successfully'
        ]);
    }

    private function sendResendEmail($message)
    {
        $apiKey = env('RESEND_API_KEY');
        if (!$apiKey) {
            Log::warning('Resend API Key not found in .env');
            return;
        }

        try {
            $response = Http::withToken($apiKey)->post('https://api.resend.com/emails', [
                'from' => 'GTVET Portal <onboarding@resend.dev>', // Resend default for unverified domains
                'to' => ['andyfidelsam@gmail.com'], // Send to admin
                'subject' => 'New Contact Message: ' . htmlspecialchars($message->subject, ENT_QUOTES, 'UTF-8'),
                'html' => "
                    <h2>New Message from " . htmlspecialchars($message->name, ENT_QUOTES, 'UTF-8') . "</h2>
                    <p><strong>Email:</strong> " . htmlspecialchars($message->email, ENT_QUOTES, 'UTF-8') . "</p>
                    <p><strong>Phone:</strong> " . htmlspecialchars($message->phone ?? 'N/A', ENT_QUOTES, 'UTF-8') . "</p>
                    <p><strong>Subject:</strong> " . htmlspecialchars($message->subject, ENT_QUOTES, 'UTF-8') . "</p>
                    <p><strong>Message:</strong></p>
                    <p>" . nl2br(htmlspecialchars($message->message, ENT_QUOTES, 'UTF-8')) . "</p>
                    <hr>
                    <p>Sent via GTVET Information Portal Contact Form</p>
                "
            ]);

            if (!$response->successful()) {
                Log::error('Resend Email Error: ' . $response->body());
            }
        } catch (\Exception $e) {
            Log::error('Resend Exception: ' . $e->getMessage());
        }
    }
}
