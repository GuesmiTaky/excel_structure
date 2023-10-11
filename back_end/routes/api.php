<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);

Route::group(['prefix' => 'auth', 'middleware' => ['auth:sanctum']], function () {

    Route::get('logout', [AuthController::class, 'logout']);

    // Liste de toutes les projets
    Route::get('project', [ProjectController::class, 'index']);
    Route::get('project/{id}', [ProjectController::class, 'show']);
    Route::post('project', [ProjectController::class, 'store']);
    Route::put('project/{id}', [ProjectController::class, 'update']);
    Route::delete('project/{id}', [ProjectController::class, 'destroy']);

    // Liste de toutes les catégories
    Route::get('categorie', [CategoryController::class, 'index']);
    Route::get('categorie/{id}', [CategoryController::class, 'show']);
    Route::post('categorie', [CategoryController::class, 'store']);
    Route::put('categorie/{id}', [CategoryController::class, 'update']);
    Route::delete('categorie/{id}', [CategoryController::class, 'destroy']);

    // Liste de toutes les actualités
    Route::get('news', [NewsController::class, 'index']);
    Route::get('news/{id}', [NewsController::class, 'show']);
    Route::post('news', [NewsController::class, 'store']);
    Route::put('news/{id}', [NewsController::class, 'update']);
    Route::delete('news/{id}', [NewsController::class, 'destroy']);

    // Liste de toutes les partenaires
    Route::get('partner', [PartnerController::class, 'index']);
    Route::get('partner/{id}', [PartnerController::class, 'show']);
    Route::post('partner', [PartnerController::class, 'store']);
    Route::put('partner/{id}', [PartnerController::class, 'update']);
    Route::delete('partner/{id}', [PartnerController::class, 'destroy']);

    //liste des routes upload et delete image
    Route::post('picture', [ImageController::class, 'uploadPicture']);
    Route::delete('picture', [ImageController::class, 'deletePicture']);
});

//route dashbord
Route::get('news', [NewsController::class, 'index']);
Route::get('partner', [PartnerController::class, 'index']);
Route::get('categorie', [CategoryController::class, 'index']);
Route::get('list-categorie', [CategoryController::class, 'listCategory']);
Route::get('list-categorie-project', [CategoryController::class, 'listCategoryWithProject']);
Route::get('project', [ProjectController::class, 'index']);
Route::get('project/{id}', [ProjectController::class, 'show']);
Route::get('list-project', [ProjectController::class, 'listProject']);

Route::get('project-by-category/{id}', [ProjectController::class, 'projectByCategory']);

Route::get('get-latest-projects', [ProjectController::class, 'getLatestProjects']);
Route::get('get-latest-projects-category/{categoryId}/{projectId}', [ProjectController::class, 'getLatestProjectsByCategory']);
