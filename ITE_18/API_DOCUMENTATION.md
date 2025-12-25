# Pet Adoption System API Documentation

## Overview
This API provides comprehensive functionality for managing a pet adoption system with 10 distinct API modules. All endpoints require authentication using Laravel Sanctum tokens.

**Base URL:** `http://localhost/ITE_18/ITE_18/public/api`

## Full URL Reference (if running with `php artisan serve`)

Use this base: `http://localhost:8000/api`

- Authentication
  - POST `http://localhost:8000/api/auth/admin/login` — Admin login, returns token and admin info
    - Postman: Method POST, Headers Accept+Content-Type application/json, Body raw JSON:
      ```json
      { "email": "admin@example.com", "password": "password123" }
      ```
  - POST `http://localhost:8000/api/auth/adopter/login` — Adopter login, returns token and adopter info
    - Postman: Method POST, Headers Accept+Content-Type application/json, Body raw JSON:
      ```json
      { "email": "adopter@example.com" }
      ```
  - POST `http://localhost:8000/api/auth/logout` — Revoke the current device’s token
    - Postman: Method POST, Headers Accept application/json + Authorization: Bearer {token}
  - POST `http://localhost:8000/api/auth/logout-all` — Revoke all tokens for the current user
    - Postman: Method POST, Headers Accept application/json + Authorization: Bearer {token}
  - GET  `http://localhost:8000/api/auth/me` — Get the currently authenticated user and user_type
    - Postman: Method GET, Headers Accept application/json + Authorization: Bearer {token}
  - POST `http://localhost:8000/api/auth/refresh` — Invalidate current token and issue a new one
    - Postman: Method POST, Headers Accept application/json + Authorization: Bearer {token}

- Admins [Admin Only]
  - GET  `http://localhost:8000/api/admins` — List all admins
  - GET  `http://localhost:8000/api/admins/{id}` — Get details for a specific admin
  - POST `http://localhost:8000/api/admins/register` — Create an admin and their initial shelter
    - Postman: Method POST, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      {
        "name": "New Admin",
        "email": "newadmin@example.com",
        "password": "password123",
        "phone": "+1234567890",
        "shelter": {
          "shelter_name": "New Shelter",
          "location": "123 Main St",
          "contact_info": "Contact us",
          "staff_name": "Staff Member",
          "staff_email": "staff@example.com",
          "staff_phone": "+1234567890"
        }
      }
      ```
  - PUT  `http://localhost:8000/api/admins/{id}` — Update admin fields
    - Postman: Method PUT, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body (example):
      ```json
      { "name": "Updated Name", "email": "updated@example.com", "phone": "+9876543210" }
      ```
  - DELETE `http://localhost:8000/api/admins/{id}` — Delete an admin
    - Postman: Method DELETE, Headers Accept application/json + Authorization: Bearer {token}
  - GET  `http://localhost:8000/api/admins/{id}/shelters` — Shelters managed by the admin

- Shelters [Any Authenticated]
  - GET  `http://localhost:8000/api/shelters` — List all shelters with admin info
  - GET  `http://localhost:8000/api/shelters/{id}` — Full details for one shelter, with pets
  - POST `http://localhost:8000/api/shelters` — Create a shelter
    - Postman: Method POST, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "admin_id": 1, "shelter_name": "New Shelter", "staff_name": "Staff", "staff_email": "staff@example.com", "staff_phone": "+1234567890", "location": "456 Oak St", "contact_info": "Call us" }
      ```
  - PUT  `http://localhost:8000/api/shelters/{id}` — Update a shelter
    - Postman: Method PUT, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body (example):
      ```json
      { "shelter_name": "Updated Shelter Name", "location": "789 Pine St" }
      ```
  - DELETE `http://localhost:8000/api/shelters/{id}` — Delete a shelter
    - Postman: Method DELETE, Headers Accept application/json + Authorization: Bearer {token}

- Pets [Any Authenticated]
  - GET  `http://localhost:8000/api/pets` — List all pets
  - GET  `http://localhost:8000/api/pets/available` — Pets available for adoption
  - GET  `http://localhost:8000/api/pets/reserved` — Pets marked reserved
  - GET  `http://localhost:8000/api/pets/adopted` — Pets marked adopted
  - GET  `http://localhost:8000/api/pets/{id}` — Details for a specific pet
  - POST `http://localhost:8000/api/pets` — Create a pet record
    - Postman: Method POST, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "shelter_id": 1, "name": "Max", "species": "Cat", "breed": "Persian", "age": 2, "gender": "Female", "weight": 4.2, "health_status": "Healthy", "food_preferences": "Wet food", "adoption_status": "Available", "date_admitted": "2024-01-15", "description": "Calm" }
      ```
  - PUT  `http://localhost:8000/api/pets/{id}` — Update a pet record
    - Postman: Method PUT, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body (example):
      ```json
      { "name": "Max Updated", "age": 3, "health_status": "Needs checkup" }
      ```
  - DELETE `http://localhost:8000/api/pets/{id}` — Delete a pet
    - Postman: Method DELETE, Headers Accept application/json + Authorization: Bearer {token}

- Adopters [Any Authenticated]
  - GET  `http://localhost:8000/api/adopters` — List all adopters
  - GET  `http://localhost:8000/api/adopters/{id}` — Get a single adopter
  - POST `http://localhost:8000/api/adopters/register` — Create a new adopter
    - Postman: Method POST, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "first_name": "New", "last_name": "Adopter", "email": "newadopter@example.com", "phone": "+1234567890", "address": "456 Pine St", "birth_date": "1985-05-15", "occupation": "Engineer", "company_name": "Tech Corp", "pronouns": "they/them" }
      ```
  - PUT  `http://localhost:8000/api/adopters/{id}` — Update an adopter
    - Postman: Method PUT, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body (example):
      ```json
      { "phone": "+9876543210", "address": "789 Elm St", "occupation": "Senior Engineer" }
      ```
  - DELETE `http://localhost:8000/api/adopters/{id}` — Delete an adopter
    - Postman: Method DELETE, Headers Accept application/json + Authorization: Bearer {token}

