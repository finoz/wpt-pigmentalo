import { defineConfig, Plugin } from 'vite'
import { resolve }             from 'path'
import * as fs                 from 'fs'

const port     = parseInt( process.env.VITE_PORT ?? '5173', 10 )
const flagFile = resolve( __dirname, '.vite-dev' )

/**
 * Plugin sentinel: crea .vite-dev quando il dev server parte,
 * lo rimuove quando si ferma. PHP usa il file per rilevare dev mode
 * senza bisogno di fsockopen (che non funziona da Docker verso il Mac host).
 */
const viteDevFlag = (): Plugin => ( {
    name: 'vite-dev-flag',
    configureServer() {
        fs.writeFileSync( flagFile, String( port ) )
        const cleanup = () => { try { fs.unlinkSync( flagFile ) } catch {} }
        process.once( 'exit',   cleanup )
        process.once( 'SIGINT', () => { cleanup(); process.exit( 0 ) } )
        process.once( 'SIGTERM',() => { cleanup(); process.exit( 0 ) } )
    },
} )

export default defineConfig( {
    plugins: [ viteDevFlag() ],

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
