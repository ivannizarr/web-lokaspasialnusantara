<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Detect system dark mode --}}
        <script>
            (function () {
                const appearance = '{{ $appearance ?? "system" }}'
                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                    if (prefersDark) {
                        document.documentElement.classList.add('dark')
                    }
                }
            })();
        </script>

        {{-- Inline style for fallback BG --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <title inertia>Loka Spasial Nusantara</title>

        {{-- Favicon --}}
        <link rel="icon" href="/logo-clear.png" sizes="any">
        <link rel="icon" href="/logo-clear.png" type="image/png">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        {{-- Optimized Google Fonts (Nunito + Montserrat) --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        {{-- Vite + Inertia --}}
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
