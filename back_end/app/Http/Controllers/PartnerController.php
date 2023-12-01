<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class PartnerController extends Controller
{

    // Les règles de validation pour les attributs du modèle
    public static $rules = [
        'name' => 'required|string|max:30',
    ];

    // Les messages d'erreur pour les règles de validation du modèle
    public static $errorMessages = [
        'name.required' => 'Le nom de la un partenaire est obligatoire',
    ];

    // Récupérer la liste de toutes les un partenaires
    public function index()
    {
        $partners = Partner::orderBy('created_at', 'desc')->with('imageRelation')->paginate(10);
        return response()->json($partners, 200);
    }

    // Récupérer les détails d'une un partenaire spécifique
    public function show($id)
    {
        $partner = Partner::find($id);
        if (!$partner) {
            return response()->json(['message' => 'un partenaire non trouvé'], 404);
        }
        $partner->load('imageRelation');
        return response()->json($partner, 200);
    }

    // Créé une partenaire
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $partner = new Partner;
        $partner->name = $request->input('name');
        $partner->save();

        $file_list = $request->fileList;

        if (count($file_list) > 0) {
            foreach ($file_list as $file) {
                $tmp_name = $file['originFileObj']['uid'];
                $filename = uniqid() . '_' . $file['name'];
                $file_path = $file['preview'];
                $file_content = file_get_contents($file_path);
                $file_path = storage_path(env('PICTURES_PATH') . $filename);
                file_put_contents($file_path, $file_content);
                $image = new Image();
                $image->partner_id = $partner->id;
                $image->image_url = $filename;
                $image->save();
            }
        }

        return response()->json($partner, 201);
    }

    // Mettre à jour une un partenaire existante
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), self::$rules, self::$errorMessages);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $partner = Partner::find($id);
        if (!$partner) {
            return response()->json(['message' => 'un partenaire non trouvé'], 404);
        }
        $partner->name = $request->name;
        $partner->save();

        $file_list = $request->fileList;

        if (isset($file_list[0]['preview'])) {
            $images = $partner->imageRelation;

            if ($images) {
                $imagePath = storage_path(env('PICTURES_PATH') . $images->image_url);
                if (File::exists($imagePath)) {
                    File::delete($imagePath);
                    $partner->imageRelation()->delete();
                }
            }

            if (count($file_list) > 0) {
                foreach ($file_list as $file) {
                    $tmp_name = $file['originFileObj']['uid'];
                    $filename = uniqid() . '_' . $file['name'];
                    $file_path = $file['preview'];
                    $file_content = file_get_contents($file_path);
                    $file_path = storage_path(env('PICTURES_PATH') . $filename);
                    file_put_contents($file_path, $file_content);
                    $image = new Image();
                    $image->partner_id = $partner->id;
                    $image->image_url = $filename;
                    $image->save();
                }
            }
        }
        return response()->json($partner, 200);
    }

    // Supprimer une un partenaire
    public function destroy($id)
    {
        $partner = Partner::find($id);
        if (!$partner) {
            return response()->json(['message' => 'un partenaire non trouvé'], 404);
        } else
            $images = $partner->imageRelation;
        if ($images) {
            $imagePath = storage_path(env('PICTURES_PATH') . $images->image_url);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
                $partner->imageRelation()->delete();
            }
        }
        $partner->delete();
        return response()->json(['message' => 'un partenaire supprimé'], 204);
    }
}
