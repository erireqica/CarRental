<?php

namespace App\Http\Controllers;
use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller {
    public function store(Request $request) {
        $validated = $request->validate([
            'car_id' => 'required|integer',
            'booking_date' => 'required|date',
        ]);
        $booking = Booking::create([
            'user_id' => $request->user()->id,
            'car_id' => $validated['car_id'],
            'booking_date' => $validated['booking_date'],
        ]);
        return response()->json($booking);
    }

    public function index(Request $request) {
        return $request->user()->bookings;
    }
}
