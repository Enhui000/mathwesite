# 大连数论与算术几何研讨会网站

This is the Next.js website for the Dalian Number Theory and Arithmetic
Geometry Conference. The `main` branch is the dynamic Vercel edition with
password-protected speaker editing. The preserved static edition is available
on the `static-v1` branch.

## Prerequisites

- Node.js `>=20.9.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

## Content Editing

- Main conference data lives in `app/data.ts`.
- Speakers can click their portrait on the detail page, enter the shared editor
  password, and update all speaker-specific fields and their portrait.
- The handbook preview page is `public/handbook-view.html`.
- The original PPTX handbook is stored in `public/`.

## Dynamic Storage

The dynamic edition uses Vercel Blob for speaker JSON and uploaded portraits.
Connect a Blob store to the Vercel project, then configure these server-only
environment variables:

```bash
CONFERENCE_EDITOR_PASSWORD=<shared-password>
BLOB_READ_WRITE_TOKEN=<injected-by-vercel-blob>
```

For local development without Blob, edits are stored in
`data/speakers.local.json` and portraits in `public/uploads/`. Both paths are
gitignored.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the dynamic production build
- `npm run typecheck`: run TypeScript checks

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the GitHub repository.
3. Keep the default framework preset as **Next.js**.
4. Use the default build command `npm run build`.
5. Deploy.

After creating a Blob store in the Vercel project, set
`CONFERENCE_EDITOR_PASSWORD` for Production, Preview, and Development, then
redeploy.

Vercel is useful for an overseas preview, but it should not be treated as the
mainland China production endpoint.

## Deploying for Mainland China

For stable direct access in mainland China, deploy the preserved `static-v1`
branch to Tencent Cloud EdgeOne Pages and use the following settings:

- Framework: `Next.js`
- Git branch: `static-v1`
- Build command: `npm run build`
- Output directory: `out`
- Acceleration region: Mainland China, or Global including Mainland China

The site is fully static and does not load fonts, JavaScript, images, or APIs
from Google, Vercel, or another foreign origin. The Google Maps link is only an
optional outbound link; the primary route button uses Amap.

For a permanent mainland China public URL, bind a custom domain that has
completed ICP filing. EdgeOne's generated preview URL is not a permanent public
mainland endpoint. Tencent Cloud COS static website hosting is a compatible
fallback and can upload the complete contents of `out/`.
