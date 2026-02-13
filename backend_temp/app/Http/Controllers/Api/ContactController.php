<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;

class ContactController extends Controller
{
    public function store(StoreContactMessageRequest $request)
    {
        $message = ContactMessage::create($request->validated());

        // Send email notification
        // Mail::to(config('mail.from.address'))->send(new ContactFormSubmitted($message));

        return response()->json([
            'success' => true,
            'message' => 'Your message has been sent successfully. We will get back to you soon.',
            'data' => $message
        ], 201);
    }
}
