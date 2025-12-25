<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadController extends Controller
{
    /**
     * Upload pet photo
     */
    public function uploadPetPhoto(Request $request)
    {
        $request->validate([
            'file' => 'required|file|image|mimes:jpeg,png,jpg,gif|max:2048',
            'pet_id' => 'required|integer|exists:pets,pet_id'
        ]);

        $file = $request->file('file');
        $filename = 'pet_' . $request->pet_id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('public/pet-photos', $filename);

        return response()->json([
            'message' => 'Photo uploaded successfully',
            'filename' => $filename,
            'path' => $path,
            'url' => Storage::url($path)
        ], 201);
    }

    /**
     * Upload adopter document
     */
    public function uploadAdopterDocument(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpeg,png,jpg|max:5120', // 5MB max
            'adopter_id' => 'required|integer|exists:adopters,adopter_id',
            'document_type' => 'required|in:valid_id,home_photos'
        ]);

        $file = $request->file('file');
        $filename = 'adopter_' . $request->adopter_id . '_' . $request->document_type . '_' . time() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('public/adopter-documents', $filename);

        return response()->json([
            'message' => 'Document uploaded successfully',
            'filename' => $filename,
            'path' => $path,
            'url' => Storage::url($path),
            'document_type' => $request->document_type
        ], 201);
    }

    /**
     * Upload vet visit document
     */
    public function uploadVetDocument(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpeg,png,jpg|max:5120',
            'visit_id' => 'required|integer|exists:vet_visits,visit_id',
            'document_type' => 'required|in:diagnosis,treatment,prescription'
        ]);

        $file = $request->file('file');
        $filename = 'vet_visit_' . $request->visit_id . '_' . $request->document_type . '_' . time() . '.' . $file->getClientOriginalExtension();
        $path = $file->storeAs('public/vet-documents', $filename);

        return response()->json([
            'message' => 'Vet document uploaded successfully',
            'filename' => $filename,
            'path' => $path,
            'url' => Storage::url($path),
            'document_type' => $request->document_type
        ], 201);
    }

    /**
     * Get file by URL
     */
    public function getFile(Request $request)
    {
        $request->validate([
            'path' => 'required|string'
        ]);

        if (!Storage::exists($request->path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return Storage::response($request->path);
    }

    /**
     * Delete file
     */
    public function deleteFile(Request $request)
    {
        $request->validate([
            'path' => 'required|string'
        ]);

        if (!Storage::exists($request->path)) {
            return response()->json(['message' => 'File not found'], 404);
        }

        Storage::delete($request->path);

        return response()->json(['message' => 'File deleted successfully']);
    }

    /**
     * List files by type
     */
    public function listFiles(Request $request)
    {
        $request->validate([
            'type' => 'required|in:pet-photos,adopter-documents,vet-documents'
        ]);

        $files = Storage::files('public/' . $request->type);
        $fileList = [];

        foreach ($files as $file) {
            $fileList[] = [
                'path' => $file,
                'url' => Storage::url($file),
                'size' => Storage::size($file),
                'last_modified' => Storage::lastModified($file)
            ];
        }

        return response()->json([
            'files' => $fileList,
            'count' => count($fileList)
        ]);
    }
}
