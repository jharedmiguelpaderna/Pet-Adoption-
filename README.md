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

```
CLIM8BIT/
├── clim8bit-backend/         # Laravel + Inertia.js backend
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/  # API controllers
│   │   │       ├── WeatherController.php
│   │   │       ├── AuthController.php
│   │   │       ├── FavoriteController.php
│   │   │       ├── ProfileController.php
│   │   │       └── RecentSearchController.php
│   │   ├── Models/           # Eloquent models
│   │   │   ├── User.php
│   │   │   ├── Favorite.php
│   │   │   └── RecentSearch.php
│   │   └── Services/         # Business logic
│   │       └── WeatherService.php  # API key rotation & caching
│   ├── database/
│   │   └── migrations/       # Database migrations
│   ├── resources/
│   │   ├── js/
│   │   │   ├── components/  # React components
│   │   │   │   ├── effects/  # Weather effects
│   │   │   │   │   ├── RainEffect.tsx
│   │   │   │   │   ├── SnowEffect.tsx
│   │   │   │   │   ├── SlipperyCursor.tsx
│   │   │   │   │   └── ... (12 effects total)
│   │   │   │   ├── ui/  # UI components
│   │   │   │   ├── WeatherDisplay.tsx
│   │   │   │   ├── SearchBar.tsx
│   │   │   │   └── ... (15+ components)
│   │   │   ├── hooks/        # Custom React hooks
│   │   │   ├── Pages/         # Inertia pages
│   │   │   └── Utils/         # Utilities
│   │   └── css/
│   │       └── app.css        # Tailwind + custom styles
│   ├── routes/
│   │   ├── web.php           # Inertia routes
│   │   └── api.php           # API endpoints
│   └── public/
│       └── assets/           # Static assets (images, etc.)
└── README.md                 # This file
```

---

## 🎨 Tech Stack

### Frontend
- **React 19** - UI library with hooks
- **TypeScript 5+** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **CSS Animations** - GPU-accelerated particle animations (rain, snow, wind, fog)
- **Inertia.js 2.0** - SPA adapter (no API calls needed)
- **Vite 7** - Build tool and dev server

### Backend
- **Laravel 12** - PHP framework
- **MySQL 8.0** - Relational database
- **Eloquent ORM** - Database abstraction
- **Laravel Sanctum** - Session-based authentication
- **Laravel Cache** - Response caching (10-minute TTL)

### APIs & Services
- **OpenWeather API** - Real-time weather data
  - **4-Key Rotation** - Round-robin algorithm for 4× rate limit capacity
  - **Server-Side Caching** - Reduces API calls by 80-90%
- **Geolocation API** - User location detection

### Key Backend Features
- ✅ **API Key Rotation** - 4 keys = 240 calls/minute capacity
- ✅ **Response Caching** - 10-minute TTL, reduces API calls significantly
- ✅ **Session Authentication** - Secure, server-side sessions
- ✅ **Database Relationships** - Foreign keys with cascade deletes
- ✅ **Error Handling** - Categorized errors (404, 401, 429, 500)
- ✅ **Input Validation** - Laravel validation rules
- ✅ **Security** - CSRF protection, password hashing (bcrypt), SQL injection prevention

---

## 🌟 Highlights

### Most Complex Features

#### 1. Slippery Cursor Physics
```typescript
// Real physics simulation with:
- Velocity & acceleration
- Friction coefficients (ice vs air vs water)
- Gravity (0.15 pixels/frame²)
- Buoyancy in flood water
- Screen wrapping in wind mode
- 60fps animation loop
```

#### 2. Moon Phase Calculation
```typescript
// Astronomical accuracy using:
- Known new moon reference date
- 29.53-day lunar cycle
- Current date calculation
- 32 distinct moon phases (8 images mapped)
- Manual phase selector in demo mode
```

#### 3. CSS Animation Particle Systems
```typescript
// GPU-accelerated rendering of:
- 150+ raindrops simultaneously
- 60+ snowflakes with individual properties
- Particle creation once, CSS handles infinite loops
- Zero JavaScript execution during animation
- requestAnimationFrame only for cursor physics (SlipperyCursor.tsx)
```

---

## 📊 Performance

