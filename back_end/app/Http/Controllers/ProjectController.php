<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Project;
use Illuminate\Support\Facades\File;
use Carbon\Carbon;

class ProjectController extends Controller
{

    // Les règles de validation pour les attributs du modèle
    public static $rules = [
        'name' => 'required|string|max:100',
    ];

    // Les messages d'erreur pour les règles de validation du modèle
    public static $errorMessages = [
        'name.required' => 'Le nom de la catégorie est obligatoire',
    ];

    // Récupérer la liste de tous les projets
    public function index()
    {
        $projects = Project::orderBy('created_at', 'desc')->with('imageRelations')->with('category')->paginate(10);

        $projects->getCollection()->transform(function ($project) {
            $project->load('category');
            $project->name_category = $project->category->name ?? null;
            // unset($project->category);
            return $project;
        });

        return response()->json($projects);
    }

    // Récupérer la liste de tous les projets
    public function listProject()
    {
        $projects = Project::orderBy('created_at', 'desc')->with('imageRelations')->with('category')->paginate(8);
        $projects->getCollection()->transform(function ($project) {
            $project->load('category');
            $project->name_category = $project->category->name ?? null;
            // unset($project->category);
            return $project;
        });

        return response()->json($projects);
    }

    // Récupérer la liste de tous les projets par 6
    public function projectByCategory($id)
    {
        $projects = Project::where('category_id', $id)
            ->orderBy('date', 'desc')
            ->with('imageRelations')
            ->paginate(8);
        return response()->json($projects);
    }


    // Récupérer la liste de tous les projets par 6
    public function getLatestProjects()
    {
        $projects = Project::orderBy('date', 'desc')
            ->with('imageRelations')
            ->limit(6)
            ->get();

        return response()->json($projects);
    }

    // Récupérer la liste de tous les projets par 6
    public function getLatestProjectsByCategory($categoryId, $projectId)
    {
        $projects = Project::where('category_id', $categoryId)
            ->where('id', '<>', $projectId)
            ->orderBy('date', 'desc')
            ->with('imageRelations')
            ->limit(6)
            ->get();

        return response()->json($projects);
    }

    // Récupérer les détails d'un projet spécifique
    public function show($id)
    {
        $project = Project::with('category', 'imageRelations')->find($id);
        if (!$project) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        return response()->json($project);
    }


    // Ajouter un nouveau projet
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $project = new Project;
        $project->name = $request->input('name');
        $project->adresse = $request->input('adresse');
        $project->description = $request->input('description');
        $project->architect = $request->input('architect');
        $project->owner = $request->input('owner');

        $project->execution_mission = $request->input('execution_mission');
        $project->surface = $request->input('surface');
        $project->amount = $request->input('amount');
        $project->category_id = $request->input('category_id');
        $project->video = $request->input('video');
        $originalDate = $request->input('date');
        $date = Carbon::parse($originalDate);
        $mysqlFormattedDate = $date->format('Y-m-d H:i:s');

        $project->date = $mysqlFormattedDate;
        $project->save();

        $file_list = $request->fileList;

        if (count($file_list) > 0) {
            foreach ($file_list as $file) {
                $tmp_name = $file['originFileObj']['uid'];
                $filename = uniqid() . '_' . $file['name'];
                $file_path = $file['preview'];
                $file_content = file_get_contents($file_path);
                $file_path = storage_path('app\public\pictures\\' . $filename);
                file_put_contents($file_path, $file_content);
                $image = new Image();
                $image->project_id = $project->id;
                $image->image_url = $filename;
                $image->save();
            }
        }

        $project->load('category');
        return response()->json($project, 201);
    }

    // Mettre à jour un projet existant
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }
        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $project->name = $request->input('name');
        $project->adresse = $request->input('adresse');
        $project->description = $request->input('description');
        $project->architect = $request->input('architect');
        $project->owner = $request->input('owner');

        $project->execution_mission = $request->input('execution_mission');
        $project->surface = $request->input('surface');
        $project->amount = $request->input('amount');
        $project->video = $request->input('video');
        $project->category_id = $request->input('category_id');
        $originalDate = $request->input('date');
        $date = Carbon::parse($originalDate);
        $mysqlFormattedDate = $date->format('Y-m-d H:i:s');
        $project->date = $mysqlFormattedDate;
        $project->save();

        $file_list = $request->fileList;

        if (count($file_list) > 0) {
            foreach ($file_list as $file) {
                if (isset($file['preview'])) {
                    $tmp_name = $file['originFileObj']['uid'];
                    $filename = uniqid() . '_' . $file['name'];
                    $file_path = $file['preview'];
                    $file_content = file_get_contents($file_path);
                    $file_path = storage_path('app\public\pictures\\' . $filename);
                    file_put_contents($file_path, $file_content);
                    $image = new Image();
                    $image->project_id = $project->id;
                    $image->image_url = $filename;
                    $image->save();
                }
            }
        }

        $project->load('category'); // charge la relation de catégorie
        return response()->json($project);
    }

    // Supprimer un projet
    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Projet non trouvé'], 404);
        }

        $images = $project->imageRelations;

        if ($images) {
            foreach ($images as $image) {
                $imagePath = storage_path('app/public/pictures/' . $image->image_url);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                    $project->imageRelations()->delete();
                }
            }
        }

        $project->delete();
        return response()->json(['message' => 'Projet supprimé'], 204);
    }
}
