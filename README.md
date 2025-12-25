ITE_18 — Project README

# ⛺ Pet Adoption — Modern Pet Adoption Platform

A full-stack pet adoption application featuring a Laravel backend and a Next.js frontend, with features for shelters, pets, adopters, adoption requests, and veterinary visit tracking.

![Pet Adoption](https://img.shields.io/badge/Pet-Adoption-78C000?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Inertia](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge)

## 🏗️ Project Structure

ITE_18 — Project README

# ⛺ Pet Adoption — Modern Pet Adoption Platform

A full-stack pet adoption application featuring a Laravel backend and a Next.js frontend, with features for shelters, pets, adopters, adoption requests, and veterinary visit tracking.

![Pet Adoption](https://img.shields.io/badge/Pet-Adoption-78C000?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![Inertia](https://img.shields.io/badge/Inertia.js-2.0-9553E9?style=for-the-badge)

---

## 🎯 Features

### 🐾 Core Functionality
- Browse available pets with filters (species, shelter, status)
- Create/update/delete pets (admin)
- Adopt applications with status workflows (Pending → Interview → Approved/Rejected)
- Adopter profiles and document uploads
- Vet visit tracking per pet

### 🔐 Auth & Security
- Session-based authentication (Laravel Sanctum / standard sessions)
- Password hashing with bcrypt
- Input validation and CSRF protection

### ⚙️ Admin Tools
- Shelter management and staff contacts
- Approve/reject adoption requests and schedule interviews
- Seeders for test data and admin accounts

---

## 🚀 Quick Start

### Prerequisites
- PHP 8.1+ (recommended 8.2) with common extensions
- Composer
- Node.js 18+ and npm
- MySQL 8.0+ or MariaDB
- Git

### Installation

```bash
# Clone
git clone https://github.com/jharedmiguelpaderna/Pet-Adoption-.git
cd Pet-Adoption-

# Install backend deps
composer install

# Copy and update env
cp .env.example .env
# Edit .env: set DB_DATABASE, DB_USERNAME, DB_PASSWORD, APP_URL

# Key, migrate, seed
php artisan key:generate
php artisan migrate --seed
php artisan storage:link

# Start Laravel (dev)
php artisan serve --host=127.0.0.1 --port=8000

# Frontend
cd frontend
npm install
npm run dev
```

### Environment example (minimal)

```env
APP_NAME=PetAdoption
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pet_adoption
DB_USERNAME=root
DB_PASSWORD=
```

---

## 🗂️ Project Structure

```
Pet-Adoption-
├── app/                # Laravel app (models, controllers, middleware)
├── bootstrap/
├── config/
├── database/           # migrations & seeders
├── frontend/           # Next.js frontend (React + TypeScript)
├── public/             # web root
├── routes/             # api.php, web.php
└── README.md           # this file
```

---

## 🧰 Tech Stack

- Frontend: React 19, TypeScript, Next.js, Tailwind CSS, Vite
- Backend: Laravel 12, Eloquent ORM, Sanctum (or session auth)
- Database: MySQL 8.0+
- Dev tooling: Composer, npm

---

## 🔎 Highlights & Design Notes

- Server-side caching for heavy endpoints (recommended) to reduce API load.
- Passport or Sanctum can be added for token-based API access if needed.
- Use `storage/` for uploaded pet images and `php artisan storage:link` to expose them publicly.

---

## ✅ Deployment Checklist

- Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
- Generate `APP_KEY` with `php artisan key:generate`
- Run `php artisan config:cache` and `php artisan route:cache`
- Configure secure session driver (Redis recommended)

---

## 🤝 Contributing

1. Fork and create a branch
2. Run `composer install` and `npm install`
3. Create a PR with a clear description and tests if applicable

---

## ⚠️ Files not included

- `.env` (create from `.env.example`)
- `vendor/` (install via `composer install`)
- `node_modules/` (install via `npm install`)
- `storage/logs/`

---

## 📞 Support

If you need help with setup or deployment, open an issue in the repository.

---

*This README follows the requested structure and is tailored to the Pet Adoption project.*
  - **Flood** (heavy rain): Floats on water
