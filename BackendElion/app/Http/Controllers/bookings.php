

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();
        return view('bookings.index', compact('bookings'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_name' => 'required',
            'car_model' => 'required',
            'booking_date' => 'required|date',
        ]);

        Booking::create($request->all());

        return redirect('/')->with('success', 'Car booked successfully!');
    }
}
