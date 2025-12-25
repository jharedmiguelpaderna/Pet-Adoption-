<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ShelterController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AdopterController;
use App\Http\Controllers\AdoptionController;
use App\Http\Controllers\VetVisitController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FileUploadController;

// Route parameter patterns: enforce numeric `id` parameters
Route::pattern('id', '[0-9]+');

// =======================
// Authentication routes (public)
// =======================
Route::prefix('auth')->group(function () {
    Route::post('admin/login', [AuthController::class, 'adminLogin']);     // Admin login
    Route::post('adopter/login', [AuthController::class, 'adopterLogin']); // Adopter login
    Route::post('adopter/register', [AdopterController::class, 'register']); // Adopter self-registration
    Route::post('admin/register', [AdminController::class, 'register']); // Admin self-registration
});

// =======================
// Public routes (no authentication required)
// =======================
Route::middleware('sanitize')->group(function () {
    // Public shelter browsing
    Route::get('shelters', [ShelterController::class, 'index']);             // All shelters
    Route::get('shelters/{id}', [ShelterController::class, 'show']);         // Single shelter details
    Route::get('shelters/{shelter_id}/pets', [PetController::class, 'getPetsByShelter']); // Pets by shelter
    
    // Public pet browsing
    Route::get('pets', [PetController::class, 'index']);                     // All pets
    Route::get('pets/available', [PetController::class, 'available']);       // Available pets
    Route::get('pets/reserved', [PetController::class, 'reserved']);         // Reserved pets
    Route::get('pets/adopted', [PetController::class, 'adopted']);           // Adopted pets
    Route::get('pets/{id}', [PetController::class, 'show']);                 // Single pet details
});

