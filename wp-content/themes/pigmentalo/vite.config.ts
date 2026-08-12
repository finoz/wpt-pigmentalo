import { defineConfig, loadEnv, Plugin } from 'vite'
import { resolve }                       from 'path'
import * as fs                           from 'fs'

/**
 * Plugin sentinel: crea .vite-dev quando il dev server parte (contiene la porta),
 * lo rimuove quando si ferma. PHP usa il file per rilevare dev mode e leggere
 * la porta senza bisogno di costanti in wp-config.php.
 */
const viteDevFlag = ( port: number, flagFile: string ): Plugin => ( {
    name: 'vite-dev-flag',
    configureServer() {
        fs.writeFileSync( flagFile, String( port ) )
        const cleanup = () => { try { fs.unlinkSync( flagFile ) } catch {} }
        process.once( 'exit',   cleanup )
        process.once( 'SIGINT', () => { cleanup(); process.exit( 0 ) } )
        process.once( 'SIGTERM',() => { cleanup(); process.exit( 0 ) } )
    },
} )

export default defineConfig( ( { mode } ) => {
    // Carica le variabili dal file .env nella root del tema.
    // Il terzo argomento '' rimuove il filtro sul prefisso VITE_,
    // così VITE_PORT è disponibile anche se non ha prefisso VITE_.
    const env      = loadEnv( mode, resolve( __dirname, '../../..' ), '' )
    const port     = parseInt( env.VITE_PORT ?? '5173', 10 )
    const flagFile = resolve( __dirname, '.vite-dev' )

    return {
        plugins: [ viteDevFlag( port, flagFile ) ],

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
    }
} )