- Adoption Requests [Any Authenticated]
  - GET  `http://localhost:8000/api/adoptions` — List all adoption requests
  - GET  `http://localhost:8000/api/adoptions/{id}` — Get one adoption request
  - POST `http://localhost:8000/api/adoptions` — Create an adoption request
    - Postman: Method POST, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "adopter_id": 1, "pet_id": 1, "application_date": "2024-01-15", "online_interview_date": "2024-01-20", "online_interview_time": "14:00", "meet_greet": "Yes", "reason_for_adoption": "Companion", "adoption_status": "Pending", "notes": "Initial" }
      ```
  - PATCH `http://localhost:8000/api/adoptions/{id}/status` — Update adoption status
    - Postman: Method PATCH, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "adoption_status": "Approved", "notes": "Approved after interview" }
      ```
  - PATCH `http://localhost:8000/api/adoptions/{id}/interview` — Update interview schedule
    - Postman: Method PATCH, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "online_interview_date": "2024-01-25", "online_interview_time": "15:00" }
      ```
  - DELETE `http://localhost:8000/api/adoptions/{id}` — Delete an adoption request
    - Postman: Method DELETE, Headers Accept application/json + Authorization: Bearer {token}
  - GET  `http://localhost:8000/api/adoptions/pet/{pet_id}` — Requests for a specific pet

- Vet Visits [Any Authenticated]
  - GET  `http://localhost:8000/api/vet-visits` — List all veterinary visits
  - GET  `http://localhost:8000/api/vet-visits/{id}` — Get a single vet visit
  - POST `http://localhost:8000/api/vet-visits` — Record a new vet visit
    - Postman: Method POST, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "pet_id": 1, "vet_name": "Dr. Johnson", "visit_date": "2024-01-15", "purpose": "Health check", "diagnosis": "Minor infection", "treatment": "Antibiotics", "remarks": "Recovering", "next_visit_due": "2024-02-15" }
      ```
  - PUT  `http://localhost:8000/api/vet-visits/{id}` — Update a vet visit
    - Postman: Method PUT, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body (example):
      ```json
      { "diagnosis": "Fully recovered", "treatment": "None", "remarks": "Healthy" }
      ```
  - DELETE `http://localhost:8000/api/vet-visits/{id}` — Delete a vet visit
    - Postman: Method DELETE, Headers Accept application/json + Authorization: Bearer {token}

- Reports [Any Authenticated]
  - GET  `http://localhost:8000/api/reports/shelter/{id}` — Summary for one shelter (counts)
  - GET  `http://localhost:8000/api/reports/pets` — Overall pet counts by status

- Notifications [Any Authenticated]
  - GET  `http://localhost:8000/api/notifications` — List notifications (optionally filter by adopter_id)
  - GET  `http://localhost:8000/api/notifications/{id}` — Get one notification

- Files [Any Authenticated]
  - POST `http://localhost:8000/api/files/pet-photo` — Upload a pet photo
    - Postman: Method POST, Headers Accept application/json + Authorization: Bearer {token}, Body form-data:
      - file: select image file
      - pet_id: 1
  - POST `http://localhost:8000/api/files/adopter-document` — Upload adopter document (valid_id/home_photos)
    - Postman: Method POST, Headers Accept application/json + Authorization: Bearer {token}, Body form-data:
      - file: select file (jpg/png/pdf)
      - adopter_id: 1
      - document_type: valid_id | home_photos
  - POST `http://localhost:8000/api/files/vet-document` — Upload vet document (diagnosis/treatment/prescription)
    - Postman: Method POST, Headers Accept application/json + Authorization: Bearer {token}, Body form-data:
      - file: select file (jpg/png/pdf)
      - visit_id: 1
      - document_type: diagnosis | treatment | prescription
  - GET  `http://localhost:8000/api/files/get?path=...` — Download a stored file
    - Postman: Method GET, Headers Accept application/json + Authorization: Bearer {token}
  - DELETE `http://localhost:8000/api/files/delete` — Delete a stored file
    - Postman: Method DELETE, Headers Accept+Content-Type application/json + Authorization: Bearer {token}, Body:
      ```json
      { "path": "public/pet-photos/pet_1_1640995200.jpg" }
      ```
  - GET  `http://localhost:8000/api/files/list?type=...` — List files by type with URLs
    - Postman: Method GET, Headers Accept application/json + Authorization: Bearer {token}

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer {your-token}
```

---

## Error Responses

### 401 Unauthorized
```json
{
    "message": "Unauthenticated."
}
```

### 404 Not Found
```json
{
    "message": "Not found"
}
```

### 422 Validation Error
```json
{
    "message": "The given data was invalid.",
    "errors": {
        "email": ["The email field is required."],
        "password": ["The password field is required."]
    }
}
```

### 429 Too Many Requests
```json
{
    "message": "Too Many Attempts."
}
```

---

## Rate Limiting
- API endpoints are rate-limited to 60 requests per minute per user
- Authentication endpoints have stricter limits: 5 requests per minute

## Security Features
- All endpoints require authentication (except login endpoints)
- Input validation on all requests
- SQL injection protection via Eloquent ORM
- File upload restrictions and validation
- Rate limiting to prevent abuse
- CSRF protection for state-changing operations

## HTTP Status Codes
- `200` - Success
- `201` - Created
- `204` - No Content (for deletions)
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Server Error