// =======================
// Protected routes (require authentication)
// =======================
Route::middleware(['auth:sanctum', 'sanitize'])->group(function () {
    
    // Authentication management
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);         // Logout current device
        // curl -X POST http://127.0.0.1:8000/api/auth/logout \
        //     -H "Authorization: Bearer {token}"
        Route::post('logout-all', [AuthController::class, 'logoutAll']);  // Logout all devices
        // curl -X POST http://127.0.0.1:8000/api/auth/logout-all \
        //     -H "Authorization: Bearer {token}"
        Route::get('me', [AuthController::class, 'me']);                   // Get current user
        // curl -X GET http://127.0.0.1:8000/api/auth/me \
        //     -H "Authorization: Bearer {token}"
        Route::post('refresh', [AuthController::class, 'refresh']);        // Refresh token
        // curl -X POST http://127.0.0.1:8000/api/auth/refresh \
        //     -H "Authorization: Bearer {token}"
    });

    // =======================
    // Admin routes (admin-only management)
    // =======================
    Route::prefix('admins')->group(function () {
        // Admin can update their own profile
        Route::middleware('user.type:admin')->put('me', [AdminController::class, 'updateSelf']); // Update own profile
        // curl -X PUT http://127.0.0.1:8000/api/admins/me \
        //     -H "Authorization: Bearer {token}" \
        //     -H "Content-Type: application/json" \
        //     -d "{\"name\":\"Jane D\",\"email\":\"jane@example.com\"}"
        
        // Admin-only management
        Route::middleware('user.type:admin')->group(function () {
            Route::get('/', [AdminController::class, 'index']);               // View all admins
            // curl -X GET http://127.0.0.1:8000/api/admins \
            //     -H "Authorization: Bearer {token}"
            Route::get('{id}', [AdminController::class, 'show']);             // View a specific admin
            // curl -X GET http://127.0.0.1:8000/api/admins/1 \
            //     -H "Authorization: Bearer {token}"
            Route::post('register', [AdminController::class, 'register']);    // Register new admin
            // curl -X POST http://127.0.0.1:8000/api/admins/register \
            //     -H "Authorization: Bearer {token}" \
            //     -H "Content-Type: application/json" \
            //     -d "{\"name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"password\":\"secret\"}"
            Route::put('{id}', [AdminController::class, 'update']);           // Update admin info
            // curl -X PUT http://127.0.0.1:8000/api/admins/1 \
            //     -H "Authorization: Bearer {token}" \
            //     -H "Content-Type: application/json" \
            //     -d "{\"name\":\"Jane D\",\"email\":\"jane@example.com\"}"
            Route::delete('{id}', [AdminController::class, 'destroy']);       // Delete admin
            // curl -X DELETE http://127.0.0.1:8000/api/admins/1 \
            //     -H "Authorization: Bearer {token}"
            Route::get('{id}/shelters', [ShelterController::class, 'getSheltersByAdmin']); // Get shelters managed by admin
            // curl -X GET http://127.0.0.1:8000/api/admins/1/shelters \
            //     -H "Authorization: Bearer {token}"
        });
    });

    // =======================
    // Shelter routes (admin write operations)
    // =======================
    Route::prefix('shelters')->middleware('user.type:admin')->group(function () {
        Route::post('/', [ShelterController::class, 'store']);        // Create shelter
        Route::put('{id}', [ShelterController::class, 'update']);     // Update shelter
        Route::delete('{id}', [ShelterController::class, 'destroy']); // Delete shelter
    });

    // =======================
    // Pet routes (admin write operations)
    // =======================
    Route::prefix('pets')->middleware('user.type:admin')->group(function () {
        Route::post('/', [PetController::class, 'store']);            // Create pet
        Route::put('{id}', [PetController::class, 'update']);         // Update pet
        Route::delete('{id}', [PetController::class, 'destroy']);     // Delete pet
    });

    // =======================
    // Adopter routes
    // =======================
    Route::prefix('adopters')->group(function () {
        // Adopter can update their own profile
        Route::middleware('user.type:adopter')->put('me', [AdopterController::class, 'updateSelf']); // Update own profile
        // curl -X PUT http://127.0.0.1:8000/api/adopters/me \
        //     -H "Authorization: Bearer {token}" \
        //     -H "Content-Type: application/json" \
        //     -d "{\"phone\":\"555-9999\"}"
        
        // Admin-only management
        Route::middleware('user.type:admin')->group(function () {
            Route::get('/', [AdopterController::class, 'index']);             // All adopters
            Route::get('{id}', [AdopterController::class, 'show']);           // Single adopter
            Route::put('{id}', [AdopterController::class, 'update']);         // Update adopter
            Route::delete('{id}', [AdopterController::class, 'destroy']);     // Delete adopter
            Route::get('{adopter_id}/adoptions', [AdoptionController::class, 'getByAdopter']); // Adoption requests by adopter
        });
    });

    // =======================
    // 📋 ADOPTION REQUEST ROUTES
    // =======================
    Route::prefix('adoptions')->group(function () {
        // Adopter can submit a request and get their own requests
        Route::middleware('user.type:adopter')->group(function () {
            Route::post('/', [AdoptionController::class, 'store']);              // Submit adoption request
            Route::get('me', [AdoptionController::class, 'getMyAdoptions']);      // Get own adoption requests
        });
        
        // Admin-only management
        Route::middleware('user.type:admin')->group(function () {
            Route::get('/', [AdoptionController::class, 'index']);                 // All adoption requests
            Route::get('{id}', [AdoptionController::class, 'show']);               // Single adoption request
            Route::put('{id}', [AdoptionController::class, 'updateStatus']);       // Update adoption request status / notes
            Route::delete('{id}', [AdoptionController::class, 'destroy']);         // Delete adoption request
            Route::get('pet/{pet_id}', [AdoptionController::class, 'getByPet']);   // Requests for specific pet
        });
    });

    // =======================
    // 🩺 VET VISIT ROUTES (Admin only management)
    // =======================
    Route::middleware('user.type:admin')->prefix('vet-visits')->group(function () {
        Route::get('/', [VetVisitController::class, 'index']);            // All visits
        // curl -X GET http://127.0.0.1:8000/api/vet-visits \
        //     -H "Authorization: Bearer {token}"
        Route::get('{id}', [VetVisitController::class, 'show']);          // Single visit
        // curl -X GET http://127.0.0.1:8000/api/vet-visits/1 \
        //     -H "Authorization: Bearer {token}"
        Route::post('/', [VetVisitController::class, 'store']);           // Record new visit
        // curl -X POST http://127.0.0.1:8000/api/vet-visits \
        //     -H "Authorization: Bearer {token}" \
        //     -H "Content-Type: application/json" \
        //     -d "{\"pet_id\":1,\"visit_date\":\"2025-01-10\",\"notes\":\"Vaccines\"}"
        Route::put('{id}', [VetVisitController::class, 'update']);        // Update visit
        // curl -X PUT http://127.0.0.1:8000/api/vet-visits/1 \
        //     -H "Authorization: Bearer {token}" \
        //     -H "Content-Type: application/json" \
        //     -d "{\"notes\":\"Updated notes\"}"
        Route::delete('{id}', [VetVisitController::class, 'destroy']);    // Delete visit
        // curl -X DELETE http://127.0.0.1:8000/api/vet-visits/1 \
        //     -H "Authorization: Bearer {token}"
    });

    // =======================
    // 📊 REPORT ROUTES (Admin only)
    // =======================
    Route::middleware('user.type:admin')->prefix('reports')->group(function () {
        Route::get('shelter/{id}', [ReportController::class, 'shelterSummary']); // Shelter report summary
        // curl -X GET http://127.0.0.1:8000/api/reports/shelter/1 \
        //     -H "Authorization: Bearer {token}"
        Route::get('pets', [ReportController::class, 'petsSummary']);     // General pet reports (optional)
        // curl -X GET http://127.0.0.1:8000/api/reports/pets \
        //     -H "Authorization: Bearer {token}"
    });

    // =======================
    // 🔔 NOTIFICATION ROUTES (Admin only)
    // =======================
    Route::middleware('user.type:admin')->prefix('notifications')->group(function () {
        Route::get('/', [NotificationController::class, 'index']);        // All notifications
        // curl -X GET http://127.0.0.1:8000/api/notifications \
        //     -H "Authorization: Bearer {token}"
        Route::get('{id}', [NotificationController::class, 'show']);      // Single notification
        // curl -X GET http://127.0.0.1:8000/api/notifications/1 \
        //     -H "Authorization: Bearer {token}"
    });

    // =======================
    // 📁 FILE UPLOAD ROUTES (Admin only)
    // =======================
    Route::middleware('user.type:admin')->prefix('files')->group(function () {
        Route::post('pet-photo', [FileUploadController::class, 'uploadPetPhoto']);        // Upload pet photo
        // curl -X POST http://127.0.0.1:8000/api/files/pet-photo \
        //     -H "Authorization: Bearer {token}" \
        //     -F "photo=@/path/to/pet.jpg"
        Route::post('adopter-document', [FileUploadController::class, 'uploadAdopterDocument']); // Upload adopter document
        // curl -X POST http://127.0.0.1:8000/api/files/adopter-document \
        //     -H "Authorization: Bearer {token}" \
        //     -F "document=@/path/to/id.pdf"
        Route::post('vet-document', [FileUploadController::class, 'uploadVetDocument']);  // Upload vet document
        // curl -X POST http://127.0.0.1:8000/api/files/vet-document \
        //     -H "Authorization: Bearer {token}" \
        //     -F "document=@/path/to/report.pdf"
        Route::get('get', [FileUploadController::class, 'getFile']);                       // Get file by path
        // curl -X GET "http://127.0.0.1:8000/api/files/get?path=pet-photo%2Fpet.jpg" \
        //     -H "Authorization: Bearer {token}"
        Route::delete('delete', [FileUploadController::class, 'deleteFile']);              // Delete file
        // curl -X DELETE "http://127.0.0.1:8000/api/files/delete?path=pet-photo%2Fpet.jpg" \
        //     -H "Authorization: Bearer {token}"
        Route::get('list', [FileUploadController::class, 'listFiles']);                    // List files by type
        // curl -X GET "http://127.0.0.1:8000/api/files/list?type=pet-photo" \
        //     -H "Authorization: Bearer {token}"
    });
});

