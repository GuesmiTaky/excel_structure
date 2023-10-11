<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Project;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;
use Illuminate\Support\Facades\File;

class ImageController extends Controller
{
    public function uploadPicture(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $filename = Uuid::uuid4() . '.' . $file->getClientOriginalExtension();
            $file->storeAs('picture', $filename);
            return response()->json(['success' => true, 'message' => 'File uploaded successfully']);
        }
    }

    public function deletePicture(Request $request)
    {
        $filename = $request->input('partialPath');
        $projectId = $request->input('projectId');

        if (!$filename || !$projectId) {
            return response()->json(['success' => false, 'message' => 'Both imageUrl and projectId are required']);
        }

        $project = Project::find($projectId);
        if (!$project) {
            return response()->json(['success' => false, 'message' => 'Project not found']);
        }


        $image = Image::where('image_url', $filename)->where('project_id', $projectId)->first();
        if (!$image) {
            return response()->json(['success' => false, 'message' => 'Image not found for the specified project']);
        }

        $imagePath = storage_path('app/public/pictures/' . $filename);
        if (File::exists($imagePath)) {
            File::delete($imagePath);
             $image->delete();
             return response()->json(['success' => true, 'message' => 'File deleted successfully']);
        } else {
            return response()->json(['success' => false, 'message' => 'File not found on the server']);
        }
    }
}
