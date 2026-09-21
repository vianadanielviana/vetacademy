# VetAcademy - Railway Deployment Guide

## ✅ Pre-Deployment Checklist

### Project Status

- ✅ Build tested and successful (`npm run build`)
- ✅ Production dependencies configured (`serve` package added)
- ✅ Railway configuration files created
- ✅ Environment optimized for deployment

### Configuration Files Created

- ✅ `railway.json` - Railway deployment configuration
- ✅ `nixpacks.toml` - Nixpacks build configuration
- ✅ `.railwayignore` - Files to exclude from deployment
- ✅ `package.json` - Updated with production start script

---

## 🚀 Deployment Instructions

### Option 1: Deploy via Railway CLI (Recommended)

1. **Navigate to project directory:**

   ```bash
   cd /Users/danielviana/Desktop/VetAcademy/copy-of-vetacademy
   ```

2. **Initialize Railway project:**

   ```bash
   railway init
   ```

   - Select your workspace: **Daniel Viana's Projects**
   - Choose: **Create a new project**
   - Project name: **VetAcademy** (or your preferred name)

3. **Link the project:**

   ```bash
   railway link
   ```

4. **Set environment variables (if needed):**

   ```bash
   railway variables set GEMINI_API_KEY=your_actual_api_key_here
   ```

   ⚠️ **Note:** Replace `your_actual_api_key_here` with your actual Gemini API key

5. **Deploy to Railway:**

   ```bash
   railway up
   ```

6. **Get deployment URL:**
   ```bash
   railway status
   ```

---

### Option 2: Deploy via Railway Dashboard

1. **Go to Railway Dashboard:**
   - Visit: https://railway.app/dashboard

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Or "Deploy from local directory" (requires GitHub connection)

3. **Connect Repository:**
   - If using GitHub:
     - Push your code to GitHub first
     - Authorize Railway to access your repository
     - Select the VetAcademy repository

4. **Configure Project:**
   - Railway will auto-detect the configuration from `railway.json`
   - Verify build and start commands

5. **Set Environment Variables:**
   - Go to Variables tab
   - Add: `GEMINI_API_KEY` with your actual API key

6. **Deploy:**
   - Railway will automatically build and deploy
   - Monitor deployment in the Deployments tab

---

## 📋 Deployment Configuration Summary

### Build Configuration

- **Builder:** Nixpacks
- **Node Version:** 20.x
- **Build Command:** `npm install && npm run build`
- **Build Output:** `dist/` directory

### Runtime Configuration

- **Start Command:** `npm start` (runs `serve -s dist -l $PORT`)
- **Server:** `serve` (optimized static file server)
- **Port:** Automatically assigned by Railway via `$PORT` variable
- **Host:** `0.0.0.0` (listens on all interfaces)

### Restart Policy

- **Type:** ON_FAILURE
- **Max Retries:** 10

---

## 🔧 Environment Variables

### Required Variables

- `GEMINI_API_KEY` - Your Gemini API key for AI features

### Automatically Set by Railway

- `PORT` - The port your app should listen on
- `RAILWAY_ENVIRONMENT` - Current environment (production/staging)
- `RAILWAY_PROJECT_ID` - Your project ID
- `RAILWAY_SERVICE_NAME` - Your service name

---

## ✅ Post-Deployment Verification

1. **Check Deployment Status:**

   ```bash
   railway status
   ```

2. **View Logs:**

   ```bash
   railway logs
   ```

3. **Open Application:**

   ```bash
   railway open
   ```

   Or visit the URL shown in Railway dashboard

4. **Test Application:**
   - Verify homepage loads correctly
   - Check navigation between pages
   - Test AI chat functionality (if applicable)
   - Verify responsive design on mobile

---

## 🔍 Troubleshooting

### Build Fails

- Check Railway logs: `railway logs`
- Verify all dependencies in `package.json`
- Ensure build completes locally: `npm run build`

### App Won't Start

- Verify `serve` package is in dependencies
- Check start command in logs
- Ensure PORT variable is being used correctly

### Environment Variables Not Working

- Double-check variable names in Railway dashboard
- Restart deployment after adding variables
- Verify variables are set in correct environment

### API Key Issues

- Ensure `GEMINI_API_KEY` is set in Railway variables
- Check that API key is valid and has proper permissions
- Verify key is being read correctly in your code

---

## 📊 Monitoring & Maintenance

### View Application Metrics

```bash
railway metrics
```

### Check Application Health

- Monitor CPU and Memory usage in Railway dashboard
- Set up health check endpoints if needed
- Configure alerts for downtime

### Update Deployment

To redeploy after making changes:

```bash
git add .
git commit -m "Your commit message"
railway up
```

Or if using GitHub integration, just push to your main branch:

```bash
git push origin main
```

---

## 🔐 Security Best Practices

1. **Never commit API keys** to version control
2. **Use Railway's environment variables** for all secrets
3. **Enable HTTPS** (automatic with Railway)
4. **Set proper CORS headers** if building an API
5. **Keep dependencies updated** regularly

---

## 💡 Production Optimization Tips

1. **Enable Caching:**
   - `serve` automatically sets cache headers for static assets
   - Configure CDN if needed for better performance

2. **Monitor Performance:**
   - Use Railway metrics to track response times
   - Monitor bundle size: Current bundle is ~313KB (gzipped: ~95KB)

3. **Optimize Bundle:**
   - Consider code splitting for larger apps
   - Lazy load routes if app grows
   - Use production builds only

4. **Error Tracking:**
   - Consider adding error tracking (Sentry, LogRocket, etc.)
   - Monitor Railway logs for runtime errors

---

## 📞 Support Resources

- **Railway Documentation:** https://docs.railway.app
- **Railway Discord:** https://discord.gg/railway
- **Railway Status:** https://status.railway.app
- **Vite Documentation:** https://vitejs.dev
- **React Documentation:** https://react.dev

---

## 🎯 Quick Deploy Command

For subsequent deployments:

```bash
npm run build && railway up
```

---

**Deployment prepared by:** Alex - DevOps Infrastructure Specialist
**Date:** 2026-01-21
**Project:** VetAcademy
**Status:** ✅ Ready for Deployment
