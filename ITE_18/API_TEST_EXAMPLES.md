````markdown
# API Testing Examples

## Testing the Pet Adoption System APIs

This document provides practical examples for testing all 10 API modules using curl commands.

**Base URL:** `http://localhost/ITE_18/ITE_18/public/api`

---

## 🔐 Authentication Testing

### 1. Admin Login
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
    "message": "Login successful",
    "admin": {
        "admin_id": 1,
        "name": "John Admin",
        "email": "admin@example.com"
    },
    "token": "1|abc123...",
    "token_type": "Bearer"
}
```

### 2. Adopter Login
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/auth/adopter/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "adopter@example.com"
  }'
```

### 3. Get Current User
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🏢 Admin API Testing

### 1. Get All Admins
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/admins \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 2. Register New Admin
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/admins/register \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### 3. Update Admin
```bash
curl -X PUT http://localhost/ITE_18/ITE_18/public/api/admins/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Admin Name",
    "phone": "+9876543210"
  }'
```

---

## 🏠 Shelter API Testing

### 1. Get All Shelters
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/shelters \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Create Shelter
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/shelters \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "admin_id": 1,
    "shelter_name": "Happy Paws Shelter",
    "staff_name": "John Staff",
    "staff_email": "staff@example.com",
    "staff_phone": "+1234567890",
    "location": "123 Main St",
    "contact_info": "Call us"
  }'
```

### 3. Get Single Shelter
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/shelters/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐾 Pet API Testing

### 1. Get All Pets
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/pets \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Get Available Pets
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/pets/available \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Create Pet
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/pets \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shelter_id": 1,
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 3,
    "gender": "Male",
    "weight": 25.5,
    "health_status": "Healthy",
    "food_preferences": "Dry food",
    "adoption_status": "Available",
    "date_admitted": "2024-01-01",
    "description": "Friendly and energetic"
  }'
```

### 4. Update Pet
```bash
curl -X PUT http://localhost/ITE_18/ITE_18/public/api/pets/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy Updated",
    "age": 4,
    "health_status": "Very Healthy"
  }'
```

---

## 👤 Adopter API Testing

### 1. Get All Adopters
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/adopters \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Register Adopter
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/adopters/register \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "address": "123 Oak St",
    "birth_date": "1990-01-01",
    "occupation": "Teacher",
    "company_name": "Local School",
    "pronouns": "she/her"
  }'
```

### 3. Update Adopter
```bash
curl -X PUT http://localhost/ITE_18/ITE_18/public/api/adopters/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+9876543210",
    "address": "456 Pine St",
    "occupation": "Senior Teacher"
  }'
```

---

## 📋 Adoption Request API Testing

### 1. Get All Adoption Requests
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/adoptions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Create Adoption Request
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/adoptions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "adopter_id": 1,
    "pet_id": 1,
    "application_date": "2024-01-15",
    "online_interview_date": "2024-01-20",
    "online_interview_time": "14:00",
    "meet_greet": "Yes",
    "reason_for_adoption": "Looking for a companion",
    "adoption_status": "Pending",
    "notes": "Great candidate"
  }'
```

### 3. Update Adoption Status
```bash
curl -X PATCH http://localhost/ITE_18/ITE_18/public/api/adoptions/1/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "adoption_status": "Approved",
    "notes": "Approved after successful interview"
  }'
```

### 4. Update Interview Details
```bash
curl -X PATCH http://localhost/ITE_18/ITE_18/public/api/adoptions/1/interview \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "online_interview_date": "2024-01-25",
    "online_interview_time": "15:00"
  }'
```

---

## 🩺 Vet Visit API Testing

### 1. Get All Vet Visits
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/vet-visits \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Create Vet Visit
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/vet-visits \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pet_id": 1,
    "vet_name": "Dr. Smith",
    "visit_date": "2024-01-15",
    "purpose": "Health check",
    "diagnosis": "Healthy",
    "treatment": "Vaccination",
    "remarks": "Pet is in good health",
    "next_visit_due": "2024-04-15"
  }'
