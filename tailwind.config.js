import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
                body: ['"Inter"', ...defaultTheme.fontFamily.sans],
                serif: ['"EB Garamond"', ...defaultTheme.fontFamily.serif],
            },
            colors: {
                isak: {
                    bg: '#0F0F0F',
                    card: '#1A1A1A',
                    primary: '#00DE51', // Precise neon green
                    textPrimary: '#FFFFFF',
                    textMuted: 'rgba(255, 255, 255, 0.72)', // Off-white for readability
                    border: 'rgba(255, 255, 255, 0.1)', // Translucent border
                }
            },
            borderRadius: {
                '4xl': '40px', // Exact card radius
            }
        },
    },

    plugins: [forms],
};
