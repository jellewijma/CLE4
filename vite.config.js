import { VitePWA } from 'vite-plugin-pwa';

export default {
    plugins: [
        VitePWA({
            // generates 'manifest.webmanifest' file on build
            manifest: {
                "name": "Barista Blitz",
                "short_name": "Barista Blitz",
                "icons": [
                    {
                        "src": "assets/logo/logo.png",
                        "sizes": "180x180",
                        "type": "image/png"
                    }
                ],
                "start_url": "https://jellewijma.github.io/CLE4/index.html",
                "display": "fullscreen"
            }
        })
    ]
};