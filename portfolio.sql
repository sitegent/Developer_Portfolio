-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 21, 2026 at 05:01 PM
-- Server version: 8.4.3
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `logo_url`, `sort_order`, `created_at`, `updated_at`) VALUES
(2, 'Nexelta', '/storage/brands/bZZpATlzNMqa3YL5MLGT20PeAroEcQ4Nz0jmPTjg.webp', 0, '2026-07-05 19:26:34', '2026-07-05 19:26:34');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` bigint UNSIGNED NOT NULL,
  `year` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `year`, `role`, `company`, `description`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, '2020-2022', 'Wordpress Designer', 'Good import tech', NULL, 0, '2026-02-24 15:40:37', '2026-02-24 15:40:37'),
(2, '2023 - Present', 'Full Stack Developer', 'Sobtech', NULL, 0, '2026-02-24 15:41:39', '2026-02-24 15:42:13');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fcm_tokens`
--

CREATE TABLE `fcm_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `device` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `work_info` text COLLATE utf8mb4_unicode_ci,
  `attached_file` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_02_21_085951_create_services_table', 1),
(5, '2026_02_21_085951_create_site_contents_table', 1),
(6, '2026_02_21_085951_create_works_table', 1),
(7, '2026_02_21_090000_create_messages_table', 1),
(8, '2026_02_21_090000_create_settings_table', 1),
(9, '2026_02_24_174919_add_category_to_works_table', 2),
(10, '2026_02_24_210100_create_brands_table', 3),
(11, '2026_02_24_213559_create_experiences_table', 4),
(12, '2026_02_24_221718_create_fcm_tokens_table', 5);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(2, 'Web Development', 'As a Full Stack Developer, I design and develop scalable web applications using Laravel, React, Next.js, and Node.js. I work with clients to build secure, high-performance systems tailored to business needs.', 'services/YYjaOzBNTgOYeqfuSktIDnAnLCKrmtl14bEWVcG9.png', '2026-02-24 10:58:20', '2026-03-20 17:21:32'),
(3, 'Modern Web design', 'As a Web Designer, I focus on creating responsive, modern, and high-converting designs. Using tools like Figma and technologies like Tailwind CSS, I ensure that every website is not only beautiful but also functional and optimized for all devices.', 'services/m0lHMWSH0WD3Afu4wAKPzKQGf8NQ2OVUsDErDidt.png', '2026-03-20 17:26:00', '2026-03-20 17:33:59'),
(4, 'Bug Fixing & Support', 'Is your website or web application not working as expected? I specialize in identifying and resolving complex technical issues, from logic errors and broken features to database connection problems. I will debug your code, fix security vulnerabilities, and ensure your system runs smoothly and efficiently.', 'services/bqGGmSrGRyxPuLLamLrMNToODdQE0a3NGf9TY99B.png', '2026-03-20 17:31:38', '2026-03-20 17:31:38'),
(5, 'Search Engine Optimization', 'Get your business to the top of search results. I specialize in On-Page and Technical SEO to improve your website\'s organic ranking. From keyword research to Google Ads management, I ensure your business is visible to the right audience at the right time.', 'services/BtCyyTxaqydsmrJZnthQLU57qBavbyjl7UY7qt2b.png', '2026-03-20 17:35:09', '2026-03-20 17:35:09');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5b2kaKLnZZh5DjGavReso3gLWM40QyEwJQRJEQiq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTDJBYzlZdGNpTTF0VVFTUmlrYnRsQVpLT1AxbFMyUmR3MENZdk82YyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1784653236),
('iLnKuvwO3mNavPzYzyaJs5YXqj3b00PO4exaI7Bp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFZOaktyM3hTYW80T3cwM3lxd0ZiVVlHTHZ6MmZuRERLWWF4ZHBCRSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1783300336),
('p0RlN6TK5vnFdBce6FXmUXwmyUXmGki0XsyZGITG', NULL, '45.87.82.20', 'curl/7.79.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWFR1T2lQaDVyQzB6aUplQ2V0eTE4a0pIN1Z5cHU2RHRTNUNHZkJnNyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly9wYXJ0aG8uc2l0ZSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1783296316),
('qnLTE8bue8BgjShYiWqVQjJnrMDzQC8pm4AoGJ0J', NULL, '103.186.219.13', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ2poN0s3QUFDckJzWTlPUkppOFdTNzQxaHFFbVRHZkxTT0l4NDBOaCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MTg6Imh0dHA6Ly9wYXJ0aG8uc2l0ZSI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1783296344),
('sUcdDlcMyYXC4kW6iChNOWARUEplWOtP7P99ewpe', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiU0ZEcmVXazF4NEpmZ0p4cmN1U3gyN2ZzSkNMd2ZrSzVEeUFGaVBZZSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9kYXNoYm9hcmQiO3M6NToicm91dGUiO3M6OToiZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1783306892);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'site_title', 'Partho - Full Stack', '2026-02-24 14:34:53', '2026-02-24 16:31:43'),
(2, 'site_tagline', 'Building Digita l Experiences', '2026-02-24 14:34:53', '2026-02-24 14:55:47'),
(3, 'favicon_url', '/storage/settings/LhR15VV22kBLxTPlYCMFMxIAZEaszjSuxtsan94S.png', '2026-02-24 14:34:53', '2026-02-24 14:39:24'),
(4, 'header_logo_text', 'Partho.dev', '2026-02-24 14:34:53', '2026-02-24 16:31:43'),
(5, 'seo_title', 'Partho - Full Stack Developer Portfolio', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(6, 'seo_description', 'Full Stack Developer specializing in Laravel, React, and modern web technologies. Available for freelance work.', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(7, 'seo_keywords', 'full stack developer, laravel developer, react developer, freelance, web development', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(8, 'og_image_url', '', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(9, 'contact_email', 'sitegent@outlook.com', '2026-02-24 14:34:53', '2026-02-25 00:17:39'),
(10, 'contact_phone', '+8801701867713', '2026-02-24 14:34:53', '2026-02-24 14:37:17'),
(11, 'contact_whatsapp', '+8801701867713', '2026-02-24 14:34:53', '2026-02-25 00:17:39'),
(12, 'contact_address', 'Shura, Chhatiyantala-7470, Jashore-Sadar, Jashore', '2026-02-24 14:34:53', '2026-02-25 00:17:39'),
(13, 'github_url', 'https://github.com/', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(14, 'linkedin_url', 'https://linkedin.com/in/', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(15, 'twitter_url', 'https://twitter.com/', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(16, 'facebook_url', 'https://facebook.com/', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(17, 'instagram_url', 'https://instagram.com/', '2026-02-24 14:34:53', '2026-02-24 14:34:53'),
(18, 'google_site_verification', 'XUFEMlZYFp3o7rH7FpF5HQU', '2026-03-20 19:19:52', '2026-03-20 19:22:06'),
(19, 'fcm_api_key', 'AIzaSyBumbY90sti2x7mIaazC4XdVlfJUhoeohE', '2026-03-20 19:37:05', '2026-03-20 19:37:05'),
(20, 'fcm_auth_domain', 'new-partho.firebaseapp.com', '2026-03-20 19:37:05', '2026-03-20 19:37:05'),
(21, 'fcm_project_id', 'new-partho', '2026-03-20 19:37:05', '2026-03-20 19:37:05'),
(22, 'fcm_messaging_sender_id', '367857479289', '2026-03-20 19:37:05', '2026-03-20 19:37:05'),
(23, 'fcm_app_id', '1:367857479289:web:f608eb3c3ea5452853aea8', '2026-03-20 19:37:05', '2026-03-20 19:37:05'),
(24, 'fcm_vapid_key', 'BEDmfu8Ovggq7KMHfoRLFTzKaY-bScsM_wYo4PDgkCRoBuEFujj60x9TzHm22LAXIkOAIKy1WFULdOhcKYshWek', '2026-03-20 19:37:05', '2026-03-20 19:37:05');

-- --------------------------------------------------------

--
-- Table structure for table `site_contents`
--

CREATE TABLE `site_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_contents`
--

INSERT INTO `site_contents` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'profile_name', 'Partho', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(2, 'profile_tagline', 'Full Stack Developer', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(3, 'profile_email', 'sitegent@outlook.com', '2026-02-24 14:13:06', '2026-02-24 14:20:46'),
(4, 'profile_location', 'Shura, Chhatiyantala-7470, Jashore-Sadar, Jashore', '2026-02-24 14:13:06', '2026-02-24 14:23:37'),
(5, 'profile_image_url', '/storage/site-contents/WEI4vgbViS1xc6jnQez4nIXycpdWsyfMy86Fiqxj.png', '2026-02-24 14:13:06', '2026-03-23 03:52:21'),
(6, 'profile_available', 'true', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(7, 'cv_url', '#', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(8, 'home_greeting', 'Hey, I\'m a', '2026-02-24 14:13:06', '2026-02-24 14:18:21'),
(9, 'home_role', 'Web Developer', '2026-02-24 14:13:06', '2026-03-20 17:44:41'),
(10, 'home_bio', 'I design and build dynamic, high-performance web applications that provide a great user experience. Focused on clean architecture, modern aesthetics, and scalable solutions.', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(11, 'home_years_exp', '+3', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(12, 'home_projects', '+40', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(13, 'home_clients', '+20', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(14, 'home_years_label', 'Years of Experience', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(15, 'home_projects_label', 'Projects Completed', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(16, 'home_clients_label', 'Happy Clients', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(17, 'about_heading', 'Every great design begins with an even better story.', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(18, 'about_text', 'Hello! I\'m Partho, a passionate full stack developer based in Dhaka, BD. I specialize in backend architecture and frontend aesthetics — building products that are both powerful and beautiful.', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(19, 'about_skills', 'PHP, Laravel, MySQL, PostgreSQL, JavaScript, React, Next.js, Inertia.js, Tailwind CSS, Bootstrap, Git, Docker', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(20, 'works_heading', 'Selected Works', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(21, 'works_heading_accent', '& Case Studies.', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(22, 'works_subheading', 'A showcase of digital experiences, web apps, and platforms built with precision, passion, and purpose.', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(23, 'contact_heading', 'Let\'s start a project together', '2026-02-24 14:13:06', '2026-02-24 14:13:06'),
(24, 'contact_subheading', 'Open to new projects, collaborations, and exciting ideas. Send me a message!', '2026-02-24 14:13:06', '2026-02-24 14:13:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@test.com', NULL, '$2y$12$w9RC5HguFhK5hcpVkSqtJOz8fIYWm2t8e81DxAARPtUjzBHLHDqpS', 'CKReJrmGdoSyQu2z1b24E6A8XCYTcL9HJtBdjX3PX9vvHPeyYDXcnFXCZ7wz', '2026-02-24 10:11:15', '2026-02-24 10:11:15');

-- --------------------------------------------------------

--
-- Table structure for table `works`
--

CREATE TABLE `works` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Web Design',
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tech_stack` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `works`
--

