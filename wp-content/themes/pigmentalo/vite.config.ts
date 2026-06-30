import { defineConfig } from 'vite'
import { resolve } from 'path'

const port = parseInt( process.env.VITE_PORT ?? '5173', 10 )

export default defineConfig( {
    root: resolve( __dirname, 'assets' ),

    build: {
        outDir:      resolve( __dirname, 'assets/dist' ),
        emptyOutDir: true,
        manifest:    true,
        minify:      'esbuild',
        target:      'esnext',
        rollupOptions: {
            input: {
                main: resolve( __dirname, 'assets/ts/main.ts' ),
            },
        },
    },

    css: {
        devSourcemap: true,
    },

    server: {
        port,
        strictPort: true,
        cors:       true,
        watch:      { usePolling: true },
    },
} )
