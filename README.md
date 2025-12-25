ITE_18 — Project README

Quick Start (concise)

1) Extract the folder

Extract to C:\xampp\htdocs\ITE_18 if using XAMPP/Apache, or extract anywhere (e.g. C:\Users\<you>\Documents\ITE_18) to use the built-in PHP dev server.

2) Remove or ignore these (if present)

vendor/ (will be reinstalled)

frontend/node_modules/ (will be reinstalled)

.git/, storage/logs/*

Note on .env: If a .env file is included, open and edit it. If it is missing, create a new file named .env and paste the Sanitized .env example found at the bottom of this guide.

3) Create the database

Open phpMyAdmin.

Create a MySQL database named ite18 or update DB_DATABASE in the .env file to match your database name.

4) Prepare and run the backend

PowerShell

```powershell
cd C:\path\to\ITE_18
composer install

# Edit .env: set DB_DATABASE, DB_USERNAME (usually root), and DB_PASSWORD
# Ensure APP_URL=http://127.0.0.1:8000

php artisan key:generate
php artisan migrate --seed
php artisan storage:link
```

5) Start the backend

With XAMPP/Apache: point the server (DocumentRoot) to the project's public folder and start Apache.

Or run the dev server:

PowerShell

```powershell
php artisan serve --host=127.0.0.1 --port=8000
```

6) Prepare and run the frontend

PowerShell

```powershell
cd frontend
npm install
npm run dev
```

If the frontend calls the API, update frontend/.env.local to point to the backend URL (e.g. http://127.0.0.1:8000).

7) Verify

Backend: http://127.0.0.1:8000/api/... or vhost URL.

Frontend: http://localhost:3000.

8) Notes

Keep composer.lock and package-lock.json in the archive so dependencies are reproducible.

If vendor/ or node_modules/ were excluded, run composer install and npm install after extraction.

If Composer runs out of memory, run: php -d memory_limit=-1 composer install or increase memory in php.ini.

9) Sanitized .env example (safe defaults)

Plaintext

```
APP_NAME=ITE_18
APP_ENV=local
APP_DEBUG=true
APP_URL=http://127.0.0.1:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ite18
DB_USERNAME=root
DB_PASSWORD=
```

This concise checklist covers the common extraction, cleanup and run steps; full details and troubleshooting are below.

This repository contains a Laravel backend and a Next.js frontend (in frontend/). The following sections explain how to set up and run the application locally on Windows (development).

Quick Overview
Backend: Laravel (PHP) — API under routes/api.php

Frontend: Next.js in frontend/

Postman collection: postman_collection.json

Prerequisites
Windows (instructions assume cmd/PowerShell).

PHP 8.1+ and Composer (for Laravel).

MySQL (XAMPP or similar) running on default port 3306.

Node.js 18+ and npm or pnpm (for the frontend).

Git (to clone the repo).

