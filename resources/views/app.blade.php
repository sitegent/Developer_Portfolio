<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        @php
            $settings = \App\Models\Setting::all()->pluck('value', 'key');
            $siteTitle      = $settings->get('site_title', config('app.name', 'Partho'));
            $seoTitle       = $settings->get('seo_title', $siteTitle);
            $seoDescription = $settings->get('seo_description', '');
            $seoKeywords    = $settings->get('seo_keywords', '');
            $ogImage        = $settings->get('og_image_url', '');
            $faviconUrl     = $settings->get('favicon_url', '');
            // Integrations
            $gscVerify  = $settings->get('google_site_verification', '');
            $gtmId      = $settings->get('gtm_id', '');
            $ga4Id      = $settings->get('ga4_id', '');
            $fbPixelId  = $settings->get('fb_pixel_id', '');
            $fcmApiKey         = $settings->get('fcm_api_key', '');
            $fcmAuthDomain     = $settings->get('fcm_auth_domain', '');
            $fcmProjectId      = $settings->get('fcm_project_id', '');
            $fcmSenderId       = $settings->get('fcm_messaging_sender_id', '');
            $fcmAppId          = $settings->get('fcm_app_id', '');
            $fcmVapidKey       = $settings->get('fcm_vapid_key', '');
        @endphp

        <title inertia>%s - {{ $siteTitle }}</title>

        <!-- SEO Meta -->
        @if($seoDescription)
        <meta name="description" content="{{ $seoDescription }}">
        @endif
        @if($seoKeywords)
        <meta name="keywords" content="{{ $seoKeywords }}">
        @endif

        <!-- Open Graph / Social Share -->
        <meta property="og:title" content="{{ $seoTitle }}">
        @if($seoDescription)
        <meta property="og:description" content="{{ $seoDescription }}">
        @endif
        @if($ogImage)
        <meta property="og:image" content="{{ $ogImage }}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:image" content="{{ $ogImage }}">
        @endif
        <meta property="og:type" content="website">

        <!-- Google Search Console -->
        @if($gscVerify)
        <meta name="google-site-verification" content="{{ $gscVerify }}">
        @endif

        <!-- Favicon -->
        @if($faviconUrl)
        <link rel="icon" href="{{ $faviconUrl }}" type="image/png">
        <link rel="shortcut icon" href="{{ $faviconUrl }}">
        @endif

        <!-- Google Tag Manager (head) -->
        @if($gtmId)
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','{{ $gtmId }}');</script>
        @endif

        <!-- Google Analytics 4 -->
        @if($ga4Id)
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ $ga4Id }}"></script>
        <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','{{ $ga4Id }}');</script>
        @endif

        <!-- Firebase Config (for SW) -->
        @if($fcmApiKey)
        <script>
            window.__FCM__ = {
                apiKey: "{{ $fcmApiKey }}",
                authDomain: "{{ $fcmAuthDomain }}",
                projectId: "{{ $fcmProjectId }}",
                messagingSenderId: "{{ $fcmSenderId }}",
                appId: "{{ $fcmAppId }}",
                vapidKey: "{{ $fcmVapidKey }}"
            };
        </script>
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        <!-- Google Tag Manager (noscript) -->
        @if($gtmId)
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id={{ $gtmId }}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        @endif

        @inertia

        <!-- Facebook Pixel -->
        @if($fbPixelId)
        <script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','{{ $fbPixelId }}');fbq('track','PageView');</script>
        <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id={{ $fbPixelId }}&ev=PageView&noscript=1"/></noscript>
        @endif
    </body>
</html>