```

### 3. Update Vet Visit
```bash
curl -X PUT http://localhost/ITE_18/ITE_18/public/api/vet-visits/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "diagnosis": "Minor infection detected",
    "treatment": "Antibiotics prescribed",
    "remarks": "Recovering well"
  }'
```

---

## 📊 Report API Testing

### 1. Get Shelter Summary
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/reports/shelter/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Get Pets Summary
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/reports/pets \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔔 Notification API Testing

### 1. Get All Notifications
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Get Notifications by Adopter
```bash
curl -X GET "http://localhost/ITE_18/ITE_18/public/api/notifications?adopter_id=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📁 File Upload API Testing

### 1. Upload Pet Photo
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/files/pet-photo \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/pet-photo.jpg" \
  -F "pet_id=1"
```

### 2. Upload Adopter Document
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/files/adopter-document \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "adopter_id=1" \
  -F "document_type=valid_id"
```

### 3. Upload Vet Document
```bash
curl -X POST http://localhost/ITE_18/ITE_18/public/api/files/vet-document \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/vet-report.pdf" \
  -F "visit_id=1" \
  -F "document_type=diagnosis"
```

### 4. List Files
```bash
curl -X GET "http://localhost/ITE_18/ITE_18/public/api/files/list?type=pet-photos" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Delete File
```bash
curl -X DELETE http://localhost/ITE_18/ITE_18/public/api/files/delete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "public/pet-photos/pet_1_1640995200.jpg"
  }'
```

---

## Error Testing

### 1. Test Unauthorized Access
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/admins
# Should return 401 Unauthorized
```

### 2. Test Invalid Token
```bash
curl -X GET http://localhost/ITE_18/ITE_18/public/api/admins \
  -H "Authorization: Bearer invalid_token"
# Should return 401 Unauthorized
```

### 3. Test Wrong User Type
```bash
# Login as adopter, then try to access admin-only endpoint
curl -X GET http://localhost/ITE_18/ITE_18/public/api/admins \
  -H "Authorization: Bearer ADOPTER_TOKEN"
# Should return 403 Forbidden
```

### 4. Test Rate Limiting
```bash
# Make multiple requests quickly to test rate limiting
for i in {1..70}; do
  curl -X GET http://localhost/ITE_18/ITE_18/public/api/pets \
    -H "Authorization: Bearer YOUR_TOKEN"
done
# Should eventually return 429 Too Many Requests
```

---

## Complete Test Sequence

Here's a complete test sequence to verify all APIs:

1. **Setup:**
   ```bash
   # First, run migrations and seeders
   php artisan migrate
   php artisan db:seed
   ```

2. **Authentication:**
   ```bash
   # Login as admin
   ADMIN_TOKEN=$(curl -s -X POST http://localhost/ITE_18/ITE_18/public/api/auth/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password123"}' | jq -r '.token')
   
   # Login as adopter
   ADOPTER_TOKEN=$(curl -s -X POST http://localhost/ITE_18/ITE_18/public/api/auth/adopter/login \
     -H "Content-Type: application/json" \
     -d '{"email":"adopter@example.com"}' | jq -r '.token')
   ```

3. **Test All Endpoints:**
   ```bash
   # Test each API module with the appropriate token
   # Use the examples above with the tokens obtained
   ```

This comprehensive testing approach ensures all 10 API modules are functioning correctly with proper authentication, authorization, and security measures in place.

````
# API Testing Examples

## Testing the Pet Adoption System APIs

This document provides practical examples for testing all 10 API modules using curl commands.

**Base URL:** `http://localhost/ITE_18/public/api`

---

## 🔐 Authentication Testing

### 1. Admin Login
```bash
curl -X POST http://localhost/ITE_18/public/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
    "message": "Login successful",
    "admin": {
        "admin_id": 1,
        "name": "John Admin",
        "email": "admin@example.com"
    },
    "token": "1|abc123...",
    "token_type": "Bearer"
}
```

### 2. Adopter Login
```bash
curl -X POST http://localhost/ITE_18/public/api/auth/adopter/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "adopter@example.com"
  }'
```

