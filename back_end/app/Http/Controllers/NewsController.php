<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\News;
use Carbon\Carbon;

class NewsController extends Controller
{

    // Les règles de validation pour les attributs du modèle
    public static $rules = [
        'title' => 'required|string|max:30',
    ];

    // Les messages d'erreur pour les règles de validation du modèle
    public static $errorMessages = [
        'title.required' => 'Le nom de la actualité est obligatoire',
    ];

    // Récupérer la liste de tous les news
    public function index()
    {

        $newss = News::orderBy('created_at', 'desc')->paginate(10);
        return response()->json($newss);
    }

    // Récupérer les détails d'un news spécifique
    public function show($id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'Actualité non trouvé'], 404);
        }

        return response()->json($news);
    }

    // Ajouter un nouveau
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $news = new News;
        $news->title = $request->input('title');
        $news->description = $request->input('description');
        $originalDate = $request->input('date');
        $date = Carbon::parse($originalDate);
        $mysqlFormattedDate = $date->format('Y-m-d H:i:s');

        $news->date = $mysqlFormattedDate;

        $news->save();

        return response()->json($news, 201);
    }

    // Mettre à jour un Actualité existant
    public function update(Request $request, $id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'Actualité non trouvé'], 404);
        }
        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $news->title = $request->input('title');
        $news->description = $request->input('description');
        $originalDate = $request->input('date');
        $date = Carbon::parse($originalDate);
        $mysqlFormattedDate = $date->format('Y-m-d H:i:s');

        $news->date = $mysqlFormattedDate;

        $news->save();

        return response()->json($news);
    }

    // Supprimer un Actualité
    public function destroy($id)
    {
        $news = News::find($id);
        if (!$news) {
            return response()->json(['message' => 'Actualité non trouvé'], 404);
        }
        $news->delete();
        return response()->json(['message' => 'Actualité supprimé'], 204);
    }
}
