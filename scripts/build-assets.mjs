// Render tracked PNGs from path-only SVG sources.
// Text must remain outlined: librsvg webfont loading is host-dependent.

import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const assets = [
  {
    source: 'public/og-image.svg',
    output: 'public/og-image.png',
    width: 1200,
    height: 630,
  },
  {
    source: 'public/favicon.svg',
    output: 'public/apple-touch-icon.png',
    width: 180,
    height: 180,
  },
];

for (const asset of assets) {
  const source = await readFile(asset.source, 'utf8');
  if (/<text\b/i.test(source)) {
    throw new Error(
      `${asset.source} contains a <text> node; convert text to paths before rendering`,
    );
  }

  await sharp(Buffer.from(source))
    .resize(asset.width, asset.height)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(asset.output);

  console.log(`OK  ${asset.output} (${asset.width}x${asset.height})`);
}
