# Test Credentials for Pet Adoption System

## ✅ Backend Setup Complete

The database has been seeded with real data including pictures from Unsplash. All mock data has been removed and the frontend now connects to the Laravel backend.

---

## 🔐 Test Accounts

### **Admin Account**
- **Email:** `admin@test.com`
- **Password:** `admin123`
- **Name:** Admin Test
- **Phone:** +1234567890

**Additional Admin:**
- **Email:** `sarah.admin@happypaws.org`
- **Password:** `admin123`
- **Name:** Sarah Martinez
- **Phone:** +14155550123

---

### **Adopter Accounts**

**Account 1:**
- **Email:** `adopter@test.com`
- **Password:** `adopter123`
- **Name:** John Doe
- **Address:** 123 Main Street, San Francisco, CA 94102
- **Phone:** +14155551234

**Account 2:**
- **Email:** `emily.adopter@test.com`
- **Password:** `adopter123`
- **Name:** Emily Smith
- **Address:** 456 Oak Avenue, Los Angeles, CA 90012
- **Phone:** +12135559876

---

## 🏥 Seeded Data Overview

### **Shelters (4 total)**
1. Happy Paws Animal Shelter - San Francisco, CA
2. Second Chance Rescue - Los Angeles, CA
3. Furry Friends Haven - Seattle, WA
4. Golden Hearts Pet Sanctuary - Austin, TX

All shelters have:
- Real images from Unsplash
- Complete contact information
- Descriptions

### **Pets**
- Multiple pets per shelter
- Each pet has:
  - Real photo from Unsplash
  - Complete health information
  - Adoption status (available/reserved/adopted)
  - Vet visit history
  - Detailed descriptions

### **Adoption Requests**
- Sample adoption requests linking adopters to pets
- Various statuses (Pending, Approved, Declined)

### **Vet Visits**
- Medical history for pets
- Visit dates and notes
- Treatment information

---

## 🚀 How to Test

### 1. Start Backend (if not running)
```bash
cd C:\xampp\htdocs\ITE_18
php artisan serve
```

### 2. Start Frontend
```bash
cd C:\xampp\htdocs\ITE_18\frontend
npm run dev
```

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### 4. Login
1. Go to http://localhost:3000
2. Click "Login" or "Get Started"
3. Use one of the test credentials above
4. Choose "Admin" or "Adopter" role

---

## ✨ What You Can Test

### As Admin:
- ✅ View and manage all shelters
- ✅ Add/Edit/Delete pets with drag-drop photo upload
- ✅ View adoption requests
- ✅ Manage vet visit records
- ✅ Update shelter information
- ✅ Change pet adoption status
- ✅ View reports and analytics

### As Adopter:
- ✅ Browse available pets with real photos
- ✅ Filter pets by species, age, location
- ✅ View shelter information
- ✅ Submit adoption requests
- ✅ Track adoption application status
- ✅ Favorite pets
- ✅ Update profile with photo upload

---

## 🔄 Re-seed Database (if needed)

If you want to reset everything:

```bash
cd C:\xampp\htdocs\ITE_18
php artisan migrate:fresh --seed
```

This will:
- Drop all tables
- Recreate the schema
- Re-populate with fresh test data including all pictures

---

## 📝 Notes

- **USE_MOCK_API** is now set to `false` in `frontend/utils/api.ts`
- All data now comes from the Laravel backend
- Pictures are hosted on Unsplash (free, no expiration)
- All pet counts on shelter cards are now live and dynamic
- Profile pictures can be uploaded and are stored in localStorage
- Changes persist in the MySQL database

---

## 🐛 Troubleshooting

### Backend not responding?
1. Make sure XAMPP MySQL is running
2. Check `php artisan serve` is active
3. Verify database connection in `.env`

### Can't login?
1. Make sure you've run `php artisan migrate:fresh --seed`
2. Use exact credentials listed above (case-sensitive)
3. Check browser console for errors

### Pictures not showing?
1. Check internet connection (images from Unsplash)
2. Verify photo_url in database is not null
3. Check browser console for CORS errors

---

**Enjoy testing! 🎉**
