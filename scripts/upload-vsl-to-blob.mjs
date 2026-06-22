// One-shot script: uploads public/topk/vsl.mp4 to Vercel Blob
// Run from repo root: node scripts/upload-vsl-to-blob.mjs
import { put } from '@vercel/blob';
import { readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// Load .env.local so BLOB_READ_WRITE_TOKEN is available
config({ path: join(root, '.env.local') });

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error('ERROR: BLOB_READ_WRITE_TOKEN not set — run vercel env pull first');
  process.exit(1);
}

const videoPath = join(root, 'public', 'topk', 'vsl.mp4');
const stat = statSync(videoPath);
console.log(`Uploading ${videoPath} (${(stat.size / 1024 / 1024).toFixed(1)} MB) ...`);

const fileBuffer = readFileSync(videoPath);

const blob = await put('topk/vsl.mp4', fileBuffer, {
  access: 'public',
  contentType: 'video/mp4',
  token: process.env.BLOB_READ_WRITE_TOKEN,
  addRandomSuffix: false,
  allowOverwrite: true, // replace the existing VSL at the same URL (intended)
});

console.log('');
console.log('SUCCESS');
console.log('Blob URL:', blob.url);
console.log('Pathname:', blob.pathname);
console.log('Size:    ', stat.size, 'bytes');
