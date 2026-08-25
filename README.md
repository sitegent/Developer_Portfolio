# Developer Portfolio System

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![InertiaJS](https://img.shields.io/badge/Inertia.js-v2.0-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A premium, modern, and high-performance **Developer Portfolio & CMS** application built using **Laravel 12**, **Inertia.js (React)**, and **Tailwind CSS**. It features a dynamic, fully-animated frontend with **Framer Motion** and a robust admin dashboard to manage all sections of the portfolio.

---

## 🌟 Features

### 💻 Frontend (Client Side)
- **Modern & Premium UI:** Fully responsive design styled with Tailwind CSS, featuring dark-themed premium aesthetics.
- **Dynamic Animations:** Fluid entry animations and micro-interactions powered by Framer Motion.
- **Dynamic Services & Works:** Clean grids showcasing services offered and past works with filters.
- **Hire/Contact Modal:** Seamless lead generation form for prospective clients to send direct messages.
- **FCM Web Push Notifications:** Integrates Firebase Cloud Messaging (FCM) to request push token permissions from visitors.

### 🛡️ Admin Dashboard (Management Portal)
- **Profile Settings:** Update admin personal info, email, and security password (built on Laravel Breeze).
- **Site Content Manager:** Dynamic control over landing page text, bio, years of experience, counters, greetings, and profile photo.
- **Service Management:** CRUD system for adding/editing services with details.
- **Works/Project Showcase:** CRUD system to upload projects with images, categories, demo links, and tech stacks.
- **Experience Timeline:** Manage professional experience history (years, roles, companies, descriptions) sorted logically.
- **Brand Logos:** Admin interface to manage client/partner brand logos displayed on the site.
- **Messages Inbox:** View, delete, and manage messages/inquiries received from the frontend contact form.
- **System Settings:** Central configuration including Firebase Cloud Messaging (FCM) API credentials for sending push notifications.
- **Notification Center:** Send direct web push notifications using FCM.

---

## 🛠️ Technology Stack

- **Backend Framework:** Laravel 12 (PHP >= 8.2)
- **Frontend Core:** Inertia.js (React 18)
- **Styling:** Tailwind CSS (configured with Vite)
- **Animations:** Framer Motion
- **Database:** MySQL / MariaDB (or SQLite)
- **Asset Bundler:** Vite

---

## 📋 System Requirements

To install and run this project locally, ensure you have:
- **PHP** >= 8.2
- **Composer** (PHP Package Manager)
- **Node.js** >= 18 & **NPM**
- **MySQL Server** (e.g. Laragon, XAMPP, or standalone MySQL)

---

## 🚀 Installation & Setup Guide

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/sitegent/Developer_Portfolio.git
cd Developer_Portfolio
```

### 2. Install PHP Dependencies
```bash
composer install
```

### 3. Install JavaScript Dependencies
```bash
npm install
```

### 4. Environment Configuration
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
Open the `.env` file and configure your database settings:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

### 5. Generate Application Key
```bash
php artisan key:generate
```

### 6. Database Setup
You can set up the database in one of two ways:

#### Option A: Import SQL Dump (Recommended - Contains Demo Content)
Create a database in your MySQL client (e.g. phpMyAdmin, HeidiSQL) and import the provided SQL file:
- File name: `portfolio.sql` (located in the root directory)

#### Option B: Run Migrations & Seeders (For a clean setup)
```bash
php artisan migrate
php artisan db:seed
```

### 7. Create Storage Symbolic Link
This project uploads media (project images, brand logos, profile pictures) to local storage. Link the storage directory:
```bash
php artisan storage:link
```
*Note: If you run into issues on Windows/Laragon, you can access the utility route `http://localhost/fix-storage` to create the link.*

### 8. Compile Assets & Run Development Server
To start the Vite development server and Laravel server concurrently:
```bash
composer run dev
```
Alternatively, run them separately:
- **Start Laravel Server:** `php artisan serve`
- **Start Vite Server:** `npm run dev`
- **Build assets for production:** `npm run build`

---

## 🔐 Admin Panel Credentials

After importing the database (`portfolio.sql`), you can access the admin panel at:
- **URL:** `http://localhost:8000/login` (or your local development URL)
- **Email:** `admin@test.com`
- **Password:** `password` *(Note: If you run clean migrations, the default user password seeded by `DatabaseSeeder` is also `password`)*

---

## 🔔 Firebase Cloud Messaging (FCM) Integration

To enable web push notifications:
1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Add a Web App to your Firebase project and copy the configuration keys.
3. Log in to the Admin Panel, navigate to **Settings**, and fill in the FCM details:
   - FCM API Key
   - Auth Domain
   - Project ID
   - Messaging Sender ID
   - App ID
   - VAPID Public Key (Web Push certificate)

---

## 🌐 Live url:
https://developer-portfolio-production-fylk6p.laravel.cloud/

## 📄 License
This project is open-sourced software licensed under the [MIT license](LICENSE).
