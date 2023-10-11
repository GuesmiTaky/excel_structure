<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    // Les règles de validation pour les attributs du modèle
    public static $rules = [
        'name' => 'required|string|max:30',
    ];

    // Les messages d'erreur pour les règles de validation du modèle
    public static $errorMessages = [
        'name.required' => 'Le nom de la catégorie est obligatoire',
    ];

    // Récupérer la liste de toutes les catégories
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        if ($perPage == -1) {

            $categorys = Category::orderBy('created_at', 'desc')->with('projet')->get();
        } else {
            $categorys = Category::orderBy('created_at', 'desc')->with('projet')->paginate($perPage);
        }

        return response()->json($categorys, 200);
    }

    // Récupérer la liste de toutes les catégories
    public function listCategoryWithProject()
    {
        $categoriesWithProjects = Category::all()->filter(function ($category) {
            return $category->projet()->count() > 0;
        })->values()->toArray();

        return response()->json($categoriesWithProjects, 200);
    }

    // Récupérer la liste de toutes les catégories
    public function listCategory()
    {
        $categorys = Category::orderBy('created_at', 'desc')->get();
        return response()->json($categorys, 200);
    }

    // Récupérer les détails d'une catégorie spécifique
    public function show($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        $category->load('projet');
        return response()->json($category, 200);
    }

    // Créé une catégorie
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = new Category;
        $category->name = $request->input('name');
        $category->save();
        return response()->json($category, 201);
    }

    // Mettre à jour une catégorie existante
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        }
        $category->name = $request->name;
        $category->save();

        return response()->json($category, 200);
    }

    // Supprimer une catégorie
    public function destroy($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(['message' => 'Catégorie non trouvée'], 404);
        } else if ($category->projet->count() > 0) {
            return response()->json([
                'message' => 'Cette catégorie contient des projets. Supprimez les projets avant de supprimer la catégorie.'
            ], 422);
        } else
            $category->delete();
        return response()->json(['message' => 'Catégorie supprimée'], 204);
    }
}
