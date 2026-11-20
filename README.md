# Isaiah Eugenio's Portfolio

A portable static website. No subscriptions, build tools, or Codex account are required to edit or run it.

## Preview

Open `index.html` in a browser, or serve this folder with a static web server. All artwork is stored in `assets/`. Videos stream from Google Drive and must remain publicly viewable; Drive processing must finish before playback works.

## Publish on GitHub Pages

1. Create a public repository in your GitHub account called `isaiah-portfolio`.
2. Upload `index.html`, `styles.css`, `modern.css`, `fonts.css`, `app.js`, `pixel-dust.js`, `content.js`, `.nojekyll`, and the `assets` folder to its `main` branch. Keep the folder structure.
3. Open repository Settings > Pages. Under Build and deployment select Deploy from a branch, then `main` and `/ (root)`. Save.
4. Wait for GitHub to report the published website address. The preview on your computer is not a public deployment.

## Edit without Codex

- Project titles, descriptions, gallery images and video IDs: edit `content.js` using the pencil button in GitHub, then Commit changes.
- About, experience and headline: edit `index.html`.
- Colors and layout: edit `styles.css`.
- To replace artwork, upload a file to `assets/` and use its filename in `content.js` (current images use `.webp`).
- To add a project, copy a project entry in `content.js` and change its fields. Keep commas between entries.
- A Drive file ID is the part between `/d/` and `/view` in its shared link. Keep the source video in Drive. Do not upload multi-gigabyte videos to this repository.
- Updates to the configured branch publish automatically through Pages. GitHub's commit history lets you restore older versions.

## Ownership and backup

Download the repository ZIP periodically. The site can be hosted by any static hosting provider. The artwork does not rely on the original Canva website. Video availability does rely on the files and sharing permissions in Google Drive. No dashboard, password, or secret is stored in this site.

## Content notes

Portfolio content is based on Isaiah's supplied resume, Canva portfolio and project credits. The role statement includes scripting, video editing, AI visuals, and voiceover per the latest supplied credits. The gallery includes 65 artwork images in 11 collections. The eight videos match the supplied Drive folder and approved title list. Six posters use AI-cleaned HD versions of supplied screenshots; Crush retains its supplied image and Alive Objects uses the latest supplied thumbnail. Video playback still requires verification after Drive processing. KNOWCODE is listed as the current game-tutorial video editing role per Isaiah. Fonts are bundled locally under their included SIL Open Font Licenses.

All portfolio artwork belongs to its respective owners. No license to reuse artwork is granted by publication of the source code.