### Metrics
- **250+ particles** animating at 60fps
- **<25MB** memory footprint with all effects active
- **<100ms** API response time (with caching)
- **0 layout shifts** during weather changes
- **Responsive** on mobile and desktop

### Optimizations
- ✅ CSS animations (GPU-accelerated, zero JS overhead)
- ✅ RequestAnimationFrame for cursor physics only
- ✅ Particle creation once, CSS handles infinite loops
- ✅ Conditional effect rendering
- ✅ API response caching (10 minutes)
- ✅ Debounced search input (300ms)

---

## 🎯 Usage

### Real Weather Mode
1. Click "Use My Location" for automatic detection
2. Or search for any city in the search bar
3. View current weather + 5-day forecast
4. Visual effects activate automatically based on conditions

### Demo Mode
1. Click demo mode toggle in controls
2. Select weather type manually
3. Adjust wind speed with slider
4. Toggle individual effects on/off
5. Switch between day/night

### Cursor Physics
- Automatically activates in appropriate weather
- Can be toggled on/off in settings
- Three modes:
  - **Ice** (temp ≤5°C): Slippery, momentum-based
  - **Wind** (high wind speed): Blown across screen
  - **Flood** (heavy rain): Floats on water

---

## 🎯 Backend Features

### API Key Rotation System
- **4 API Keys**: Round-robin distribution across multiple keys
- **4× Capacity**: 240 calls/minute instead of 60
- **Automatic Failover**: Exception handling for invalid keys
- **Configuration-Based**: Keys stored in `.env`, not code

### Caching Strategy
- **10-Minute TTL**: Weather responses cached for 10 minutes
- **80-90% Reduction**: Dramatically reduces API calls
- **Sub-millisecond Response**: Cache hits return in <1ms
- **Rate Limit Protection**: Fewer calls = lower chance of hitting limits

### Security Features
- **CSRF Protection**: Laravel's built-in middleware
- **Password Hashing**: bcrypt with automatic salting
- **SQL Injection Prevention**: Eloquent ORM uses parameter binding
- **Input Validation**: All user input validated before processing
- **Session Security**: HttpOnly cookies, secure sessions

### Database Design
- **Foreign Keys**: Proper relationships with cascade deletes
- **Unique Constraints**: Email uniqueness, composite favorites constraint
- **Indexes**: Optimized queries on frequently accessed columns
- **Data Integrity**: Automatic cleanup when users are deleted

---

## 🤝 Contributing

This project is fully functional with:
- ✅ Laravel 12 + Inertia.js backend
- ✅ MySQL database with proper schema
- ✅ Session-based authentication
- ✅ API key rotation and caching
- ✅ Production-ready security features

Future enhancements planned:
- Deploy to production server
- Add email verification
- Implement rate limiting middleware
- Add API documentation (Swagger/OpenAPI)
- Performance monitoring and analytics

---

## 📄 License

Academic project - All rights reserved.

---

## 🙏 Acknowledgments

- **OpenWeather API** - Weather data provider
- **Press Start 2P** - Retro font by CodeMan38
- **Tailwind CSS** - Styling framework
- **React Team** - Amazing library

---

## 📞 Support

For questions about this project:
- Review the code comments - all components are well-documented
- Check the inline documentation in controllers and services
- Examine the component structure for implementation details

---

## ⚠️ Important Notes

### Files NOT INCLUDED IN REPOSITORY
- `.env` - Contains sensitive API keys and database credentials (create from `.env.example`)
- `node_modules/` - Node.js dependencies (install with `npm install`)
- `vendor/` - PHP dependencies (install with `composer install`)
- `storage/logs/` - Application logs

### Before Pushing to Repository
1. ✅ Ensure `.env` is in `.gitignore` (should be by default)
2. ✅ Never commit API keys or passwords
3. ✅ Use `.env.example` as a template for required environment variables
4. ✅ Run `php artisan config:clear` if you've changed config files

### Production Deployment Checklist
- [ ] Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
- [ ] Generate new `APP_KEY` with `php artisan key:generate`
- [ ] Run `php artisan config:cache` and `php artisan route:cache`
- [ ] Set up proper database credentials
- [ ] Configure proper session driver (Redis recommended)
- [ ] Set up SSL/HTTPS certificates
- [ ] Configure proper file permissions for `storage/` and `bootstrap/cache/`