### 3. Get Current User
```bash
curl -X GET http://localhost/ITE_18/public/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🏢 Admin API Testing

### 1. Get All Admins
```bash
curl -X GET http://localhost/ITE_18/public/api/admins \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

### 2. Register New Admin
```bash
curl -X POST http://localhost/ITE_18/public/api/admins/register \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

### 3. Update Admin
```bash
curl -X PUT http://localhost/ITE_18/public/api/admins/1 \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Admin Name",
    "phone": "+9876543210"
  }'
```

---

## 🏠 Shelter API Testing

### 1. Get All Shelters
```bash
curl -X GET http://localhost/ITE_18/public/api/shelters \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Create Shelter
```bash
curl -X POST http://localhost/ITE_18/public/api/shelters \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "admin_id": 1,
    "shelter_name": "Happy Paws Shelter",
    "staff_name": "John Staff",
    "staff_email": "staff@example.com",
    "staff_phone": "+1234567890",
    "location": "123 Main St",
    "contact_info": "Call us"
  }'
```

### 3. Get Single Shelter
```bash
curl -X GET http://localhost/ITE_18/public/api/shelters/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🐾 Pet API Testing

### 1. Get All Pets
```bash
curl -X GET http://localhost/ITE_18/public/api/pets \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Get Available Pets
```bash
curl -X GET http://localhost/ITE_18/public/api/pets/available \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Create Pet
```bash
curl -X POST http://localhost/ITE_18/public/api/pets \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shelter_id": 1,
    "name": "Buddy",
    "species": "Dog",
    "breed": "Golden Retriever",
    "age": 3,
    "gender": "Male",
    "weight": 25.5,
    "health_status": "Healthy",
    "food_preferences": "Dry food",
    "adoption_status": "Available",
    "date_admitted": "2024-01-01",
    "description": "Friendly and energetic"
  }'
```

### 4. Update Pet
```bash
curl -X PUT http://localhost/ITE_18/public/api/pets/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Buddy Updated",
    "age": 4,
    "health_status": "Very Healthy"
  }'
```

---

## 👤 Adopter API Testing

### 1. Get All Adopters
```bash
curl -X GET http://localhost/ITE_18/public/api/adopters \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Register Adopter
```bash
curl -X POST http://localhost/ITE_18/public/api/adopters/register \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "address": "123 Oak St",
    "birth_date": "1990-01-01",
    "occupation": "Teacher",
    "company_name": "Local School",
    "pronouns": "she/her"
  }'
```

### 3. Update Adopter
```bash
curl -X PUT http://localhost/ITE_18/public/api/adopters/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+9876543210",
    "address": "456 Pine St",
    "occupation": "Senior Teacher"
  }'
```

---

## 📋 Adoption Request API Testing

### 1. Get All Adoption Requests
```bash
curl -X GET http://localhost/ITE_18/public/api/adoptions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Create Adoption Request
```bash
curl -X POST http://localhost/ITE_18/public/api/adoptions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "adopter_id": 1,
    "pet_id": 1,
    "application_date": "2024-01-15",
    "online_interview_date": "2024-01-20",
    "online_interview_time": "14:00",
    "meet_greet": "Yes",
    "reason_for_adoption": "Looking for a companion",
    "adoption_status": "Pending",
    "notes": "Great candidate"
  }'
```

### 3. Update Adoption Status
```bash
curl -X PATCH http://localhost/ITE_18/public/api/adoptions/1/status \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "adoption_status": "Approved",
    "notes": "Approved after successful interview"
  }'
```

### 4. Update Interview Details
```bash
curl -X PATCH http://localhost/ITE_18/public/api/adoptions/1/interview \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "online_interview_date": "2024-01-25",
    "online_interview_time": "15:00"
  }'