INSERT INTO `works` (`id`, `title`, `description`, `category`, `image`, `link`, `tech_stack`, `created_at`, `updated_at`) VALUES
(8, 'SobSeba – A Service Management System', 'SobSeba.com is a high-performance, enterprise-grade service provider ecosystem designed to automate and scale service-based businesses. Built with Laravel and the Filament PHP (TALL Stack), this platform showcases my ability to handle complex business logic through a robust Backend CRM and Lead Management system. The architecture includes a full-scale HRM module for staff management and an integrated Accounting system that tracks real-time financial data, income, and expenses. Security and scalability were my top priorities, which I achieved by implementing a sophisticated Multi-User & Role-Based Access Control (RBAC) system, allowing distinct permissions for admins, service providers, and customers. From its seamless UI built with Tailwind CSS to its optimized MySQL database structure, SobSeba is a complete solution that demonstrates my expertise in developing data-driven web applications that solve real-world operational challenges.', 'Web Development', 'works/dtuzrarsZ6ts5H0lxOUIkqD2Snonnfrk0Fr2oL5c.png', 'https://sobseba.com', 'Laravel, React, Tailwind CSS, Node JS, MySQL', '2026-03-20 14:28:41', '2026-03-20 17:05:36'),
(9, 'Nexelta Builders', 'Nexelta is a modern construction and project management platform built using Laravel, Filament, Tailwind CSS, and MySQL. The system combines a powerful backend dashboard with a professional frontend website, making it ideal for construction companies, contractors, and industrial businesses to manage their operations efficiently while maintaining a strong online presence. The admin panel, developed with Filament, provides an intuitive interface to manage products, categories, projects, room bookings, and customer inquiries, along with analytics and reporting features for better decision-making. The frontend is designed with Tailwind CSS, featuring a clean, responsive, and premium dark-themed layout that showcases services, industrial capabilities, product listings, and featured projects. It also includes a booking and reservation system along with client testimonials to enhance credibility. The use of Laravel ensures a secure and scalable backend, while MySQL handles data efficiently, delivering a fast, reliable, and high-performance web application.', 'Web Development', 'works/waO36HuFmCdGoQCJpsvA1AxABXgbPAjxRFFZ3I2o.jpg', 'https://nexelta.com', 'Laravel, Tailwind CSS, MySQL, React', '2026-03-24 15:26:18', '2026-03-24 15:26:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `fcm_tokens`
--
ALTER TABLE `fcm_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fcm_tokens_token_unique` (`token`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `site_contents`
--
ALTER TABLE `site_contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `site_contents_key_unique` (`key`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fcm_tokens`
--
ALTER TABLE `fcm_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `site_contents`
--
ALTER TABLE `site_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `works`
--
ALTER TABLE `works`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
