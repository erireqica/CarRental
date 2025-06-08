<?php
use App\Models\AboutUsContent;
use Illuminate\Http\Request;

class AboutUsContentController extends Controller
{
    public function index()
    {
        return AboutUsContent::first();
    }

    public function update(Request $request)
    {
        $content = AboutUsContent::first();
        if (!$content) {
            $content = new AboutUsContent();
        }
        $content->updateOrCreate(['id' => $content->id ?? null], $request->all());
        return response()->json(['message' => 'About Us content updated successfully']);
    }
}

