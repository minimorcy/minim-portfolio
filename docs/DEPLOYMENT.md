# CapRover Deployment Guide

Deploy the portfolio to CapRover using either GitHub auto-deploy or a manual Dockerfile build.

## Prerequisites

- CapRover installed and running on your VPS
- A domain (or subdomain) pointing to your CapRover server IP
- Dockerfile present in the project root (multi-stage Node build)

## Step 1: Create the App

1. Open the CapRover Dashboard
2. Go to **Apps** → **Create New App**
3. Name: `minim-portfolio`
4. Click **Create App**

## Step 2: Deploy

Choose one of the two methods below.

### Option A: GitHub Auto-Deploy (Recommended)

1. Go to the **Deploy** tab of your app
2. Click **Method 4: GitHub Image** or **Connect to GitHub**
3. Authorize CapRover to access your GitHub account
4. Select the repository (`minimorcy/minim-portfolio`) and branch (`main`)
5. Click **Enable Auto-Deploy**

CapRover will now build and deploy automatically on every push to `main`.

### Option B: Manual Dockerfile Build

1. Go to the **Deploy** tab of your app
2. CapRover auto-detects the `Dockerfile` in the repository root
3. Either upload the project directory or point CapRover to the repo
4. Click **Deploy**

CapRover builds the multi-stage Dockerfile (Node.js base) and serves the app on the port the Astro Node adapter exposes (defaults to `4321` or the `PORT` env variable).

## Step 3: Configure Environment Variables

1. Go to the **Config** tab
2. Under **Environment Variables**, add:
   ```
   GITHUB_TOKEN=<your_PAT>
   ```
3. Click **Save Configuration**
4. Redeploy the app for the new env var to take effect

## Step 4: Set Up Domain and HTTPS

1. Go to the **HTTP Settings** tab
2. Enter your domain (e.g., `portfolio.example.com`)
3. Click **Enable HTTPS** — CapRover provisions a Let's Encrypt certificate automatically
4. Optionally enable **Force HTTPS** to redirect all HTTP traffic

## Step 5: Verify Deployment

```bash
curl https://your-domain.com/
```

A successful deployment returns HTTP 200 with HTML content.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails | Check logs in the **Deploy** tab. Look for missing dependencies or Dockerfile errors. |
| GitHub API returns 401 | Verify `GITHUB_TOKEN` is set correctly in the **Config** tab. Redeploy after saving. |
| App returns 502 | The Node server may not have started. Check that `PORT` is set or defaults to `4321`. |
| HTTPS not working | Ensure your domain DNS points to the CapRover server IP. Wait 1-2 minutes for Let's Encrypt. |
