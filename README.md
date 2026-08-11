# wpt-pigmentalo

Child theme WordPress per **Pigmentalo**.  
Basato su [wpt-ficus](https://github.com/finoz/wpt-ficus) come parent theme.

## Prerequisiti

- Docker Desktop
- nvm + Node 22 (`nvm use` nella cartella tema)
- `wpt-ficus` clonato nella stessa directory padre (`../wpt-ficus`)

## Avvio locale

```bash
# 1. Avvia WordPress
docker compose up -d
# → WP su http://localhost:8082
# → phpMyAdmin su http://localhost:8083

# 2. Setup WP (prima volta): http://localhost:8082/wp-admin
#    Attiva il tema "Pigmentalo" (il parent Ficus viene caricato automaticamente)

# 3. Avvia Vite in modalità dev
cd wp-content/themes/pigmentalo
nvm use
npm install   # solo la prima volta
npm run dev
```

## Build produzione

```bash
cd wp-content/themes/pigmentalo
npm run build
# Output in assets/dist/ — già in .gitignore
```

## Brand

| Token         | Valore    | Uso                  |
|---------------|-----------|----------------------|
| primary       | `#87235a` | Viola                |
| secondary     | `#1c52ac` | Blu                  |
| accent        | `#e5ce00` | Giallo               |
| surface       | `#f0f0f0` | Sfondo neutro        |
| text          | `#000000` | Testo principale     |

Gradienti (angolo -45°):

| Slug          | Colori            | Uso       |
|---------------|-------------------|-----------|
| `brand`       | Viola → Blu       | Primario  |
| `viola-giallo`| Viola → Giallo    |           |
| `blu-giallo`  | Blu → Giallo      |           |

In SCSS: `var(--wp--preset--gradient--brand)`, `var(--wp--preset--gradient--viola-giallo)`, ecc.

Font: **General Sans** (slug `sans` e `serif`)  
File in `wp-content/themes/pigmentalo/assets/fonts/`

## Logo

Il logo di default va in `wp-content/themes/pigmentalo/assets/images/logo.png` (o `.svg`, `.webp`, `.jpg`).

Il parent theme (ficus) carica automaticamente questo file come logo fallback quando nessun logo è impostato in admin. Non serve PHP nel child theme.

Per sostituire il logo: basta rimpiazzare il file. Il logo caricato da admin (Impostazioni > Generali > Logo sito) ha sempre la precedenza sul file di default.

Formati supportati (in ordine di priorità): `logo.png`, `logo.svg`, `logo.webp`, `logo.jpg`.

Se hai bisogno di alt text personalizzato o dimensioni esplicite, puoi sovrascrivere il filtro in `functions.php`:

```php
add_filter( 'ficus_default_logo_html', function (): string {
    return ficus_logo_img(
        get_stylesheet_directory_uri() . '/assets/images/logo.png',
        'Pigmentalo',
        200, 40
    );
}, 20 );
```

---

## Aggiornamenti automatici (GitHub Updater)

Il tema si aggiorna da GitHub tramite `Ficus_GitHub_Updater`.  
Il repo di riferimento è `finoz/wpt-pigmentalo`. Nessun plugin richiesto.

Per repo privati, aggiungi in `wp-config.php`:
```php
define( 'FICUS_GITHUB_TOKEN', 'ghp_...' );
```

### Procedura di rilascio

Un semplice push non innesca aggiornamenti WP: serve una **GitHub Release** con tag semver.

```bash
# 1. Bump versione in wp-content/themes/pigmentalo/style.css
#    Version: 1.0.0 → 1.1.0

# 2. Commit e push
git add .
git commit -m "release: v1.1.0 - descrizione modifiche"
git push

# 3. Crea tag + release in un colpo solo
gh release create v1.1.0 --generate-notes
# --generate-notes popola automaticamente le note dai commit dall'ultima release
# oppure scrivi le note a mano: --notes "Descrizione modifiche"
```

Il tag deve corrispondere al valore `Version:` in `style.css`, preceduto da `v`.  
Esempio: `Version: 1.1.0` → tag `v1.1.0`.

## Struttura

```
wpt-pigmentalo/
  docker-compose.yml
  wp-content/
    themes/
      pigmentalo/         ← child theme (questo repo)
        assets/
          fonts/          ← woff2 self-hosted
          scss/           ← sorgenti SCSS
          ts/             ← sorgenti TypeScript
          dist/           ← output Vite (gitignored)
        functions.php
        style.css
        theme.json        ← brand token (colori, gradienti, font)
        vite.config.ts
        package.json
```

> Il parent `wpt-ficus` non è incluso nel repo - viene montato via Docker da `../wpt-ficus`.

### Symlink ficus (opzionale, consigliato)

Docker monta ficus correttamente nel container, ma per navigare il codice del parent dall'IDE conviene creare un symlink locale:

```bash
cd wp-content/themes
ln -s ../../../wpt-ficus ficus
```

Questo rende `wp-content/themes/ficus/` navigabile in locale e le modifiche a `wpt-ficus` si riflettono immediatamente senza restart. Il symlink può essere committato (git lo traccia come puntatore, non come directory) oppure aggiunto a `.gitignore`.