```

---

## 🩺 Vet Visit API Testing

### 1. Get All Vet Visits
```bash
curl -X GET http://localhost/ITE_18/public/api/vet-visits \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Create Vet Visit
```bash
curl -X POST http://localhost/ITE_18/public/api/vet-visits \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pet_id": 1,
    "vet_name": "Dr. Smith",
    "visit_date": "2024-01-15",
    "purpose": "Health check",
    "diagnosis": "Healthy",
    "treatment": "Vaccination",
    "remarks": "Pet is in good health",
    "next_visit_due": "2024-04-15"
  }'
```

### 3. Update Vet Visit
```bash
curl -X PUT http://localhost/ITE_18/public/api/vet-visits/1 \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "diagnosis": "Minor infection detected",
    "treatment": "Antibiotics prescribed",
    "remarks": "Recovering well"
  }'
```

---

## 📊 Report API Testing

### 1. Get Shelter Summary
```bash
curl -X GET http://localhost/ITE_18/public/api/reports/shelter/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Get Pets Summary
```bash
curl -X GET http://localhost/ITE_18/public/api/reports/pets \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔔 Notification API Testing

### 1. Get All Notifications
```bash
curl -X GET http://localhost/ITE_18/public/api/notifications \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 2. Get Notifications by Adopter
```bash
curl -X GET "http://localhost/ITE_18/public/api/notifications?adopter_id=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📁 File Upload API Testing

### 1. Upload Pet Photo
```bash
curl -X POST http://localhost/ITE_18/public/api/files/pet-photo \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/pet-photo.jpg" \
  -F "pet_id=1"
```

### 2. Upload Adopter Document
```bash
curl -X POST http://localhost/ITE_18/public/api/files/adopter-document \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/document.pdf" \
  -F "adopter_id=1" \
  -F "document_type=valid_id"
```

### 3. Upload Vet Document
```bash
curl -X POST http://localhost/ITE_18/public/api/files/vet-document \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/vet-report.pdf" \
  -F "visit_id=1" \
  -F "document_type=diagnosis"
```

### 4. List Files
```bash
curl -X GET "http://localhost/ITE_18/public/api/files/list?type=pet-photos" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 5. Delete File
```bash
curl -X DELETE http://localhost/ITE_18/public/api/files/delete \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "public/pet-photos/pet_1_1640995200.jpg"
  }'
```

---

## Error Testing

### 1. Test Unauthorized Access
```bash
curl -X GET http://localhost/ITE_18/public/api/admins
# Should return 401 Unauthorized
```

### 2. Test Invalid Token
```bash
curl -X GET http://localhost/ITE_18/public/api/admins \
  -H "Authorization: Bearer invalid_token"
# Should return 401 Unauthorized
```

### 3. Test Wrong User Type
```bash
# Login as adopter, then try to access admin-only endpoint
curl -X GET http://localhost/ITE_18/public/api/admins \
  -H "Authorization: Bearer ADOPTER_TOKEN"
# Should return 403 Forbidden
```

### 4. Test Rate Limiting
```bash
# Make multiple requests quickly to test rate limiting
for i in {1..70}; do
  curl -X GET http://localhost/ITE_18/public/api/pets \
    -H "Authorization: Bearer YOUR_TOKEN"
done
# Should eventually return 429 Too Many Requests
```

---

## Complete Test Sequence

Here's a complete test sequence to verify all APIs:

1. **Setup:**
   ```bash
   # First, run migrations and seeders
   php artisan migrate
   php artisan db:seed
   ```

2. **Authentication:**
   ```bash
   # Login as admin
   ADMIN_TOKEN=$(curl -s -X POST http://localhost/ITE_18/public/api/auth/admin/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password123"}' | jq -r '.token')
   
   # Login as adopter
   ADOPTER_TOKEN=$(curl -s -X POST http://localhost/ITE_18/public/api/auth/adopter/login \
     -H "Content-Type: application/json" \
     -d '{"email":"adopter@example.com"}' | jq -r '.token')
   ```

3. **Test All Endpoints:**
   ```bash
   # Test each API module with the appropriate token
   # Use the examples above with the tokens obtained
   ```

This comprehensive testing approach ensures all 10 API modules are functioning correctly with proper authentication, authorization, and security measures in place.
