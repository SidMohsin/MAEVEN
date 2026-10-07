# MAEVEN Productions website

Next.js (App Router) + React, plain JavaScript, Tailwind CSS v4.

## Commands

- `npm run dev`: local dev server
- `npm run build`: validates service data, then builds
- `npm run lint` / `npm run format`

## Where things live

- `src/data/services.js`: the whole service architecture (3 pillars, 18 topics), copied verbatim from the spreadsheet (Sheet B base). Items with `hidden: true` are never rendered.
- `src/data/site.js`: nav, footer, contact details. Unconfirmed facts are placeholders, never invented values.
- `src/app/globals.css`: design tokens (`@theme`). Olive `#596946` is sampled from the logo.
- `src/components/`: `layout/` (Header, Footer) and `ui/` (Button, Section, Eyebrow, Placeholder, Logo, Icon).
- `public/images/`: the site's photos, served at `/images/<id>.jpg` and committed to Git. `src/data/assets.js` lists each one (alt text, size, focal point). **To replace a photo, overwrite the file at the same path** and update its width/height/alt in `assets.js` if the picture changed. The build fails if a listed file is missing.
- `docs/asset-inventory.csv`: inventory of the client asset zip. The raw zip is git-ignored and never committed.

## Content rules

No invented clients, contact details, statistics, history, equipment or imagery. Use `<Placeholder>` for anything the client has not supplied.

## Home hero video

No video exists in the supplied source material yet, so the hero shows the poster image. The player is
built and tested; to turn it on, add client-approved files to `public/video/` and set `hero.video` in
`src/data/home.js` (shape and file spec are documented there). It autoplays muted and looping only when
the visitor has not requested reduced motion or data saving, pauses off-screen, and shows a pause
control. Server HTML never contains a `<video>`, so the poster is always the first paint.
