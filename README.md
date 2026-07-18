# AI Paint Tool

AI Paint Tool is a lightweight browser workspace for planning AI image-generation ideas. It combines prompt drafting, style selection, palette exploration, and a sketch canvas that can be exported as a PNG composition reference.

## Features

- Dependency-free HTML, CSS, and JavaScript app shell for fast local development.
- Prompt enhancer that combines the user's idea, selected style, and palette colors.
- Touch and mouse sketch canvas with adjustable brush size and color.
- Palette presets, canvas clearing, and PNG export.
- Polished dark UI that is ready to connect to an AI image-generation backend.

## Getting started

```bash
npm install
npm run start
```

Open http://localhost:4173 in your browser and start sketching.

## Available scripts

- `npm run start` - serve the static app locally.
- `npm run check` - validate JavaScript syntax with Node.js.

## Next steps

- Connect the enhanced prompt to an image-generation API.
- Add project persistence for prompts, palettes, and sketches.
- Support image uploads for style transfer or inpainting workflows.
