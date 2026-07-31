# 大连数论与算术几何研讨会网站

This is the Next.js website for the Dalian Number Theory and Arithmetic
Geometry Conference. It is prepared for static deployment from GitHub to
Vercel, Tencent Cloud EdgeOne Pages, COS, or any conventional web server.

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
- Speaker photos can be placed in `public/speakers/`, then referenced from each
  speaker's `photo` field.
- The handbook preview page is `public/handbook-view.html`.
- The original PPTX handbook is stored in `public/`.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: create the static production site in `out/`
- `npm run typecheck`: run TypeScript checks

## Deploying to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the GitHub repository.
3. Keep the default framework preset as **Next.js**.
4. Use the default build command `npm run build`.
5. Deploy.

Vercel is useful for an overseas preview, but it should not be treated as the
mainland China production endpoint.

## Deploying for Mainland China

For stable direct access in mainland China, import this repository into Tencent
Cloud EdgeOne Pages and use the following settings:

- Framework: `Next.js`
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
