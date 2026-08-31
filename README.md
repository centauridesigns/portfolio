# Souhail Ziani — portfolio

A static Next.js portfolio migrated from Webflow. Project and finish content is checked into the repository, and all CMS images are stored locally under `public/media`.

## Local development

```bash
npm install
npm run dev
```

## Refresh content from Webflow

The importer uses a read-only Webflow token at runtime. The token is never needed by the website itself and must not be committed.

```bash
WEBFLOW_TOKEN=your_token npm run import:webflow
```

## Production

```bash
npm run build
```

The static site is written to `out/` and can be deployed to Cloudflare Pages or any static host.
