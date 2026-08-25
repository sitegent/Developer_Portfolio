<?php

/**
 * Laravel Storage Link Fixer for cPanel
 * Place this file in your 'public' or 'public_html' folder and visit it in your browser.
 */

$publicPath = __DIR__;
$storagePath = realpath(__DIR__ . '/../storage/app/public');

echo "<h1>Storage Link Fixer</h1>";
echo "Public Path: " . $publicPath . "<br>";
echo "Target Storage Path: " . $storagePath . "<br><br>";

if (!$storagePath) {
    die("<span style='color:red;'>Error: Storage path not found. Make sure the script is in the web root.</span>");
}

$link = $publicPath . '/storage';

if (file_exists($link)) {
    if (is_link($link)) {
        echo "Link already exists and is a symbolic link. Attempting to recreate...<br>";
        unlink($link);
    } else {
        echo "<span style='color:orange;'>A physical directory named 'storage' already exists in: <b>" . $link . "</b></span><br>";
        echo "<b>Action Required:</b> Please log in to cPanel File Manager and <u>delete</u> the 'storage' folder inside your 'public' folder. Then refresh this page.<br>";
        die();
    }
}

if (symlink($storagePath, $link)) {
    echo "<h2 style='color:green;'>Success! The storage link has been created.</h2>";
    echo "You can now delete this script for security.";
} else {
    echo "<h2 style='color:red;'>Failed! Symlink could not be created.</h2>";
    echo "Common reasons: symlink() function is disabled by the host, or permissions issue.";
}
