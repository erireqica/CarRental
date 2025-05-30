<?php

namespace App\Http\Controllers;
use App\Models\Booking;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class BookingController extends Controller {
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function store(Request $request) {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => 'required|date|after:start_date',
        ]);

        $car = Car::findOrFail($request->car_id);
        
        // Check if car is available
        if (!$car->available) {
            return response()->json(['message' => 'Car is not available'], 400);
        }

        // Check for existing bookings that overlap with the requested dates
        $existingBooking = Booking::where('car_id', $request->car_id)
            ->where('status', '!=', 'cancelled')
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                    ->orWhereBetween('end_date', [$request->start_date, $request->end_date])
                    ->orWhere(function ($q) use ($request) {
                        $q->where('start_date', '<=', $request->start_date)
                            ->where('end_date', '>=', $request->end_date);
                    });
            })
            ->exists();

        if ($existingBooking) {
            return response()->json(['message' => 'Car is already booked for these dates'], 400);
        }

        // Calculate total price
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);
        $totalDays = $endDate->diffInDays($startDate);
        $totalPrice = $car->price_per_day * $totalDays;

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'car_id' => $request->car_id,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'total_price' => $totalPrice,
            'status' => 'pending'
        ]);

        return response()->json($booking->load(['car']), 201);
    }

    public function index(Request $request) {
        if (Auth::user()->hasRole('super_admin')) {
            return Booking::with(['user', 'car'])->get();
        }
        return Booking::with(['car'])->where('user_id', Auth::id())->get();
    }

    public function confirm($id) {
        if (!Auth::user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $booking = Booking::findOrFail($id);
        
        if ($booking->status !== 'pending') {
            return response()->json(['message' => 'Booking cannot be confirmed'], 400);
        }

        $booking->update(['status' => 'confirmed']);

        return response()->json($booking->load(['user', 'car']));
    }

    public function cancel($id) {
        $booking = Booking::findOrFail($id);

        // Check if user is authorized to cancel (either super admin or booking owner)
        if (!Auth::user()->hasRole('super_admin') && Auth::id() !== $booking->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($booking->status === 'cancelled') {
            return response()->json(['message' => 'Booking is already cancelled'], 400);
        }

        $booking->update(['status' => 'cancelled']);

        return response()->json($booking->load(['user', 'car']));
    }
}
