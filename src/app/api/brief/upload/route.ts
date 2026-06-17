/**
 * POST /api/brief/upload
 * Issues a Vercel Blob client-upload token so the customer can upload product
 * photos directly from the thank-you page (browser → Blob, never through us).
 *
 * Requires env: BLOB_READ_WRITE_TOKEN
 *   - On Vercel: created automatically when you add a Blob store to the project.
 *   - Locally:   run `vercel env pull .env.local` after creating the store.
 *
 * Uses @vercel/blob's handleUpload helper, which validates the token request
 * and the upload-completed callback signature.
 */

import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';

const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = (await req.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ALLOWED,
        maximumSizeInBytes: 15 * 1024 * 1024, // 15 MB per photo
        addRandomSuffix: true,
        tokenPayload: null,
      }),
      // Fires server-side when the browser finishes the upload. We don't persist
      // here — the URL comes back to the client and is sent with the brief.
      onUploadCompleted: async () => {
        /* no-op */
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Upload failed';
    console.error('[/api/brief/upload] Error:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
